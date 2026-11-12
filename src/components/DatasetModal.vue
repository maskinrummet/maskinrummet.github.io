<template>
  <Dialog
    v-model:visible="visible"
    class="w-9"
    modal
  >
    <template #header>
      <div class="flex align-items-center gap-3">
        <span class="p-dialog-title">{{ dataset ? dataset.name : $t('Loading') }}</span>
        <Button v-if="!editMode" class="py-1 px-2" severity="info" text @click="togglePasswordInput">
          Rediger datasæt
          <i class="pi pi-file-edit ml-1"></i>
        </Button>
        <Button
          class="w-2rem h-2rem"
          severity="info"
          text
          rounded
          icon="pi pi-sync"
          @click="refreshDataset"
          v-tooltip.bottom="'Hent nye ændringer'"
        />
      </div>
    </template>
    <ProgressBar v-if="loading" mode="indeterminate"></ProgressBar>
    <ShowDataset
      v-else-if="!editMode"
      :dataset="dataset"
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

    <OverlayPanel ref="passwordInput" class="dataset-password-input">
      <div class="field">
        <label for="password">Datasæt adgangskode</label>
        <InputGroup>
          <Password
            id="password"
            :feedback="false"
            toggleMask
            v-model="passwordInput"
          />
          <Button
            icon="pi pi-arrow-right"
            severity="success"
            @click="submitPassword"
          />
        </InputGroup>
        <div class="error">{{ passwordError }}</div>
      </div>
    </OverlayPanel>
  </Dialog>
</template>

<style>
.dataset-password-input {
  display: flex;
  flex-direction: column;

  .p-overlaypanel-content {
    padding: 0.75rem;
  }

  .field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 0;
  
      &.horizontal {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
  
      label {
        margin-bottom: 0.25rem;
        font-size: 0.95em;
        font-weight: 600;
      }
  
      input, .p-password, .p-selectbutton {
        width: 100%;
      }

      .error {
        color: var(--red-600);
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
  }
}

</style>

<script>
import EditDataset from "@/components/EditDataset.vue";
import ShowDataset from "@/components/ShowDataset.vue";
import { editDataset, getDatasetById, removeDataset, verifyPassword } from "@/api";
import Tooltip from "primevue/tooltip";
import OverlayPanel from "primevue/overlaypanel";

export default {
  name: "DatasetModal",
  components: {
    EditDataset,
    ShowDataset,
    OverlayPanel,
  },
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      editMode: false,
      visible: false,
      password: "",
      dataset: null,
      getDatasetError: null,
      passwordError: null,
      loading: false,
      passwordInput: "",
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
    togglePasswordInput(event) {
      this.$refs.passwordInput.toggle(event);
      this.passwordInput = "";
    },
    async submitPassword() {
      try {
        await verifyPassword(this.dataset.id, this.passwordInput);
  
        this.editMode = true;
        this.$refs.passwordInput.hide();
        this.passwordError = null;
        this.password = this.passwordInput;
        this.passwordInput = "";
      } catch (error) {
        this.passwordError = this.$t("passwordVerificationFailed");
      }
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
