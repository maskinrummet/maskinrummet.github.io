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
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import Message from "primevue/message";

export default {
  name: "SingleSentenceInput",
  components: {
    InputText,
    FloatLabel,
    Button,
    InputGroup,
    Message,
  },
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
      if (this.value.length > 150) {
        this.error = this.$t("longSentence");
        return;
      }
      this.$emit("sentenceReady", this.value);
      this.error = "";
    },
  },
};
</script>
