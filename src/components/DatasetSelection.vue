<template>
  <Card>
    <template #title>{{ $t("selectADataset") }}</template>
    <template #content>
      <Message severity="error" v-if="error" :closable="false"
        >{{ $t("serverErrorOccurred") }}: {{ error }}</Message
      >
      <div v-else>
        <p>
          {{
            $t(
              "In this activity we will use a dataset to generate and summarise text. You can create your own dataset, create a dataset which others can contribute to, or use one of the available datasets."
            )
          }}
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
                @change="
                  () => {
                    editMode = false;
                    password = '';
                  }
                "
              />
              <Button
                :disabled="!selectedDataset"
                @click="showPreview"
                severity="info"
                >{{ $t("viewDataset") }}</Button
              ></InputGroup
            >
            <Dialog
              v-model:visible="previewVisible"
              modal
              :header="getCurrDatasetName()"
              class="w-9"
            >
              <ShowDataset
                v-if="!editMode"
                :dataset="datasetPreview"
                @edit="editDataset"
              />
              <EditDataset
                v-else
                :dataset="datasetPreview"
                :password="password"
                @cancel="previewVisible = false"
                @update="updateDataset"
                @refresh="refreshDataset"
              ></EditDataset>
            </Dialog>
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

          <div v-if="selectedDataset" class="mt-3">
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
import {
  getDatasetNames,
  getDatasetById,
  postDataset,
  editDataset,
  addSentenceToDataset,
} from "@/api";
import ShowDataset from "@/components/ShowDataset.vue";
import InputGroup from "primevue/inputgroup";
import CreateDataset from "@/components/CreateDataset.vue";
import EditDataset from "@/components/EditDataset.vue";
import SingleSentenceInput from "@/components/SingleSentenceInput.vue";

export default {
  name: "DatasetSelection",
  components: {
    ShowDataset,
    InputGroup,
    CreateDataset,
    EditDataset,
    SingleSentenceInput,
  },
  data() {
    return {
      value: "",
      error: "",
      datasets: "",
      selectedDataset: null,
      previewVisible: false,
      getDatasetError: "",
      datasetPreview: null,
      createVisible: false,
      createdDataset: null,
      loading: false,
      editMode: false,
      password: "",
    };
  },
  methods: {
    showPreview() {
      this.previewVisible = true;
      this.getDataset(this.selectedDataset);
    },
    async getDataset(dataset) {
      try {
        const response = await getDatasetById(dataset.id);
        this.datasetPreview = response.data;
      } catch (error) {
        this.getDatasetError = error;
      }
    },
    async submitDataset(dataset) {
      this.loading = true;
      let resp = await postDataset(dataset);
      await this.getDatasets();
      this.createdDataset = resp.data.id;
      this.selectedDataset = this.datasetsFormatted.find(
        (d) => d.id === this.createdDataset
      );
      await this.getDataset(this.selectedDataset);
      this.loading = false;
      this.previewVisible = true;
    },
    getCurrDatasetName(maxChars = 50) {
      if (this.selectedDataset) {
        return this.selectedDataset.name.length > maxChars
          ? this.selectedDataset.name.slice(0, maxChars - 3) + "..."
          : this.selectedDataset.name;
      }
      return this.$t("noDatasetSelected");
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
    editDataset(password) {
      this.editMode = true;
      this.password = password;
    },
    async updateDataset(dataset) {
      this.loading = true;
      await editDataset(dataset, this.password);
      await this.getDatasets();
      await this.getDataset(dataset);
      this.selectedDataset = this.datasetsFormatted.find(
        (d) => d.id === dataset.id
      );
      this.loading = false;
      this.previewVisible = true;
    },
    async refreshDataset() {
      this.loading = true;
      await this.getDataset(this.selectedDataset);
      this.loading = false;
      this.previewVisible = true;
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
  },
  mounted() {
    this.getDatasets();
  },
};
</script>
