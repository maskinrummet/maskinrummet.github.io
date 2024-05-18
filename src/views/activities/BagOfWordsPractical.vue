<template>
  <div v-if="!started" class="flex justify-content-center">
    <Button @click="start">{{ $t("startActivity") }}</Button>
  </div>
  <Stepper v-if="started && !complete">
    <StepperPanel :header="$t('sentences')">
      <template #content="{ nextCallback }">
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
        <StepperButtons class="pt-4" :nextCallback="nextCallback" />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('wordFrequency')">
      <template #content="{ prevCallback, nextCallback }">
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
        <StepperButtons
          class="pt-4"
          :prevCallback="prevCallback"
          :nextCallback="nextCallback"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('bagOfWords')">
      <template #content="{ prevCallback, nextCallback }">
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
        <StepperButtons
          class="pt-4"
          :prevCallback="prevCallback"
          :nextCallback="nextCallback"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('textGeneration')">
      <template #content="{ prevCallback }">
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
  name: "TextCleaning",
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
