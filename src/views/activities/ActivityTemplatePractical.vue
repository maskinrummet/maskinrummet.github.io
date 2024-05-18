<template>
  <div v-if="!started" class="flex justify-content-center">
    <Button @click="start">{{ $t("startActivity") }}</Button>
  </div>
  <Stepper v-if="started && !complete">
    <StepperPanel :header="$t('step1')">
      <template #content="{ nextCallback }">
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
        <StepperButtons class="pt-4" :nextCallback="nextCallback" />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('step2')">
      <template #content="{ prevCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.secondTextandActivity`) }}
        </p>
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
export default {
  name: "ActivityTemplatePractical",
  props: {
    activityID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      started: false,
      complete: false,
      refreshing: false,
    };
  },
  methods: {
    start() {
      this.started = true;
      this.$emit("startActivity");
    },
    completed() {
      this.complete = true;
      this.$emit("completedActivity");
    },
  },
};
</script>
