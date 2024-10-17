<template>
  <div class="flex justify-content-center">
    <Dropdown
      v-model="selectionMethod"
      :options="selectionMethodOptions"
      :placeholder="$t('selectMethod')"
      :optionLabel="({ i18nKey }) => $t(i18nKey)"
      optionValue="value"
    />
  </div>
  <p class="text-center">{{ $t("windowSize") }}: {{ windowSize }}</p>
  <div class="flex justify-content-center">
    <Slider v-model="windowSize" :min="1" :max="5" class="w-6 mb-3" />
  </div>
  <TextGenerationVis
    :generateFn="() => generateNgram(sentences, selectionMethod, windowSize)"
    :disableGenerate="!selectionMethod"
    :sentences="sentences"
  />
</template>

<script>
import {
  generateNgram,
  selectionMethodOptions,
} from "@/views/activities/utils";

import TextGenerationVis from "@/components/TextGenerationVis.vue";

export default {
  name: "NgramTextGen",
  components: { TextGenerationVis },
  props: {
    dataset: {
      required: true,
    },
  },
  data() {
    return {
      selectionMethodOptions,
      selectionMethod: null,
      windowSize: 2,
    };
  },
  computed: {
    sentences() {
      if (!this.dataset.sentences) return [];
      return this.dataset.sentences.map((x) => x.text);
    },
  },
  methods: {
    generateNgram,
  },
};
</script>
