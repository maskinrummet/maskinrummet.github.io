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
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('step1')">
      <template #content>
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.createSentences`) }}
          </p>
          <div class="w-auto max-w-30rem m-auto">
            <img
              class="w-full border-round-3xl"
              src="@/assets/ce.jpeg"
              alt="Computational Empowerment"
            />
          </div>
          <p>
            {{ $t(`activities.${activityID}.custom.whatIsAWord`) }}
          </p>
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
import ActivityDescriptionCard from "@/components/ActivityDescriptionCard.vue";
import LessonStepper from "@/components/LessonStepper.vue";
import LessonCompletion from "@/components/LessonCompletion.vue";
import { gotoFrontpage } from "@/router";

export default {
  name: "ActivityTemplatePractical",
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
  computed: {
    canProgress() {
      return true;
    },
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
