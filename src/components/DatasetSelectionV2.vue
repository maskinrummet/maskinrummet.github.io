<template>
    <DatasetModal :datasetId="selectedDatasetId" :showDelete="true" @deleted="datasetDeleted" @updated="datasetUpdated"
        ref="datasetModalSD"></DatasetModal>

    <Dialog v-model:visible="showCreateDialog" modal :header="$t('datasetSelection.newDataset')" class="w-9">
        <CreateDataset @datasetReady="createDataset"></CreateDataset>
    </Dialog>

    <Card class="dataset-card">
        <template #title>{{ $t("datasetSelection.selectADataset") }}</template>
        <template #content>
            <Message severity="error" v-if="error" :closable="false">{{ $t("datasetSelection.serverErrorOccurred") }}:
                {{ error }}
            </Message>
            <div v-else>
                <p>
                    {{ $t("datasetSelection.datasetSelectionExplanation") }}
                </p>
                <div class="dataset-selection">
                    <div class="dropdown-row">
                        <Dropdown :model-value="selectedDataset" @update:model-value="onDatasetChange" :options="datasetsFormatted"
                            :placeholder="$t('datasetSelection.selectADataset')"
                            :empty-message="$t('datasetSelection.emptyDropdown')"
                            :empty-filter-message="$t('datasetSelection.noSearchResults')" option-label="name" filter
                            class="dataset-dropdown" :virtual-scroller-options="{ itemSize: 48 }" show-clear :loading="loading" :disabled="loading">

                            <template #option="dataset">
                                <Badge v-if="dataset.option.is_example" :value="$t('datasetSelection.example')"
                                    class="mr-2" />
                                {{ dataset.option.name }}
                                <div v-if="!dataset.option.is_example" class="flex-grow-1 justify-content-end flex">
                                    <i v-if="dataset.option.is_open" v-tooltip.left="$t('datasetSelection.open')"
                                        class="pi pi-unlock pl-1" style="color: #98C379;"></i>
                                    <i v-else v-tooltip.left="$t('datasetSelection.closed')" class="pi pi-lock pl-1"
                                        style="color: #E06C75;"></i>
                                </div>
                            </template>
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center h-full flex-1">
                                    <Badge v-if="slotProps.value.is_example" :value="$t('datasetSelection.example')"
                                        class="mr-2" />
                                    {{ slotProps.value.name }}
                                    <div v-if="!slotProps.value.is_example && selectedDatasetId"
                                        class="flex-grow-1 justify-content-end flex pr-3">
                                        <i v-if="slotProps.value.is_open" v-tooltip.left="$t('datasetSelection.open')"
                                            class="pi pi-unlock" style="color: #98C379;"></i>
                                        <i v-else v-tooltip.left="$t('datasetSelection.closed')" class="pi pi-lock"
                                            style="color: #E06C75;"></i>
                                    </div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>

                        <template v-if="!isDatasetNewlyCreated">
                            <div class="seperator"></div>

                            <Button label="Opret et datasæt" class="create-new" severity="info"
                                @click="showCreateDialog = true" />
                        </template>
                    </div>


                    <div class="action-row">
                        <Button class="action-button" :label="$t('datasetSelection.viewDataset')"
                            :disabled="!selectedDataset" @click="showDatasetModal" icon="pi pi-list" text />
                        <Button v-if="selectedDataset?.is_open && !showSentenceInput" class="action-button"
                            :label="$t('datasetSelection.addSentence')" :disabled="!selectedDataset"
                            @click="showSentenceInput = !showSentenceInput" icon="pi pi-plus" text />
                        <Button v-if="showSentenceInput" class="action-button"
                            :label="$t('datasetSelection.removeSentence')"
                            @click="hideUserSentenceInput" icon="pi pi-minus" text />

                        <span v-if="selectedDataset" class="sentence-count">
                            {{ $t('datasetSelection.sentenceCount', { count: selectedDataset?.sentence_count || 0 }) }}
                        </span>
                    </div>

                    <div v-if="showSentenceInput" class="user-sentence">
                        <label for="user-sentence">{{ $t('datasetSelection.userSentenceLabel') }}</label>
                        <InputText id="user-sentence" :model-value="userSentence" @update:model-value="onUserSentenceChange"
                            :placeholder="$t('datasetSelection.yourSentence')" :maxlength="250" />
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<style>
.dataset-card .p-card-content {
    padding: 0;
}

