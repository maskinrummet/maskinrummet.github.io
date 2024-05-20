<template>
  <div v-if="!dataset">
    <DatasetSelection @datasetReady="getDataset" />
  </div>
  <ProgressBar
    v-if="loading && dataset && !complete && currStep === 0"
    mode="indeterminate"
    class="w-8 absolute z-5 top-100 mx-auto left-0 right-0"
  >
  </ProgressBar>
  <Stepper v-if="dataset && !complete" v-model:active-step="currStep">
    <StepperPanel :header="$t('wordCloud')">
      <template #content="{ nextCallback }">
        <p>
          {{ $t(`activities.${activityID}.custom.wordCloudBelow`) }}
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
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.stemmingExplained`) }}
        </p>
        <div class="flex justify-content-center">
          <Dropdown
            v-model="langStemming"
            :options="stemmingOptions"
            optionLabel="label"
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
            optionLabel="label"
            optionValue="value"
            filter
          />
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
    <StepperPanel :header="$t('positionalTextGeneration')">
      <template #content="{ prevCallback, nextCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.positionalGeneration`) }}
        </p>
        <TextGenerationVis
          :generateFn="() => generateMostCommonWordByPosition(sentences)"
        />
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('back')"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="prevCallback"
          />
          <Button
            :label="$t('next')"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="nextCallback"
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
            optionLabel="label"
            optionValue="value"
          />
          <!-- TODO -->
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
        />
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
  stemmingOptions,
  stopwordsOptions,
  selectionMethodOptions,
} from "@/views/activities/utils";
import TextGenerationVis from "@/components/TextGenerationVis.vue";

export default {
  name: "TextCleaning",
  components: {
    DatasetSelection,
    TextGenerationVis,
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
      refreshing: false,
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
