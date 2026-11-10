<template>
  <p class="mt-0">{{ $t("createDataset.subtitle") }}</p>
  <form @submit="checkDataset" class="create-dataset-form">
    <div class="row">
        <div class="field">
          <label for="datasetName"> {{ $t("createDataset.form.name.label") }} </label>
          <InputText
            id="datasetName"
            v-model="datasetName"
            :placeholder="$t('createDataset.form.name.placeholder')"
          />
        </div>
    </div>
    <div class="row">
      <div class="field">
          <label for="datasetPassword"> {{ $t("createDataset.form.password.label") }} </label>
          <div class="flex gap-2 w-full">
            <Password
              id="datasetPassword"
              v-model="password"
              :placeholder="$t('createDataset.form.password.placeholder')"
              :feedback="false"
              toggleMask
            />
            <Password v-model="passwordConfirm" :placeholder="$t('createDataset.form.password.repeat')" :feedback="false" toggleMask />
          </div>
          <div class="hint">
            <p class="m-0" v-html="$t('createDataset.form.password.disclaimer')"></p>
          </div>
        </div>
    </div>
    <div class="row">
      <div class="field horizontal">
        <label for="openToggle">{{ $t("createDataset.form.open.label") }}</label>
        <InputSwitch v-model="open" pt:input:id="openToggle" />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label for="initialContent">{{ $t("createDataset.form.content.label") }}</label>
        <SelectButton
          v-model="initialContent"
          :options="initialContentOptions"
          optionLabel="label"
          optionValue="value"
          :allow-empty="false"
        />
      </div>
    </div>
    <div v-if="!startEmpty">
      <div class="flex my-4">
        <strong>{{ $t("startingSentences") }}</strong>
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
    <div class="flex justify-content-end mt-3 gap-2">
      <Button
        :label="$t('createDataset.cancelButton')"
        severity="secondary"
        @click="$emit('cancel')"
        class="py-2"
      ></Button>
      <Button
        :label="$t('createDataset.createButton')"
        severity="info"
        type="submit"
        class="py-2"
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


.create-dataset-form {
  .row {
    margin-bottom: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

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

    .p-selectbutton {
      display: flex;

      .p-button {
        flex: 1;
        --color: #0ea5e9;

        &:focus {
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgb(from var(--color) r g b / 20%), 0 1px 2px 0 black;
        }

        &.p-highlight {
          background-color: rgb(from var(--color) r g b / 20%);
          border-color: var(--color);
          color: var(--color);
        }
      }
    }

    .hint {
      font-size: 0.75em;
      color: var(--text-color-secondary);
      margin-top: 0.25rem;
    }
  }
}
</style>

<script>
import InputSwitch from "primevue/inputswitch";
import DatasetBulkInsert from "./DatasetBulkInsert.vue";
import TruncatedText from "./TruncatedText.vue";
import SelectButton from "primevue/selectbutton";

export default {
  name: "CreateDataset",
  components: {
    TruncatedText,
    DatasetBulkInsert,
    InputSwitch,
    SelectButton
  },
  data() {
    return {
      datasetName: "",
      password: "",
      passwordConfirm: "",
      open: true,
      startingSentencesList: [],
      error: "",
      editingRows: [],
      first: 0,
      initialContentOptions: [
        { label: this.$t("createDataset.form.content.options.empty"), value: "empty" },
        { label: this.$t("createDataset.form.content.options.notEmpty"), value: "notEmpty" }
      ],
      initialContent: "empty",
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
  computed: {
    startEmpty() {
      return this.initialContent === "empty";
    },
  }
};
</script>