.dataset-selection {
    padding: 0.75rem;
    border-radius: 0.375rem;
    background-color: var(--surface-200);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .dropdown-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        .create-new {
            flex-shrink: 0;
            height: 42px;

            span {
                font-weight: normal;
            }
        }

        .seperator {
            width: 0px;
            height: 28px;
            border-left: 1.5px solid var(--bluegray-200);
            padding: 0;
        }

        .dataset-dropdown {
            width: 100%;
            height: 42px;

            .p-dropdown-label {
                padding: 0.5rem 0.75rem;
                display: flex;
                align-items: center;
            }
        }
    }


    .action-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        .action-button {
            padding: 0.25rem 0.5rem;

            .p-button-label {
                font-weight: normal;
                font-size: 0.95rem;
            }
        }

        .sentence-count {
            margin-left: auto;
            font-size: 0.9rem;
            color: var(--surface-400);
        }
    }

    .user-sentence {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding-top: 1rem;
        border-top: 1px solid var(--surface-300);

        label {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--surface-600);
        }

        .p-inputtext {
            width: 100%;
            padding: 0.65rem 0.75rem;
        }
    }
}
</style>

<script>
import { getDatasetNames, postDataset } from '@/api';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Tooltip from 'primevue/tooltip';
import DatasetModal from './DatasetModal.vue';
import CreateDataset from './CreateDataset.vue';

export default {
    name: "DatasetSelectionV2",
    components: {
        Badge,
        Dropdown,
        Card,
        Button,
        DatasetModal,
        CreateDataset
    },
    directives: {
        tooltip: Tooltip
    },
    emits: ["update:selectedDatasetId", "update:userSentence"],
    data() {
        return {
            loading: false,
            error: null,
            selectedDataset: undefined,
            datasets: [],
            createdDataset: null,
            userSentence: "",
            showSentenceInput: false,
            showCreateDialog: false,
            isDatasetNewlyCreated: false
        };
    },
    methods: {
        onDatasetChange(dataset) {
            this.selectedDataset = dataset;
            this.$emit("update:selectedDatasetId", dataset?.id);
            this.onUserSentenceChange(""); // Reset user sentence when dataset changes
            this.showSentenceInput = false; // Hide sentence input when dataset changes
        },
        onUserSentenceChange(sentence) {
            this.userSentence = sentence;
            this.$emit("update:userSentence", sentence);
        },
        hideUserSentenceInput() {
            this.showSentenceInput = false;
            this.onUserSentenceChange(""); // Reset user sentence when hiding input
        },
        async getDatasets() {
            try {
                this.loading = true;
                const response = await getDatasetNames();
                this.datasets = response.data;
            } catch (error) {
                this.error = error;
            }
            this.loading = false;
        },
        showDatasetModal() {
            this.$refs.datasetModalSD.show();
        },
        datasetDeleted() {
            this.createdDataset = null;
            this.selectedDataset = undefined;
            this.showSentenceInput = false;
            this.isDatasetNewlyCreated = false;
            this.datasets = null;
            this.getDatasets();
        },
        datasetUpdated(updatedDataset) {
            this.datasets = this.datasets.map((dataset) =>
                dataset.id === updatedDataset.id ? updatedDataset : dataset
            );
            this.selectedDataset = this.datasetsFormatted.find(
                (d) => d.id === updatedDataset.id
            );
        },
        async createDataset(dataset) {
            this.loading = true;
            let resp = await postDataset(dataset);
            await this.getDatasets();
            this.showCreateDialog = false;
            this.isDatasetNewlyCreated = true;
            this.selectedDataset = this.datasetsFormatted.find(
                (d) => d.id === resp.data.id
            );
            this.loading = false;
            this.showDatasetModal();
        },
    },
    computed: {
        datasetsFormatted() {
            if (!this.datasets) {
                return null;
            }

            // Sort datasets so that example datasets are always at the top, and the rest are sorted by index
            return [...this.datasets].sort((a, b) => {
                if (a.is_example === b.is_example) {
                    return a.index - b.index;
                }
                return a.is_example ? -1 : 1;
            })
        },
        selectedDatasetId() {
            if (!this.selectedDataset) {
                return null;
            }
            return this.selectedDataset.id;
        },
    },
    mounted() {
        this.getDatasets();
    },
};
</script>