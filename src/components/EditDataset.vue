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
      :value="displaySentences"
      size="small"
      paginator
      v-model:first="first"
      :rows="numRows"
      @page="
        () => {
          first = undefined;
        }
      "
    >
      <Column field="text" :header="$t('inputTexts')">
        <template #body="slotProps">
          <TruncatedText :text="slotProps.data.text"></TruncatedText> </template
      ></Column>
      <Column :header="$t('action')">
        <template #body="{ data }">
          <Button
            severity="danger"
            :label="$t('delete')"
            @click="sentences.splice(data.index, 1)"
          ></Button>
        </template>
      </Column>
      <ColumnGroup type="footer">
        <Row>
          <Column
            ><template #footer>
              <form
                @submit="
                  (e) => {
                    e.preventDefault();
                    if (!addDisabled) addNewSentence();
                  }
                "
              >
                <InputText
                  v-model="newSentence"
                  class="w-full"
                /></form></template
          ></Column>
          <Column>
            <template #footer>
              <Button
                :label="$t('add')"
                @click="addNewSentence"
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
        @click="$emit('delete')"
        v-if="showDelete"
      ></Button>
      <Button :label="$t('refreshDataset')" @click="$emit('refresh')"></Button>
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
      sentences: JSON.parse(this.dataset.json_string),
      newSentence: "",
      numRows: 10,
    };
  },
  computed: {
    addDisabled() {
      return !this.newSentence || this.newSentence.length > 150;
    },
    displaySentences() {
      return this.sentences.map((text, index) => ({
        index: index,
        text,
      }));
    },
  },
  methods: {
    truncateText(text, maxChars = 100) {
      return text.length > maxChars
        ? text.slice(0, maxChars - 3) + "..."
        : text;
    },
    async addNewSentence() {
      if (this.newSentence) {
        this.first = Math.floor(this.sentences.length / 10) * 10;
        this.sentences.push(this.newSentence);
        this.newSentence = "";
      }
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
      this.datasetCopy.json_string = JSON.stringify(this.sentences);
      this.$emit("update", this.datasetCopy);
    },
  },
};
</script>
