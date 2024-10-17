<template>
  <div>
    <div class="flex justify-content-center">
      <div class="w-9 p-3 h-15rem border-2 border-round-md">
        <VueWordCloud
          :spacing="1 / 2"
          :words="bagOfWords"
          :color="([, weight]) => calcColor(weight)"
          font-family="Inter var, sans-serif"
          @update:progress="updateLoading"
          v-memo="[bagOfWords]"
        ></VueWordCloud>
        <ProgressBar
          v-if="loading"
          mode="indeterminate"
          class="w-6 m-auto"
          style="margin-top: -7rem !important"
        >
        </ProgressBar>
      </div>
    </div>
    <p class="text-center mt-3 mb-3">
      {{ $t("minWordCloudOccurences") }}: {{ minOccurrences }}
    </p>
    <div class="flex justify-content-center mb-6">
      <Slider v-model="minOccurrences" :min="1" :max="10" class="w-7" />
    </div>
    <div class="flex justify-content-center">
      <Dropdown
        v-model="langStemming"
        :options="stemmingOptions"
        :optionLabel="stemmingOptionLabel"
        optionValue="value"
        filter
        class="w-6 mb-3"
      />
    </div>
    <div class="flex justify-content-center">
      <Dropdown
        v-model="langStopwords"
        :options="stopwordsOptions"
        :optionLabel="stopwordsOptionLabel"
        optionValue="value"
        filter
        class="w-6 mb-3"
      />
    </div>
    <p class="text-center mt-3 mb-3">
      {{ $t("customFilterWords") }}
    </p>
    <div class="flex justify-content-center">
      <Textarea v-model="filterWords" rows="5" cols="30" class="w-6" />
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import {
  getBagOfWords,
  stopwordsOptions,
  stemmingOptions,
} from "@/views/activities/utils";

export default {
  name: "WordCloud",
  props: {
    dataset: {
      required: true,
    },
  },
  data() {
    return {
      stemmingOptions: stemmingOptions,
      stopwordsOptions: stopwordsOptions,
      langStemming: false,
      langStopwords: false,
      maxColor: [163, 11, 11],
      minColor: [24, 86, 143],
      loading: false,
      resized: false,
      minOccurrences: 1,
      filterWords: "",
    };
  },
  computed: {
    filterWordsList() {
      return this.filterWords.split(/\s+/);
    },
    bagOfWords() {
      return getBagOfWords(
        this.sentences,
        this.langStopwords,
        this.langStemming
      )
        .filter((x) => !this.filterWordsList.includes(x[0]))
        .filter((x) => x[1] >= this.minOccurrences);
    },
    maxOccurences() {
      return Math.max(...this.bagOfWords.map(([, weight]) => weight));
    },
    sentences() {
      if (!this.dataset.sentences) return [];
      return this.dataset.sentences.map((x) => x.text);
    },
  },
  methods: {
    calcColor(weight) {
      let percentage = weight / this.maxOccurences;

      let color = this.minColor.map((minComponent, index) => {
        const maxComponent = this.maxColor[index];
        const interpolatedComponent = Math.round(
          minComponent + percentage * (maxComponent - minComponent)
        );
        return interpolatedComponent;
      });

      return `rgb(${color.join(",")})`;
    },
    stemmingOptionLabel({ i18nKey }) {
      if (i18nKey === "doNoStemming") return i18n.global.t(i18nKey);
      return i18n.global.t(i18nKey) + " " + i18n.global.t("stemming");
    },
    stopwordsOptionLabel({ i18nKey }) {
      if (i18nKey === "doNoStopwords") return i18n.global.t(i18nKey);
      return i18n.global.t(i18nKey) + " " + i18n.global.t("stopwords");
    },
    updateLoading(progress) {
      if (!progress) {
        this.loading = false;
        return;
      }
      this.loading = true;
    },
  },
};
</script>
