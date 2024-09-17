<template>
  <span ref="scrollReset"></span>
  <div v-if="!dataset">
    <DatasetSelection @datasetReady="getDataset" />
  </div>
  <ProgressBar
    v-if="loading && dataset && !complete && currStep === 0"
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
    <StepperPanel :header="$t('wordCloud')">
      <template #content="{ nextCallback }">
        <p>
          {{ $t(`activities.${activityID}.custom.wordCloudBelow`) }}
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
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.stemmingExplained`) }}
        </p>
        <div class="flex justify-content-center">
          <Dropdown
            v-model="langStemming"
            :options="stemmingOptions"
            :optionLabel="stemmingOptionLabel"
            optionValue="value"
            filter
          />
        </div>
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.stopwordsExplained`) }}
        </p>
        <div class="flex justify-content-center">
          <Dropdown
            v-model="langStopwords"
            :options="stopwordsOptions"
            :optionLabel="stopwordsOptionLabel"
            optionValue="value"
            filter
          />
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
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('positionalTextGeneration')">
      <template #content="{ prevCallback, nextCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.positionalGeneration`) }}
        </p>
        <TextGenerationVis
          :generateFn="() => generateMostCommonWordByPosition(sentences)"
          :sentences="sentences"
        />
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('back')"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="
              () => {
                resetScroll();
                prevCallback();
              }
            "
          />
          <Button
            :label="$t('next')"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="
              () => {
                resetScroll();
                nextCallback();
              }
            "
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('nGramsGeneration')">
      <template #content="{ prevCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.nGramGeneration`) }}
        </p>
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
          :generateFn="
            () => generateNgram(sentences, selectionMethod, windowSize)
          "
          :disableGenerate="!selectionMethod"
          :sentences="sentences"
        />
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
  stemmingOptions,
  stopwordsOptions,
  selectionMethodOptions,
} from "@/views/activities/utils";
import TextGenerationVis from "@/components/TextGenerationVis.vue";
import DatasetModal from "@/components/DatasetModal.vue";

export default {
  name: "TextCleaning",
  components: {
    DatasetSelection,
    TextGenerationVis,
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
      sentence: "",
      complete: false,
      currStep: 0,
      maxColor: [163, 11, 11],
      minColor: [24, 86, 143],
      selectionMethodOptions,
      selectionMethod: null,
      windowSize: 2,
      stemmingOptions: stemmingOptions,
      stopwordsOptions: stopwordsOptions,
      langStemming: false,
      langStopwords: false,
      loading: false,
      resized: false,
    };
  },
  computed: {
    bagOfWords() {
      return getBagOfWords(
        this.sentences,
        this.langStopwords,
        this.langStemming
      );
    },
    maxOccurences() {
      return Math.max(...this.bagOfWords.map(([, weight]) => weight));
    },
    sentences() {
      if (!this.dataset.json_string) return [];
      return JSON.parse(this.dataset.json_string);
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
  },
};
</script>
