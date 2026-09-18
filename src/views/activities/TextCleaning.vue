<template>
  <span ref="scrollReset"></span>
  <LessonStepper
    v-model:active-step="currStep"
    :linear="true"
    :canProgress="canProgress"
    :steps="[
      {
        name: $t('lessonStepper.introductionStep'),
        beforeNext: startLesson,
      },
      $t('yourSentence'),
      $t('splitting'),
      $t('lowercasing'),
      $t('cleaning'),
      {
        name: $t('lessonStepper.doneStep'),
        nextButtonLabel: $t('lessonStepper.finishButton'),
        nextButtonSeverity: 'success',
        beforeNext: finishLesson,
      },
    ]"
  >
    <StepperPanel :header="$t('lessonStepper.introductionStep')">
      <template #content>
        <ActivityDescriptionCard :activity="activity" :hasRequirements="false" />
        <Card>
          <template #title>{{ $t('sentenceInputTitle') }}</template>
          <template #content>
            <InputText
              v-model="sentenceInput"
              class="w-full"
              :placeholder="$t('yourSentence')"
              :maxlength="250"
            />
          </template>
        </Card>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('yourSentence')">
      <template #content>
        {{ $t("gotSentence") }} {{ sentence }}
        <p>{{ $t(`activities.${activityID}.custom.howComputersSee`) }}</p>
        <Button
          v-for="s in sentenceCoded"
          :key="s.index"
          :label="s.showChar ? s.char : s.code.toString()"
          @mouseenter="s.showChar = !s.showChar"
          :severity="s.showChar ? 'primary' : 'secondary'"
          style="width: 2em; height: 2em"
          class="p-0 mr-1 mb-1"
          ><template #default
        /></Button>
        <div class="flex py-3 justify-content-center">
          <Button
            :label="$t('seeComputer')"
            severity="secondary"
            icon="pi pi-desktop"
            @click="sentenceCoded.forEach((s) => (s.showChar = false))"
            :disabled="sentenceCoded.every((s) => !s.showChar)"
          />
          <Button
            :label="$t('seeHuman')"
            icon="pi pi-eye"
            iconPos="right"
            class="ml-2"
            @click="sentenceCoded.forEach((s) => (s.showChar = true))"
            :disabled="sentenceCoded.every((s) => s.showChar)"
          />
        </div>
        <p>
          {{ $t(`activities.${activityID}.custom.characterCodesExplained`) }}
        </p>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('splitting')">
      <template #content>
        <p>
          {{
            $t(`activities.${activityID}.custom.splitSentenceUsingSpaceBelow`)
          }}
        </p>
        <div class="flex py-3 justify-content-center">
          <Button
            :label="$t('seeComputer')"
            severity="secondary"
            icon="pi pi-desktop"
            @click="sentenceCoded.forEach((s) => (s.showChar = false))"
            :disabled="sentenceCoded.every((s) => !s.showChar)"
          />
          <Button
            :label="$t('seeHuman')"
            icon="pi pi-eye"
            iconPos="right"
            class="ml-2"
            @click="sentenceCoded.forEach((s) => (s.showChar = true))"
            :disabled="sentenceCoded.every((s) => s.showChar)"
          />
        </div>
        <div ref="spaceButtons">
          <Button
            v-for="s in sentenceCoded"
            :key="s.index"
            :label="s.showChar ? s.char : s.code.toString()"
            @mouseenter="s.showChar = !s.showChar"
            :severity="s.showChar ? 'primary' : 'secondary'"
            :style="
              'width: 2em; height: 2em' +
              (s.hidden ? '; visibility: hidden' : '')
            "
            :class="s.char === ' ' ? 'p-0 mx-1 mb-1' : 'p-0 mb-1'"
            @click="spaceClick(s, $event)"
            ><template #default
          /></Button>
        </div>
        <p v-if="!sentenceCoded.some((s) => s.char === ' ' && !s.hidden)">
          {{ $t(`niceWork`) }}
        </p>
        <div class="flex justify-content-center mt-2">
          <Button
            :label="$t('autoClick')"
            @click="clickAllButtons('spaceButtons')"
            :disabled="!sentenceCoded.some((s) => s.char === ' ' && !s.hidden)"
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('lowercasing')">
      <template #content>
        <p>
          {{ $t(`activities.${activityID}.custom.lowercaseSentenceBelow`) }}
        </p>
        <div class="flex py-3 justify-content-center">
          <Button
            :label="$t('seeComputer')"
            severity="secondary"
            icon="pi pi-desktop"
            @click="sentenceCoded.forEach((s) => (s.showChar = false))"
            :disabled="sentenceCoded.every((s) => !s.showChar)"
          />
          <Button
            :label="$t('seeHuman')"
            icon="pi pi-eye"
            iconPos="right"
            class="ml-2"
            @click="sentenceCoded.forEach((s) => (s.showChar = true))"
            :disabled="sentenceCoded.every((s) => s.showChar)"
          />
        </div>

        <div ref="lowercaseButtons">
          <Button
            v-for="s in sentenceCoded"
            :key="s.index"
            :label="
              s.showLower
                ? s.showChar
                  ? s.lowercaseChar
                  : s.lowercaseCode.toString()
                : s.showChar
                ? s.char
                : s.code.toString()
            "
            @mouseenter="s.showChar = !s.showChar"
            :severity="s.showChar ? 'primary' : 'secondary'"
            :style="
              'width: 2em; height: 2em' +
              (s.char === ' ' ? '; visibility: hidden' : '')
            "
            :class="'p-0 mb-1'"
            @click="capsClick(s, $event)"
            ><template #default
          /></Button>
        </div>
        <p
          v-if="
            !sentenceCoded.some(
              (s) => !s.showLower && s.char !== s.lowercaseChar
            )
          "
        >
          {{ $t(`niceWork`) }}
        </p>
        <div class="flex justify-content-center mt-2">
          <Button
            :label="$t('autoClick')"
            @click="clickAllButtons('lowercaseButtons')"
            :disabled="
              !sentenceCoded.some(
                (s) => !s.showLower && s.char !== s.lowercaseChar
              )
            "
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('cleaning')">
      <template #content>
        <p>
          {{ $t(`activities.${activityID}.custom.removePuncBelow`) }}
        </p>
        <div class="flex py-3 justify-content-center">
          <Button
            :label="$t('seeComputer')"
            severity="secondary"
            icon="pi pi-desktop"
            @click="sentenceCoded.forEach((s) => (s.showChar = false))"
            :disabled="sentenceCoded.every((s) => !s.showChar)"
          />
          <Button
            :label="$t('seeHuman')"
            icon="pi pi-eye"
            iconPos="right"
            class="ml-2"
            @click="sentenceCoded.forEach((s) => (s.showChar = true))"
            :disabled="sentenceCoded.every((s) => s.showChar)"
          />
        </div>

        <div ref="puncButtons">
          <Button
            v-for="s in sentenceCoded"
            :key="s.index"
            :label="s.showChar ? s.lowercaseChar : s.lowercaseCode.toString()"
            @mouseenter="s.showChar = !s.showChar"
            :severity="
              s.inAnimation ? 'contrast' : s.showChar ? 'primary' : 'secondary'
            "
            :style="
              'width: 2em; height: 2em' +
              (s.char === ' ' ? '; visibility: hidden' : '')
            "
            :class="'p-0 mb-1'"
            @click="puncClick(s, $event)"
            ><template #default
          /></Button>
        </div>
        <p v-if="!sentenceCoded.some((s) => s.isPunc && !s.inAnimation)">
          {{ $t(`activities.${activityID}.custom.introToTokenisation`) }}
        </p>
        <div class="flex justify-content-center mt-2">
          <Button
            :label="$t('autoClick')"
            @click="clickAllButtons('puncButtons')"
            :disabled="!sentenceCoded.some((s) => s.isPunc && !s.inAnimation)"
          />
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
import InputText from "primevue/inputtext";

