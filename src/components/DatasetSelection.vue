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
        <div v-if="loading">{{ $t("loading") }}</div>
        <div v-else>
          <div class="p-3 border-round-md surface-200">
            <InputGroup>
              <Dropdown
                v-model="selectedDataset"
                :options="datasetsFormatted"
                optionLabel="formattedName"
                :placeholder="$t('selectADataset')"
                filter
              />
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

<script>
import { getDatasetNames, postDataset, addSentenceToDataset } from "@/api";
import InputGroup from "primevue/inputgroup";
import CreateDataset from "@/components/CreateDataset.vue";
import DatasetModal from "@/components/DatasetModal.vue";
import SingleSentenceInput from "@/components/SingleSentenceInput.vue";

export default {
  name: "DatasetSelection",
  components: {
    DatasetModal,
    InputGroup,
    CreateDataset,
    SingleSentenceInput,
  },
  data() {
    return {
      error: "",
      datasets: "",
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
    formatName(name, open, maxChars = 50) {
      let tag = `[${open ? this.$t("open") : this.$t("closed")}] `;
      return (
        tag +
        (name.length > maxChars ? name.slice(0, maxChars - 3) + "..." : name)
      );
    },
    async getDatasets() {
      try {
        const response = await getDatasetNames();
        this.datasets = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    runLesson(sentence = null) {
      this.$emit("datasetReady", {
        datasetId: this.selectedDataset.id,
        userSentence: sentence,
      });
    },
    async runLessonWithNewSentence(sentence) {
      addSentenceToDataset(this.selectedDataset.id, sentence);
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
  },
  computed: {
    datasetsFormatted() {
      if (!this.datasets) {
        return null;
      }
      return this.datasets.map((dataset) => ({
        formattedName: this.formatName(dataset.name, dataset.is_open),
        ...dataset,
      }));
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
