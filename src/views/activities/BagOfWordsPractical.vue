<template>
  <span ref="scrollReset"></span>
  <LessonStepper
    v-model:active-step="currStep"
    :linear="true"
    :canProgress="true"
    :steps="[
      {
        name: $t('lessonStepper.introductionStep'),
        beforeNext: start,
      },
      $t('sentences'),
      $t('wordFrequency'),
      $t('bagOfWords'),
      $t('textGeneration'),
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
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('sentences')">
      <template #content>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.createSentences`) }}
          </p>
          <div class="w-auto max-w-30rem m-auto">
            <img
              class="w-full border-round-3xl"
              src="@/assets/cut-sentence.jpg"
              :alt="$t(`activities.${activityID}.custom.cuttingAlt`)"
            />
          </div>
          <p>
            {{ $t(`activities.${activityID}.custom.whatIsAWord`) }}
          </p>
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('wordFrequency')">
      <template #content>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.wordFreqChart`) }}
          </p>
          <div class="w-auto max-w-30rem m-auto">
            <img
              class="w-full border-round-3xl"
              src="@/assets/word-freq.jpeg"
              :alt="$t(`activities.${activityID}.custom.freqAlt`)"
            />
          </div>
          <p>
            {{ $t(`activities.${activityID}.custom.whatFrequencySays`) }}
          </p>
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('bagOfWords')">
      <template #content>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.createBagOfWords`) }}
          </p>
          <div class="w-auto max-w-30rem m-auto">
            <img
              class="w-full border-round-3xl"
              src="@/assets/bag-of-words.jpg"
              :alt="$t(`activities.${activityID}.custom.bagOfWordsAlt`)"
            />
          </div>
          <p>
            {{ $t(`activities.${activityID}.custom.whatBagOfWordsDoes`) }}
          </p>
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('textGeneration')">
      <template #content>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.generateText`) }}
          </p>
          <div class="w-auto max-w-30rem m-auto">
            <img
              class="w-full border-round-3xl"
              src="@/assets/bag-of-words-generation.jpeg"
              :alt="$t(`activities.${activityID}.custom.textGenerationAlt`)"
            />
          </div>
          <p>
            {{ $t(`activities.${activityID}.custom.probabilities`) }}
          </p>
        </div>
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
import ActivityDescriptionCard from "@/components/ActivityDescriptionCard.vue";
import LessonStepper from "@/components/LessonStepper.vue";
import LessonCompletion from "@/components/LessonCompletion.vue";
import { gotoFrontpage } from "@/router";

export default {
  name: "BagOfWordsPractical",
  components: {
    ActivityDescriptionCard,
    LessonStepper,
    LessonCompletion,
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
      currStep: 0,
    };
  },
  methods: {
    start() {
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