export default {
  name: "TextCleaning",
  components: {
    ActivityDescriptionCard,
    LessonStepper,
    LessonCompletion,
    InputText,
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
      sentenceInput: "",
      sentence: "",
      sentenceCoded: [],
      currStep: 0,
    };
  },
  computed: {
    canProgress() {
      if (this.currStep === 0) return !!this.sentenceInput;
      if (this.currStep === 2) {
        return !this.sentenceCoded.some((s) => s.char === " " && !s.hidden);
      }
      if (this.currStep === 3) {
        return !this.sentenceCoded.some(
          (s) => !s.showLower && s.char !== s.lowercaseChar
        );
      }
      if (this.currStep === 4) {
        return !this.sentenceCoded.some((s) => s.isPunc && !s.inAnimation);
      }
      return true;
    },
  },
  methods: {
    startLesson() {
      this.getSentence(this.sentenceInput);
    },
    getSentence(sentence) {
      this.sentence =
        this.isPunc(sentence.slice(-1)) && !sentence.slice(-1) == " "
          ? sentence
          : sentence + ".";
      this.resetSentenceCoded(() => {});
    },
    resetSentenceCoded(callback) {
      this.sentenceCoded = Array.from(this.sentence).map((c, i) => {
        return {
          char: c,
          lowercaseChar: c.toLowerCase(),
          index: i,
          code: c.charCodeAt(0),
          lowercaseCode: c.toLowerCase().charCodeAt(0),
          showChar: false,
          hidden: false,
          showLower: false,
          inAnimation: false,
          isPunc: this.isPunc(c),
        };
      });
      callback();
    },
    isCapital(char) {
      return char === char.toUpperCase() && char !== char.toLowerCase();
    },
    isPunc(char) {
      return (
        char === char.toUpperCase() &&
        char === char.toLowerCase() &&
        char !== " "
      );
    },
    spaceClick(s, event) {
      if (!event) {
        return;
      }
      if (s.char === " ") {
        s.hidden = "true";
      }
      // TODO: ELSE SHAKE?
    },
    async capsClick(s, event) {
      if (!event) {
        return;
      }
      if (!s.showLower && !s.inAnimation && this.isCapital(s.char)) {
        s.inAnimation = true;
        const originalCharCode = s.code;
        const originalChar = s.char;
        while (s.code < s.lowercaseCode) {
          s.code += 1;
          s.char = String.fromCharCode(s.code);
          await new Promise((r) => setTimeout(r, 100));
        }
        s.showLower = !s.showLower;
        s.code = originalCharCode;
        s.char = originalChar;
        s.inAnimation = false;
      }
      // TODO: ELSE SHAKE?
    },
    puncClick(s, event) {
      if (!event) {
        return;
      }
      if (s.isPunc && !s.inAnimation) {
        s.inAnimation = true;
      }
      // TODO: ELSE SHAKE?
    },
    clickAllButtons(elementId) {
      if (!this.$refs[elementId]) {
        return;
      }
      this.$refs[elementId].querySelectorAll("button").forEach((button) => {
        button.click();
      });
    },
    finishLesson() {
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
