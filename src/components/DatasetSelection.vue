<template>
  <Card>
    <template #title>{{ $t("selectADataset") }}</template>
    <template #content>
      <Message severity="error" v-if="error" :closable="false"
        >{{ $t("serverErrorOccurred") }}: {{ error }}</Message
      >
      <div v-else>
        <p>
          {{ $t("datasetSelectionExplanation") }}
        </p>
        <div v-if="loading || datasetsLoading" class="text-center">
          {{ $t("loading") }}
        </div>
        <div v-else>
          <div class="p-3 border-round-md surface-200">
            <InputGroup>
              <Dropdown
                v-model="selectedDataset"
                :options="datasetsFormatted"
                :placeholder="$t('selectADataset')"
                :empty-message="$t('emptyDropdown')"
                :empty-filter-message="$t('noSearchResults')"
                filter
                style="height: 48px;"
              >
                <template #option="dataset">
                  <Badge
                    v-if="dataset.option.is_example"
                    :value="$t('example')"
                    class="mr-2"
                  />
                  {{ dataset.option.name }}
                  <div v-if="!dataset.option.is_example" class="flex-grow-1 justify-content-end flex">
                    <i v-if="dataset.option.is_open" v-tooltip.left="$t('open')" class="pi pi-unlock pl-1" style="color: #98C379;"></i>
                    <i v-else v-tooltip.left="$t('closed')" class="pi pi-lock pl-1" style="color: #E06C75;"></i>
                  </div>
                </template>
                <template #value="dataset">
                  <div v-if="dataset.value" class="flex align-items-center h-full">
                    <Badge
                      v-if="dataset.value.is_example"
                      :value="$t('example')"
                      class="mr-2"
                    />
                    {{ dataset.value.name }}
                    <div v-if="!dataset.value.is_example && selectedDatasetId" class="flex-grow-1 justify-content-end flex">
                      <i v-if="dataset.value.is_open" v-tooltip.left="$t('open')" class="pi pi-unlock pl-1" style="color: #98C379;"></i>
                      <i v-else v-tooltip.left="$t('closed')" class="pi pi-lock pl-1" style="color: #E06C75;"></i>
                    </div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
              </Dropdown>
              <Button
                :disabled="!selectedDatasetId"
                @click="showDatasetModal"
                severity="info"
                >{{ $t("viewDataset") }}</Button
              ></InputGroup
            >
            <DatasetModal
              :datasetId="selectedDatasetId"
              :showDelete="true"
              @deleted="datasetDeleted"
              @updated="datasetUpdated"
              ref="datasetModalSD"
            ></DatasetModal>
            <div v-if="!createdDataset">
              <div class="flex justify-content-center m-3">{{ $t("or") }}</div>
              <div class="flex justify-content-center">
                <Button
                  :label="$t('createADataset')"
                  @click="createVisible = true"
                  severity="info"
                ></Button>
              </div>
              <Dialog
                v-model:visible="createVisible"
                modal
                :header="$t('newDataset')"
                class="w-9"
              >
                <CreateDataset @datasetReady="submitDataset"></CreateDataset>
              </Dialog>
            </div>
          </div>

          <div v-if="selectedDataset.id" class="mt-3">
            <div v-if="selectedDataset.is_open" class="mt-3">
              <div class="flex justify-content-center">
                <p>{{ $t("addSentenceAndStart") }}</p>
              </div>
              <div class="flex justify-content-center w-full">
                <SingleSentenceInput
                  class="w-full"
                  @sentenceReady="runLessonWithNewSentence"
                  :buttonLabelProp="$t('startActivity')"
                ></SingleSentenceInput>
              </div>
              <div class="flex justify-content-center m-3">{{ $t("or") }}</div>
              <div class="flex justify-content-center">
                <p>{{ $t("startActivityWOSentence") }}</p>
              </div>
              <div class="flex justify-content-center">
                <Button @click="() => runLesson()">{{
                  $t("startActivity")
                }}</Button>
              </div>
            </div>
            <div v-else class="flex justify-content-center">
              <Button @click="() => runLesson()">{{
                $t("startActivity")
              }}</Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style>
  .p-tooltip-text {
    padding: 0.5rem 0.75rem;
  }
</style>

<script>
import { getDatasetNames, postDataset, addSentenceToDataset } from "@/api";
import InputGroup from "primevue/inputgroup";
import CreateDataset from "@/components/CreateDataset.vue";
import DatasetModal from "@/components/DatasetModal.vue";
import SingleSentenceInput from "@/components/SingleSentenceInput.vue";
import Badge from "primevue/badge";
import Tooltip from "primevue/tooltip";

export default {
  name: "DatasetSelection",
  components: {
    DatasetModal,
    InputGroup,
    CreateDataset,
    SingleSentenceInput,
    Badge,
  },
  directives: {
    tooltip: Tooltip
  },
  data() {
    return {
      error: "",
      datasets: "",
      datasetsLoading: true,
      selectedDataset: { id: null },
      getDatasetError: "",
      datasetPreview: null,
      createVisible: false,
      createdDataset: null,
      loading: false,
    };
  },
  methods: {
    async submitDataset(dataset) {
      this.loading = true;
      let resp = await postDataset(dataset);
      await this.getDatasets();
      this.createVisible = false;
      this.createdDataset = resp.data.id;
      this.selectedDataset = this.datasetsFormatted.find(
        (d) => d.id === this.createdDataset
      );
      this.loading = false;
      await this.$nextTick();
      this.showDatasetModal();
    },
    showDatasetModal() {
      this.$refs.datasetModalSD.show();
    },
    async getDatasets() {
      try {
        this.datasetsLoading = true;
        const response = await getDatasetNames();
        this.datasets = response.data;
      } catch (error) {
        this.error = error;
      }
      this.datasetsLoading = false;
    },
    runLesson(sentence = null) {
      this.$emit("datasetReady", {
        datasetId: this.selectedDataset.id,
        userSentence: sentence,
      });
    },
    async runLessonWithNewSentence(sentence) {
      await addSentenceToDataset(this.selectedDataset.id, sentence);
      this.runLesson(sentence);
    },
    datasetDeleted() {
      this.createdDataset = null;
      this.selectedDataset = { id: null };
      this.datasetPreview = null;
      this.datasets = null;
      this.createdDataset = null;
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
