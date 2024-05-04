<template>
  <Card>
    <template #title>{{ title }}</template>
    <template #content>
      <form @submit="checkSentence">
        <InputGroup>
          <FloatLabel>
            <InputText v-model="value" />
            <label for="sentence-input">{{ label }}</label>
          </FloatLabel>
          <Button :label="$t('submit')" type="submit" />
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
  </Card>
</template>

<script>
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Card from "primevue/card";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import Message from "primevue/message";

export default {
  name: "SingleSentenceInput",
  components: {
    InputText,
    FloatLabel,
    Card,
    Button,
    InputGroup,
    Message,
  },
  props: {
    titleProp: {
      type: String,
      default: "",
    },
    labelProp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      title: this.titleProp || this.$t("sentenceInputTitle"),
      label: this.labelProp || this.$t("yourSentence"),
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
