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
      <ColumnGroup type="footer">
        <Row>
          <Column :colspan="3"
            ><template #footer>
              <span class="flex justify-content-center">
                <label class="my-auto">{{ $t("inputSentence") }}</label>
                <InputSwitch
                  v-model="multilineInputEnabled"
                  @change="splitBy = ''"
                  class="my-auto mx-3"
                />
                <label class="my-auto">{{ $t("inputText") }}</label></span
              >
            </template>
          </Column>
        </Row>
        <Row v-if="multilineInputEnabled">
          <Column :colspan="3">
            <template #footer
              ><Textarea
                v-model="textInput"
                rows="5"
                cols="30"
                class="w-full"
              />
            </template>
          </Column>
        </Row>
        <Row v-if="multilineInputEnabled">
          <Column :colspan="3"
            ><template #footer>
              <div class="mb-1">{{ $t("selectSplitter") }}:</div>
              <InputGroup v-if="multilineInputEnabled">
                <Dropdown
                  v-model="splitBy"
                  :options="splitByOptions"
                  optionLabel="name"
                ></Dropdown>
                <Button
                  :label="$t('add')"
                  :disabled="!splitBy"
                  @click="splitNewSentences"
                /> </InputGroup
            ></template>
          </Column>
        </Row>
        <Row v-else>
          <Column :colspan="2"
            ><template #footer>
              <form
                @submit="
                  (e) => {
                    e.preventDefault();
                    if (!addDisabled) {
                      splitNewSentences();
                    }
                  }
                "
              >
                <InputText
                  v-model="textInput"
                  class="w-full"
                /></form></template
          ></Column>
          <Column>
            <template #footer>
              <Button
                :label="
                  this.textInput.length >= 250 ? $t('tooLong') : $t('add')
                "
                @click="splitNewSentences"
                class="w-full"
                :disabled="addDisabled"
              ></Button>
            </template>
          </Column>
        </Row>
      </ColumnGroup>
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

<script>
import TruncatedText from "./TruncatedText.vue";

export default {
  name: "EditDataset",
  components: {
    TruncatedText,
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
      textInput: "",
      numRows: 10,
      splitBy: "",
      splitByOptions: [
        { name: this.$i18n.t("newline"), value: "\n" },
        { name: this.$i18n.t("period"), value: "." },
        { name: this.$i18n.t("comma"), value: "," },
      ],
      editingRows: [],
      multilineInputEnabled: false,
      deletedIds: [],
    };
  },
  methods: {
    splitNewSentences() {
      let newSentences = [
        ...this.textInput
          .split(this.splitBy.value)
          .map((sentence) => sentence.trim())
          .filter((sentence) => sentence)
          .map((x) => {
            return { text: x, value: 0 };
          }),
      ];
      this.sentencesList = [...this.sentencesList, ...newSentences];
      this.first = Math.floor((this.sentencesList.length - 1) / 10) * 10;
      this.textInput = "";
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
  },
  computed: {
    addDisabled() {
      return !this.textInput || this.textInput.length >= 250;
    },
  },
};
</script>
