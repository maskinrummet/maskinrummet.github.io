<template>
  <span ref="scrollReset"></span>
  <LessonStepper
    v-model:active-step="currStep"
    :linear="!dataset"
    :canProgress="canProgress"
    :steps="[
      {
        name: $t('lessonStepper.introductionStep'),
        beforeNext: fetchDataset,
      },
      $t('step1'),
      $t('step2'),
      {
        name: $t('lessonStepper.doneStep'),
        nextButtonLabel: $t('lessonStepper.finishButton'),
        nextButtonSeverity: 'success',
        beforeNext: completed,
      },
    ]"
  >
    <StepperPanel :header="$t('lessonStepper.introductionStep')">
      <template #content>
        <ActivityDescriptionCard :activity="activity" :hasRequirements="false" />
        <DatasetSelectionV2
          @update:selected-dataset-id="datasetId = $event"
          @update:user-sentence="sentence = $event"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('step1')">
      <template #content>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.textAboutDataset`) }}
          </p>
          <div
            v-for="(s, i) in sentences"
            :key="i"
            class="m-2 border-2 border-round-md p-2"
          >
            {{ s }}
          </div>
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('step2')">
      <template #content>
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.secondTextandActivity`) }}
        </p>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('lessonStepper.doneStep')">
      <template #content>
        <LessonCompletion :activity="activity" />
      </template>
    </StepperPanel>
  </LessonStepper>
</template>
<script>
import { getDatasetById } from "@/api";
import { addSentenceToDataset } from "@/api";
import ActivityDescriptionCard from "@/components/ActivityDescriptionCard.vue";
import DatasetSelectionV2 from "@/components/DatasetSelectionV2.vue";
import LessonCompletion from "@/components/LessonCompletion.vue";
import LessonStepper from "@/components/LessonStepper.vue";
import { gotoFrontpage } from "@/router";

export default {
  name: "ActivityTemplateDigital",
  components: {
    ActivityDescriptionCard,
    DatasetSelectionV2,
    LessonCompletion,
    LessonStepper,
  },
  props: {
    activityID: {
      type: String,
      required: true,
    },
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataset: null,
      datasetId: null,
      sentence: "",
      currStep: 0,
    };
  },
  computed: {
    canProgress() {
      return this.currStep !== 0 ? true : !!this.datasetId;
    },
    sentences() {
      if (!this.dataset?.json_string) return [];
      return JSON.parse(this.dataset.json_string);
    },
  },
  methods: {
    async fetchDataset() {
      if (!this.datasetId) return;
      if (this.sentence) {
        await addSentenceToDataset(this.datasetId, this.sentence);
      }
      this.dataset = (await getDatasetById(this.datasetId)).data;
      this.resetScroll();
    },
    completed() {
      this.resetScroll();
      gotoFrontpage();
    },
    resetScroll() {
      this.$refs.scrollReset.scrollIntoView({ behavior: "smooth" });
    },
  },
  watch: {
    currStep() {
      this.resetScroll();
    },
  },
};
</script>
