<template>
  <form @submit="checkDataset">
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <label> {{ $t("datasetName") }} </label>
        <InputText v-model="datasetCopy.name" />
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5 align-items-center">
      <label class="mr-3">{{ $t("openDataset") }}</label>
      <ToggleButton
        v-model="datasetCopy.is_open"
        :onLabel="$t('open')"
        :offLabel="$t('closed')"
        onIcon="pi pi-lock-open"
        offIcon="pi pi-lock"
        :aria-label="$t('openDataset')"
      />
    </div>
    <DataTable
      :value="
        sentencesList.map((x, i) => {
          return { ...x, pos: i };
        })
      "
      size="small"
      paginator
      :rows="numRows"
      editMode="row"
      v-model:editingRows="editingRows"
      @row-edit-save="onRowEditSave"
      @row-edit-init="error = null"
      v-model:first="first"
      @page="
        ({ first }) => {
          /*TODO: what happens if they change page while editing?           if (editingRows.length !== 0) {
            this.error = $t('unsavedEdits');
            return;
          } */
          this.first = first;
        }
      "
    >
      <template #empty
        ><div class="text-center">{{ $t("emptyDataset") }}</div></template
      >
      <Column field="text" :header="$t('sentence')" style="max-width: 80%">
        <template #editor="{ data, field }">
          <form
            @submit="
              (e) => {
                e.preventDefault();
                onRowEditSave({
                  newData: data,
                  originalEvent: { preventDefault: () => {} },
                });
              }
            "
          >
            <InputText
              v-model="data[field]"
              :class="
                data[field] && data[field].length < 250 ? '' : 'p-invalid'
              "
              class="w-full"
            />
          </form>
        </template>
        <template #body="{ data, field }"
          ><TruncatedText :text="data[field]" :maxSize="50"></TruncatedText
        ></template>
      </Column>
      <Column
        :rowEditor="true"
        class="w-2"
        style="min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
      <Column class="w-1">
        <template #body="{ data }">
          <Button
            severity="danger"
            icon="pi pi-trash"
            class="w-full"
            :disabled="editingRows.map((x) => x.pos).includes(data.pos)"
            @click="
              () => {
                if (data.id) deletedIds.push(data.id);
                for (r of editingRows) {
                  if (r.pos > data.pos) {
                    r.pos = r.pos - 1;
                  }
                }
                sentencesList.splice(data.pos, 1);
              }
            "
          ></Button>
        </template>
      </Column>
      <template #footer>
        <DatasetBulkInsert
          @update:sentences="onSentenceInserted"
          @update:error="error = $event"
        ></DatasetBulkInsert>
      </template>
    </DataTable>
    <transition-group name="p-message" tag="div">
      <Message severity="error" v-if="error" :closable="false">
        <template #container
          ><div class="p-2">{{ error }}</div></template
        >
      </Message>
    </transition-group>
    <div class="flex justify-content-between mt-3">
      <Button
        :label="$t('deleteDataset')"
        severity="danger"
        @click="confirmDelete"
        v-if="showDelete"
      ></Button>
      <Button
        :label="$t('saveChanges')"
        severity="success"
        type="submit"
      ></Button>
    </div>
  </form>
</template>

<style>
.CodeMirror {
  font-family: var(--font-family) !important;
  font-size: 1rem !important;
  font-weight: normal !important;
}
</style>

<script>
import TruncatedText from "./TruncatedText.vue";
import DatasetBulkInsert from "@/components/DatasetBulkInsert.vue";

export default {
  name: "EditDataset",
  components: {
    TruncatedText,
    DatasetBulkInsert,
  },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      first: 0,
      datasetCopy: { ...this.dataset },
      error: "",
      sentencesList: this.dataset.sentences.map((x) => {
        return { text: x.text, id: x.id, value: x.value || 0 };
      }),
      numRows: 10,
      editingRows: [],
      deletedIds: [],
    };
  },
  methods: {
    onSentenceInserted(newSentence) {
      this.sentencesList.push(...newSentence.map((x) => ({ text: x, value: 0 })));
      this.first = Math.floor((this.sentencesList.length - 1) / 10) * 10;
    },
    checkDataset(e) {
      e.preventDefault();
      if (this.datasetCopy.name === "") {
        this.error = this.$t("emptyDatasetName");
        return;
      }
      if (this.datasetCopy.name.length > 150) {
        this.error = this.$t("longDatasetName");
        return;
      }
      for (let x of this.sentencesList) {
        if (x.text.length == 0) {
          this.error = this.$t("emptySentences");
          return;
        }
        if (x.text.length > 250) {
          this.error = this.$t("longSentences");
          return;
        }
      }
      let sentencesToAdd = [];
      let sentencesToEdit = [];
      for (let x of this.sentencesList) {
        if (!x.id) {
          sentencesToAdd.push(x);
        } else {
          for (let s of this.dataset.sentences) {
            if (s.id == x.id && s.text != x.text) {
              sentencesToEdit.push(x);
              break;
            }
          }
        }
      }
      this.$emit("update", {
        ...this.datasetCopy,
        sentencesToEdit,
        sentencesToAdd,
        deletedIds: this.deletedIds,
      });
    },
    onRowEditSave({ newData, originalEvent }) {
      this.editingRows = this.editingRows.filter((x) => x.pos != newData.pos);
      if (!newData.text || newData.text.length >= 250) {
        originalEvent.preventDefault();
        this.error = this.$i18n.t(
          !newData.text ? "emptySentences" : "longSentences"
        );
        return;
      }
      this.sentencesList[newData.pos] = newData;
    },
    confirmDelete() {
      if (window.confirm(this.$i18n.t("areYouSureDelete")))
        this.$emit("delete");
    },
  }
};
</script>
