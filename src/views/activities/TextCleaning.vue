<template>
  <div v-if="!sentence">
    <Card>
      <template #title>{{ $t("whatYouNeed") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.whatYouNeed`) }}</p>
      </template>
    </Card>
    <Card class="mt-2">
      <template #title>{{ $t("learningGoals") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.learningGoals`) }}</p>
      </template>
    </Card>
    <Card class="mt-2">
      <template #title>{{ $t("intro") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.intro`) }}</p>
      </template>
    </Card>
    <SingleSentenceInput
      v-model="sentence"
      class="mt-2"
      @sentenceReady="getSentence"
    />
  </div>
  <Stepper linear v-if="sentence && !complete">
    <StepperPanel :header="$t('yourSentence')">
      <template #content="{ nextCallback }">
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
        <p>
          {{ $t(`activities.${activityID}.custom.characterCodesExplained`) }}
        </p>
        <div class="flex pt-4 justify-content-end">
          <Button
            :label="$t('next')"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="resetSentenceCoded(nextCallback)"
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('splitting')">
      <template #content="{ prevCallback, nextCallback }">
        <p>
          {{
            $t(`activities.${activityID}.custom.splitSentenceUsingSpaceBelow`)
          }}
        </p>
        <Button
          v-for="s in sentenceCoded"
          :key="s.index"
          :label="s.showChar ? s.char : s.code.toString()"
          @mouseenter="s.showChar = !s.showChar"
          :severity="s.showChar ? 'primary' : 'secondary'"
          :style="
            'width: 2em; height: 2em' + (s.hidden ? '; visibility: hidden' : '')
          "
          :class="s.char === ' ' ? 'p-0 mx-1 mb-1' : 'p-0 mb-1'"
          @click="spaceClick(s, $event)"
          ><template #default
        /></Button>
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('back')"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="resetSentenceCoded(prevCallback)"
          />
          <Button
            :label="$t('next')"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="resetSentenceCoded(nextCallback)"
            :disabled="sentenceCoded.some((s) => s.char === ' ' && !s.hidden)"
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('lowercasing')">
      <template #content="{ prevCallback, nextCallback }">
        <p>
          {{ $t(`activities.${activityID}.custom.lowercaseSentenceBelow`) }}
        </p>
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
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('back')"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="resetSentenceCoded(prevCallback)"
          />
          <Button
            :label="$t('next')"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="resetSentenceCoded(nextCallback)"
            :disabled="
              sentenceCoded.some(
                (s) => !s.showLower && s.char !== s.lowercaseChar
              )
            "
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('cleaning')">
      <template #content="{ prevCallback }">
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
        <div class="flex pt-4 justify-content-between">
          <Button
            :label="$t('back')"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="resetSentenceCoded(prevCallback)"
          />
          <Button
            :label="$t('finishLesson')"
            icon="pi pi-arrow-right"
            iconPos="right"
            severity="success"
            @click="finishLesson"
            :disabled="sentenceCoded.some((s) => s.isPunc && !s.inAnimation)"
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
    <Card class="mt-2">
      <template #title>{{ $t("learningOutcomes") }}</template>
      <template #content>
        <p>{{ $t(`activities.${activityID}.learningOutcomes`) }}</p>
      </template>
    </Card>
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
import SingleSentenceInput from "@/components/SingleSentenceInput.vue";
import Button from "primevue/button";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";

export default {
  name: "TextCleaning",
  components: {
    Card,
    SingleSentenceInput,
    Button,
    Stepper,
    StepperPanel,
  },
  props: {
    activityID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sentence: "",
      sentenceCoded: [],
      complete: false,
    };
  },
  methods: {
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
    finishLesson() {
      this.complete = true;
    },
  },
};
</script>
