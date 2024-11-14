<template>
  <TextGenerationVis
    :generateFn="
      (selectionMethod) => generatePositionally(sentences, selectionMethod)
    "
    :sentences="sentences"
  />
</template>

<script>
import TextGenerationVis from "@/components/TextGenerationVis.vue";
import { generatePositionally } from "../activities/utils";

export default {
  name: "PositionalTextGen",
  components: { TextGenerationVis },
  props: {
    dataset: {
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    sentences() {
      if (!this.dataset.sentences) return [];
      return this.dataset.sentences.map((x) => x.text);
    },
  },
  methods: {
    generatePositionally,
  },
};
</script>
