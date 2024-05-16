<template>
  <div v-if="!dataset">
    <Card>
      <template #title>{{ $t("whatYouNeed") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.whatYouNeed`) }}</p>
      </template>
    </Card>
    <Fieldset
      class="mt-2"
      :legend="$t('learningGoals')"
      :toggleable="true"
      collapsed
    >
      <p>{{ $t(`activities.${activityID}.learningGoals`) }}</p>
    </Fieldset>
    <Card class="mt-2">
      <template #title>{{ $t("intro") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.intro`) }}</p>
      </template>
    </Card>
    <DatasetSelection class="mt-2" @datasetReady="getDataset" />
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
            <vue-word-cloud
              :spacing="1 / 2"
              :words="bagOfWords"
              :color="([, weight]) => calcColor(weight)"
              font-family="Inter var, sans-serif"
              @update:progress="updateLoading"
            ></vue-word-cloud>
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
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('refreshDataset')"
            severity="help"
            @click="refreshDataset"
            :disabled="refreshing"
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
            :options="['greedy', 'weightedRandom', 'random']"
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
        />
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('back')"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="prevCallback"
          />
          <Button
            :label="$t('finishLesson')"
            icon="pi pi-arrow-right"
            iconPos="right"
            severity="success"
            @click="complete = true"
          />
        </div>
      </template>
    </StepperPanel>
  </Stepper>
  <div v-if="complete">
    <Card class="bg-green-900 text-white">
      <template #title>{{ $t("congrats") }}</template>
      <template #content>
        <p>{{ $t("youCompleted") }}</p>
      </template>
    </Card>
    <Fieldset
      class="mt-2"
      :legend="$t('learningOutcomes')"
      :toggleable="true"
      collapsed
    >
      <p>{{ $t(`activities.${activityID}.learningOutcomes`) }}</p>
    </Fieldset>
    <Card class="mt-2">
      <template #title>{{ $t("seeMore") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.readMore`) }}</p>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "primevue/card";
import DatasetSelection from "@/components/DatasetSelection.vue";
import Button from "primevue/button";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";
import Fieldset from "primevue/fieldset";
import { getDatasetById } from "@/api";
import VueWordCloud from "vuewordcloud";
import {
  getBagOfWords,
  generateMostCommonWordByPosition,
  generateNgram,
} from "@/components/utils";
import Dropdown from "primevue/dropdown";
import ProgressBar from "primevue/progressbar";
import TextGenerationVis from "@/components/TextGenerationVis.vue";
import Slider from "primevue/slider";

export default {
  name: "TextCleaning",
  components: {
    Card,
    DatasetSelection,
    Button,
    Stepper,
    StepperPanel,
    Fieldset,
    Dropdown,
    ProgressBar,
    TextGenerationVis,
    Slider,
    "vue-word-cloud": VueWordCloud,
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
      selectionMethod: "greedy",
      windowSize: 2,
      stemmingOptions: [
        { label: this.$t("doNoStemming"), value: false },
        { label: this.$t("englishStemming"), value: "en" },
        { label: this.$t("danishStemming"), value: "da" },
      ],
      stopwordsOptions: [
        { label: this.$t("doNoStopwords"), value: false },
        { label: this.$t("englishStopwords"), value: "en" },
        { label: this.$t("danishStopwords"), value: "da" },
      ],
      langStemming: false,
      langStopwords: false,
      loading: false,
    };
  },
  computed: {
    bagOfWords() {
      return getBagOfWords(
        this.sentences,
        this.langStemming,
        this.langStopwords
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
  },
};
</script>
