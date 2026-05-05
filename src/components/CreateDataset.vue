<template>
  <div v-html="$t('createANewDatasetIntro')" class="m-2"></div>
  <form @submit="checkDataset">
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <label> {{ $t("datasetName") }} </label>
        <InputText v-model="datasetName" />
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <Password v-model="password" :feedback="false" toggleMask />
        <label>{{ $t("datasetPassword") }}</label>
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <Password v-model="passwordConfirm" :feedback="false" toggleMask />
        <label>{{ $t("confirmDatasetPassword") }}</label>
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5 align-items-center">
      <label class="mr-3">{{ $t("openDataset") }}</label>
      <ToggleButton
        v-model="open"
        :onLabel="$t('open')"
        :offLabel="$t('closed')"
        onIcon="pi pi-lock-open"
        offIcon="pi pi-lock"
        :aria-label="$t('openDataset')"
      />
    </div>
    <div class="flex justify-content-center">
      <label class="mr-2">{{ $t("startEmptyDataset") }}</label>
      <Checkbox v-model="startEmpty" :binary="true" />
    </div>
    <div v-if="!startEmpty">
      <div class="flex justify-content-center my-4">
        <h3>{{ $t("startingSentences") }}</h3>
      </div>
      <DataTable
        :value="
          startingSentencesList.map((x, i) => {
            return { ...x, pos: i };
          })
        "
        size="small"
        paginator
        :rows="10"
        editMode="row"
        v-model:editingRows="editingRows"
        @row-edit-save="onRowEditSave"
        @row-edit-init="error = null"
        v-model:first="first"
        @page="
          ({ first }) => {
            first = first;
          }
        "
      >
        <template #empty
          ><div class="text-center">{{ $t("useModalBelow") }}</div></template
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
                  for (r of editingRows) {
                    if (r.pos > data.pos) {
                      r.pos = r.pos - 1;
                    }
                  }
                  startingSentencesList.splice(data.pos, 1);
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
    </div>
    <transition-group name="p-message" tag="div">
      <Message severity="error" v-if="error" :closable="false">
        <template #container
          ><div class="p-2">{{ error }}</div></template
        >
      </Message>
    </transition-group>
    <div class="flex justify-content-end mt-3">
      <Button
        :label="$t('createDataset')"
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
import DatasetBulkInsert from "./DatasetBulkInsert.vue";
import TruncatedText from "./TruncatedText.vue";

export default {
  name: "CreateDataset",
  components: {
    TruncatedText,
    DatasetBulkInsert,
  },
  data() {
    return {
      datasetName: "",
      password: "",
      passwordConfirm: "",
      open: true,
      startEmpty: true,
      startingSentencesList: [],
      error: "",
      editingRows: [],
      first: 0,
    };
  },
  methods: {
    sentenceSplitter(inputString, splitBy) {
      switch (splitBy) {
        case "\n":
        case ".":
        case ",":
          return inputString.split(splitBy);
        case "intelligent-sentence": {
          const segmenter = new Intl.Segmenter(this.$i18n.locale, { granularity: "sentence" });
          const segments = segmenter.segment(inputString);
          
          return Array.from(segments, s => s.segment);
        }
        default:
          return [inputString];
      }
    },
    onSentenceInserted(newSentence) {
      this.startingSentencesList.push(...newSentence.map((x) => ({ text: x })));
      this.first = Math.floor((this.startingSentencesList.length - 1) / 10) * 10;
    },
    checkDataset(e) {
      e.preventDefault();
      if (this.datasetName === "") {
        this.error = this.$t("emptyDatasetName");
        return;
      }
      if (this.datasetName.length > 50) {
        this.error = this.$t("longDatasetName");
        return;
      }
      if (this.password === "") {
        this.error = this.$t("emptyPassword");
        return;
      }
      if (this.password.length > 50) {
        this.error = this.$t("longPassword");
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.error = this.$t("passwordMismatch");
        return;
      }
      if (!this.startEmpty && this.startingSentencesList.length === 0) {
        this.error = this.$t("emptyStartingSentences");
        return;
      }
      const sentences = this.startingSentencesList.map((x) => {
        return { text: x.text, value: 0 };
      });
      for (let x of sentences) {
        if (x.text.length == 0) {
          this.error = this.$t("emptySentences");
          return;
        }
        if (x.text.length > 250) {
          this.error = this.$t("longSentences");
          return;
        }
      }
      this.$emit("datasetReady", {
        name: this.datasetName,
        password: this.password,
        is_open: this.open,
        use_value: false,
        value_name: "",
        sentences,
      });
      this.error = "";
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
      this.startingSentencesList[newData.pos] = newData;
    },
  },
};
</script>
