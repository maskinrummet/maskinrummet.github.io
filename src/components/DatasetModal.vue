<template>
  <Dialog v-model:visible="visible" class="w-9">
    <ProgressBar v-if="loading" mode="indeterminate"></ProgressBar>
    <ShowDataset
      v-else-if="!editMode"
      :dataset="dataset"
      @edit="allowEditDataset"
    />
    <EditDataset
      v-else
      :dataset="dataset"
      :password="password"
      @delete="
        () => {
          visible = false;
        }
      "
      @update="updateDataset"
      @refresh="refreshDataset"
    ></EditDataset>
    <!--TODO: DELETE DATASET FUNCTIONALITY -->
  </Dialog>
</template>

<script>
import EditDataset from "@/components/EditDataset.vue";
import ShowDataset from "@/components/ShowDataset.vue";
import { editDataset, getDatasetById } from "@/api";

export default {
  name: "DatasetModal",
  components: {
    EditDataset,
    ShowDataset,
  },
  data() {
    return {
      editMode: false,
      visible: false,
      password: "",
      dataset: null,
      getDatasetError: null,
      loading: false,
    };
  },
  props: {
    datasetId: {
      datasetId: String,
      required: true,
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    allowEditDataset(password) {
      this.editMode = true;
      this.password = password;
    },
    async getDataset(id) {
      this.loading = true;
      try {
        const response = await getDatasetById(id);
        this.dataset = response.data;
      } catch (error) {
        this.getDatasetError = error;
      }
      this.loading = false;
    },
    async refreshDataset() {
      this.loading = true;
      await this.getDataset(this.dataset.id);
      this.loading = false;
    },
    async updateDataset(dataset) {
      this.loading = true;
      await editDataset(dataset, this.password);
      await this.refreshDataset();
      this.loading = false;
    },
  },
  computed: {
    datasetName() {
      let maxChars = 50;
      if (this.dataset) {
        return this.dataset.name.length > maxChars
          ? this.dataset.name.slice(0, maxChars - 3) + "..."
          : this.dataset.name;
      }
      return this.$t("noDatasetSelected");
    },
  },
  watch: {
    datasetId() {
      if (!this.datasetId) {
        return;
      }
      this.editMode = false;
      this.password = "";
      this.getDataset(this.datasetId);
    },
  },
};
</script>
