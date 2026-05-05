<template>
  <div class="flex flex-column gap-2 mt-2 w-full">
    <!-- Header/Toggle row -->
    <div class="flex justify-content-center">
      <span class="flex justify-content-center">
        <label class="my-auto">{{ $t("inputSentence") }}</label>
        <InputSwitch
          v-model="multilineInputEnabled"
          @change="splitBy = defaultSplitBy"
          class="my-auto mx-3"
        />
        <label class="my-auto">{{ $t("inputText") }}</label>
      </span>
    </div>

    <!-- Multiline code mirror -->
    <div v-if="multilineInputEnabled" class="w-full">
      <Codemirror
        v-model:value="textInput"
        @change="change"
        :original-style="true"
        :height="200"
        :options="{ lineWrapping: true }"
      />
    </div>

    <!-- Multiline submit controls -->
    <div v-if="multilineInputEnabled" class="w-full">
      <div class="mb-1">{{ $t("selectSplitter") }}:</div>
      <InputGroup>
        <Dropdown
          v-model="splitBy"
          :options="splitByOptions"
          optionLabel="name"
        ></Dropdown>
        <Button
          :label="$t('add')"
          :disabled="!splitBy"
          @click="submitSentences"
        /> 
      </InputGroup>
    </div>

    <!-- Single line submit controls -->
    <div v-else class="flex gap-2 w-full">
      <div class="flex-grow-1">
        <form
          @submit="
            (e) => {
              e.preventDefault();
              if (!addDisabled) {
                submitSentences();
              }
            }
          "
        >
          <InputText
            v-model="textInput"
            class="w-full"
          />
        </form>
      </div>
      <div>
        <Button
          :label="textInput.length >= 250 ? $t('tooLong') : $t('add')"
          @click="submitSentences"
          class="w-full"
          :disabled="addDisabled"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style>
.CodeMirror {
  font-family: var(--font-family) !important;
  font-size: 1rem !important;
  font-weight: normal !important;
}
</style>

<script>
import Codemirror from "codemirror-editor-vue3";

export default {
  name: "EditDataset",
  components: {
    Codemirror,
  },
  emits: ["update:sentences", "update:error"],
  data() {
    const splitByOptions = [
      { name: this.$t("newline"), value: "\n" },
      { name: this.$t("period"), value: "." },
      { name: this.$t("comma"), value: "," },
      { name: this.$t("intelligentSentence"), value: "intelligent-sentence" },
    ];
    const defaultSplitBy = splitByOptions[3]; // Default to intelligent sentence splitting

    return {
      error: "",
      textInput: "",
      splitByOptions,
      defaultSplitBy,
      splitBy: defaultSplitBy,
      multilineInputEnabled: false,
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
    submitSentences() {
      const splitBy = this.multilineInputEnabled ? this.splitBy.value : undefined;
      let newSentences = [
        ...this.sentenceSplitter(this.textInput, splitBy)
          .map((sentence) => sentence.trim())
          .filter((sentence) => sentence)
      ];
      for (let i in newSentences) {
        if (newSentences[i].length > 250) {
          this.error = this.$t("longSentences") + " (#" + (Number(i) + 1) + ")";
          this.$emit("update:error", this.error);
          return;
        }
      }
      this.$emit("update:sentences", newSentences);
      this.$emit("update:error", "");
      this.error = "";
      this.textInput = "";
    },
  },
  computed: {
    addDisabled() {
      if (!this.textInput) return true;
      if (this.textInput.length > 250) return true;
      return false;
    },
  },
};
</script>
