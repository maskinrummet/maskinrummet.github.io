<template>
  <Dialog v-model:visible="visible" class="w-9" modal>
    <ProgressBar v-if="loading" mode="indeterminate"></ProgressBar>
    <ShowDataset
      v-else-if="!editMode"
      :dataset="dataset"
      @edit="allowEditDataset"
      @refresh="refreshDataset"
    />
    <EditDataset
      v-else
      :dataset="dataset"
      :password="password"
      :showDelete="showDelete"
      @delete="deleteDataset"
      @update="updateDataset"
      @refresh="refreshDataset"
    ></EditDataset>
  </Dialog>
</template>

<script>
import EditDataset from "@/components/EditDataset.vue";
import ShowDataset from "@/components/ShowDataset.vue";
import { editDataset, getDatasetById, removeDataset } from "@/api";

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
    showDelete: {
      type: Boolean,
      default: false,
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
      this.$emit("refresh", this.dataset);
      this.loading = false;
    },
    async updateDataset(dataset) {
      this.loading = true;
      let requiresUpdate = false;
      if (
        this.dataset.is_open != dataset.is_open ||
        this.dataset.name != dataset.name
      ) {
        requiresUpdate = true;
      }
      await editDataset(dataset, this.password);
      await this.refreshDataset();
      if (requiresUpdate) {
        this.$emit("updated", dataset);
      }
      this.loading = false;
    },
    async deleteDataset() {
      this.loading = true;
      await removeDataset(this.dataset.id, this.password);
      this.$emit("deleted");
      this.loading = false;
      this.hide();
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
    datasetId: {
      handler: function () {
        this.editMode = false;
        this.password = "";
        if (!this.datasetId) {
          return;
        }
        this.getDataset(this.datasetId);
      },
      immediate: true,
    },
  },
};
</script>
