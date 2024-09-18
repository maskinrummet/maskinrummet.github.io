<template>
  <span ref="scrollReset"></span>
  <div v-if="!dataset">
    <DatasetSelection @datasetReady="getDataset" />
  </div>
  <ProgressBar
    v-if="loading && dataset && !complete && currStep === 1"
    mode="indeterminate"
    class="w-6 absolute z-5 mx-auto left-0 right-0"
    :style="{ top: topForProgressBar + 'px' }"
  >
  </ProgressBar>
  <DatasetModal
    @refresh="refreshDataset"
    :datasetId="datasetId"
    ref="datasetModal"
  ></DatasetModal>
  <Stepper v-if="dataset && !complete" v-model:active-step="currStep">
    <StepperPanel :header="$t('randomWords')">
      <template #content="{ nextCallback }">
        <div class="text-center">
          <div
            class="my-2"
            v-html="$t(`activities.${activityID}.custom.randomWordGen`)"
          ></div>
          <Button
            class="m-2"
            :label="$t('generateRandomWords')"
            severity="success"
            @click="getRandomWords"
          />
          <div v-if="randomWords">
            <Button
              v-for="word in randomWords"
              :key="word + Math.random().toString(12)"
              class="m-2"
              severity="info"
              >{{ word }}</Button
            >
            <div class="mt-4">
              {{ $t(`activities.${activityID}.custom.repeat`) }}
            </div>
          </div>
        </div>
        <StepperButtons
          class="pt-4"
          :nextCallback="
            () => {
              resetScroll();
              nextCallback();
            }
          "
          :centerButtonText="$t('viewDataset')"
          :centerButtonCallback="showDatasetModal"
          :nextDisabled="!randomWords"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('mostCommonWords')">
      <template #content="{ prevCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.wordCloud`) }}
        </p>
        <div class="flex justify-content-center">
          <div class="w-9 p-3 h-15rem border-2 border-round-md" ref="wordCloud">
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
            :optionLabel="stopwordsOptionLabel"
            optionValue="value"
            filter
          />
          <p>
            {{ $t(`activities.${activityID}.custom.bias`) }}
          </p>
        </div>
        <StepperButtons
          class="pt-4"
          :prevCallback="
            () => {
              resetScroll();
              prevCallback();
            }
          "
          :finishCallback="completed"
        />
      </template>
    </StepperPanel>
  </Stepper>
</template>
<script>
import DatasetSelection from "@/components/DatasetSelection.vue";
import { getDatasetById } from "@/api";
import i18n from "@/i18n";
import {
  getBagOfWords,
  generateMostCommonWordByPosition,
  generateNgram,
  drawFromBagOfWords,
  stopwordsOptions,
} from "@/views/activities/utils";
import DatasetModal from "@/components/DatasetModal.vue";

export default {
  name: "EmbodiedSentenceGeneration",
  components: {
    DatasetSelection,
    DatasetModal,
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
      currStep: 0,
      maxColor: [163, 11, 11],
      minColor: [24, 86, 143],
      windowSize: 2,
      stopwordsOptions,
      langStopwords: false,
      loading: false,
      resized: false,
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
    topForProgressBar() {
      this.resized;
      if (!this.$refs.wordCloud) return -99999;
      return (
        this.$refs.wordCloud.offsetTop + this.$refs.wordCloud.clientHeight / 2
      );
    },
  },
  mounted() {
    window.addEventListener("resize", () => (this.resized = !this.resized));
  },
  unmounted() {
    window.removeEventListener("resize", () => (this.resized = !this.resized));
  },
  methods: {
    generateMostCommonWordByPosition,
    generateNgram,
    async getDataset({ datasetId, userSentence }) {
      this.datasetId = datasetId;
      this.sentence = userSentence;
      this.dataset = (await getDatasetById(datasetId)).data;
      this.$emit("startActivity");
      this.resetScroll();
    },
    refreshDataset(dataset) {
      this.dataset = dataset;
    },
    getRandomWords() {
      this.randomWords = Array.from({ length: 5 }, () =>
        drawFromBagOfWords(this.bagOfWords)
      );
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
      this.loading = true;
    },
    completed() {
      this.resetScroll();
      this.complete = true;
      this.$emit("completedActivity");
    },
    showDatasetModal() {
      this.$refs.datasetModal.show();
    },
    resetScroll() {
      this.$refs.scrollReset.scrollIntoView({ behavior: "smooth" });
    },
    stopwordsOptionLabel({ i18nKey }) {
      if (i18nKey === "doNoStopwords") return i18n.global.t(i18nKey);
      return i18n.global.t(i18nKey) + " " + i18n.global.t("stopwords");
    },
  },
};
</script>
