<template>
  <form @submit="checkSentence">
    <InputGroup>
      <FloatLabel>
        <InputText v-model="value" />
        <label for="sentence-input">{{ label }}</label>
      </FloatLabel>
      <Button :label="buttonLabel" type="submit" />
    </InputGroup>
    <transition-group name="p-message" tag="div">
      <Message severity="error" v-if="error" :closable="false">
        <template #container
          ><div class="p-2">{{ error }}</div></template
        >
      </Message>
    </transition-group>
  </form>
</template>

<script>
export default {
  name: "SingleSentenceInput",
  props: {
    labelProp: {
      type: String,
      default: "",
    },
    buttonLabelProp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      label: this.labelProp || this.$t("yourSentence"),
      buttonLabel: this.buttonLabelProp || this.$t("submit"),
      error: "",
    };
  },
  methods: {
    checkSentence(e) {
      e.preventDefault();
      if (this.value === "") {
        this.error = this.$t("emptySentence");
        return;
      }
      if (this.value.length >= 250) {
        this.error = this.$t("longSentence");
        return;
      }
      this.$emit("sentenceReady", this.value);
      this.error = "";
    },
  },
};
</script>
