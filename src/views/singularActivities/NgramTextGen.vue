<template>
  <p class="text-center">{{ $t("windowSize") }}: {{ windowSize }}</p>
  <div class="flex justify-content-center">
    <Slider
      v-model="windowSize"
      :min="1"
      :max="5"
      class="w-6 mb-3 max-w-10rem"
    />
  </div>
  <TextGenerationVis
    :generateFn="
      (selectionMethod) => generateNgram(sentences, selectionMethod, windowSize)
    "
    :sentences="sentences"
  />
</template>

<script>
import { generateNgram } from "@/views/activities/utils";

import TextGenerationVis from "@/components/TextGenerationVis.vue";

export default {
  name: "NgramTextGen",
  components: { TextGenerationVis },
  props: {
    dataset: {
      required: true,
    },
    windowSizeProp: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      windowSize: this.windowSizeProp || 2,
    };
  },
  computed: {
    sentences() {
      if (!this.dataset.sentences) return [];
      return this.dataset.sentences.map((x) => x.text);
    },
  },
  watch: {
    windowSize(newSize) {
      this.$emit("windowSizeChange", newSize);
    },
    windowSizeProp(newSize) {
      this.windowSize = newSize;
    },
  },
  methods: {
    generateNgram,
  },
};
</script>
