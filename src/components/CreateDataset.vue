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
                  v-model="startingSentences"
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
                    @click="splitStartingSentences"
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
                        splitStartingSentences();
                      }
                    }
                  "
                >
                  <InputText
                    v-model="startingSentences"
                    class="w-full"
                  /></form></template
            ></Column>
            <Column>
              <template #footer>
                <Button
                  :label="
                    startingSentences.length >= 250 ? $t('tooLong') : $t('add')
                  "
                  @click="splitStartingSentences"
                  class="w-full"
                  :disabled="addDisabled"
                ></Button>
              </template>
            </Column>
          </Row>
        </ColumnGroup>
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

<script>
import TruncatedText from "./TruncatedText.vue";

export default {
  name: "CreateDataset",
  components: {
    TruncatedText,
  },
  data() {
    return {
      datasetName: "",
      password: "",
      passwordConfirm: "",
      open: true,
      startEmpty: true,
      startingSentences: "",
      startingSentencesList: [],
      splitBy: "",
      error: "",
      splitByOptions: [
        { name: this.$i18n.t("newline"), value: "\n" },
        { name: this.$i18n.t("period"), value: "." },
        { name: this.$i18n.t("comma"), value: "," },
      ],
      editingRows: [],
      multilineInputEnabled: false,
      first: 0,
    };
  },
  computed: {
    addDisabled() {
      return !this.startingSentences || this.startingSentences.length >= 250;
    },
  },
  methods: {
    splitStartingSentences() {
      let newSentences = [
        ...this.startingSentences
          .split(this.splitBy.value)
          .map((sentence) => sentence.trim())
          .filter((sentence) => sentence)
          .map((x) => {
            return { text: x };
          }),
      ];
      this.startingSentencesList = [
        ...this.startingSentencesList,
        ...newSentences,
      ];
      this.first =
        Math.floor((this.startingSentencesList.length - 1) / 10) * 10;
      this.startingSentences = "";
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
