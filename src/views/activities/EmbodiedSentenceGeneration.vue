<template>
  <div v-if="!dataset">
    <DatasetSelection @datasetReady="getDataset" />
  </div>
  <ProgressBar
    v-if="loading && dataset && !complete && currStep === 1"
    mode="indeterminate"
    class="w-8 absolute z-5 top-100 mx-auto left-0 right-0"
  >
  </ProgressBar>
  <Stepper v-if="dataset && !complete" v-model:active-step="currStep">
    <StepperPanel :header="$t('randomWords')">
      <template #content="{ nextCallback }">
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.randomWordGen`) }}
          </p>
          <Button
            :label="$t('generateRandomWords')"
            severity="success"
            @click="getRandomWords"
          />
          <div v-if="randomWords">
            <Button
              v-for="word in randomWords"
              :key="word"
              class="m-2"
              severity="info"
              >{{ word }}</Button
            >
            <div>
              {{ $t(`activities.${activityID}.custom.repeat`) }}
            </div>
          </div>
        </div>
        <StepperButtons
          class="pt-4"
          :nextCallback="nextCallback"
          :centerButtonText="$t('refreshDataset')"
          :centerButtonCallback="refreshDataset"
          :centerButtonDisabled="refreshing"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('mostCommonWords')">
      <template #content="{ prevCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.wordCloud`) }}
        </p>
        <div class="flex justify-content-center">
          <div class="w-9 p-3 h-15rem border-2 border-round-md">
            <VueWordCloud
              :spacing="1 / 2"
              :words="bagOfWords"
              :color="([, weight]) => calcColor(weight)"
              font-family="Inter var, sans-serif"
              @update:progress="updateLoading"
            ></VueWordCloud>
          </div>
        </div>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.topWords`) }}
          </p>
          <Button
            v-for="word in fiveTopWords"
            :key="word"
            class="m-2"
            severity="info"
            >{{ word }}</Button
          >
          <p>
            {{ $t(`activities.${activityID}.custom.stopwordsExplained`) }}
          </p>
          <Dropdown
            v-model="langStopwords"
            :options="stopwordsOptions"
            optionLabel="label"
            optionValue="value"
            filter
          />
          <p>
            {{ $t(`activities.${activityID}.custom.bias`) }}
          </p>
        </div>
        <StepperButtons
          class="pt-4"
          :prevCallback="prevCallback"
          :finishCallback="completed"
        />
      </template>
    </StepperPanel>
  </Stepper>
</template>
<script>
import DatasetSelection from "@/components/DatasetSelection.vue";
import { getDatasetById } from "@/api";
import {
  getBagOfWords,
  generateMostCommonWordByPosition,
  generateNgram,
  drawFromBagOfWords,
} from "@/views/activities/utils";

export default {
  name: "TextCleaning",
  components: {
    DatasetSelection,
  },
  props: {
    activityID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataset: null,
      datasetId: null,
      randomWords: null,
      sentence: "",
      complete: false,
      refreshing: false,
      currStep: 0,
      maxColor: [163, 11, 11],
      minColor: [24, 86, 143],
      windowSize: 2,
      stopwordsOptions: [
        { label: this.$t("doNoStopwords"), value: false },
        { label: this.$t("englishStopwords"), value: "en" },
        { label: this.$t("danishStopwords"), value: "da" },
      ],
      langStopwords: false,
      loading: false,
    };
  },
  computed: {
    bagOfWords() {
      return getBagOfWords(this.sentences, this.langStopwords);
    },
    maxOccurences() {
      return Math.max(...this.bagOfWords.map(([, weight]) => weight));
    },
    sentences() {
      if (!this.dataset.json_string) return [];
      return JSON.parse(this.dataset.json_string);
    },
    fiveTopWords() {
      return this.bagOfWords.slice(0, 5).map(([word]) => word);
    },
  },
  methods: {
    generateMostCommonWordByPosition,
    generateNgram,
    async getDataset({ datasetId, userSentence }) {
      this.datasetId = datasetId;
      this.sentence = userSentence;
      this.dataset = (await getDatasetById(datasetId)).data;
      this.$emit("startActivity");
    },
    getRandomWords() {
      this.randomWords = Array.from({ length: 5 }, () =>
        drawFromBagOfWords(this.bagOfWords)
      );
    },
    async refreshDataset() {
      this.refreshing = true;
      this.dataset = (await getDatasetById(this.datasetId)).data;
      this.refreshing = false;
    },
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
    updateLoading(progress) {
      if (!progress) {
        this.loading = false;
        return;
      }
      this.loading = progress;
    },
    completed() {
      this.complete = true;
      this.$emit("completedActivity");
    },
  },
};
</script>
