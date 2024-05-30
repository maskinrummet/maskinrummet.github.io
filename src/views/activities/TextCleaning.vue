<template>
  <div v-if="!sentence">
    <Card>
      <template #title>{{ this.$t("sentenceInputTitle") }}</template>
      <template #content>
        <SingleSentenceInput
          v-model="sentence"
          class="mt-2"
          @sentenceReady="getSentence"
        />
      </template>
    </Card>
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
        <StepperButtons
          class="pt-4"
          :nextCallback="() => resetSentenceCoded(nextCallback)"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('splitting')">
      <template #content="{ prevCallback, nextCallback }">
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
        <StepperButtons
          class="pt-4"
          :prevCallback="() => resetSentenceCoded(prevCallback)"
          :nextCallback="() => resetSentenceCoded(nextCallback)"
          :nextDisabled="sentenceCoded.some((s) => s.char === ' ' && !s.hidden)"
          :centerButtonText="$t('autoClick')"
          :centerButtonCallback="() => clickAllButtons('spaceButtons')"
          :centerButtonDisabled="
            !sentenceCoded.some((s) => s.char === ' ' && !s.hidden)
          "
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('lowercasing')">
      <template #content="{ prevCallback, nextCallback }">
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
        <StepperButtons
          class="pt-4"
          :prevCallback="() => resetSentenceCoded(prevCallback)"
          :nextCallback="() => resetSentenceCoded(nextCallback)"
          :nextDisabled="
            sentenceCoded.some(
              (s) => !s.showLower && s.char !== s.lowercaseChar
            )
          "
          :centerButtonText="$t('autoClick')"
          :centerButtonCallback="() => clickAllButtons('lowercaseButtons')"
          :centerButtonDisabled="
            !sentenceCoded.some(
              (s) => !s.showLower && s.char !== s.lowercaseChar
            )
          "
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('cleaning')">
      <template #content="{ prevCallback }">
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
        <StepperButtons
          class="pt-4"
          :prevCallback="() => resetSentenceCoded(prevCallback)"
          :finishCallback="finishLesson"
          :finishDisabled="
            sentenceCoded.some((s) => s.isPunc && !s.inAnimation)
          "
          :centerButtonText="$t('autoClick')"
          :centerButtonCallback="() => clickAllButtons('puncButtons')"
          :centerButtonDisabled="
            !sentenceCoded.some((s) => s.isPunc && !s.inAnimation)
          "
        />
      </template>
    </StepperPanel>
  </Stepper>
</template>

<script>
import SingleSentenceInput from "@/components/SingleSentenceInput.vue";

export default {
  name: "TextCleaning",
  components: {
    SingleSentenceInput,
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
      this.$emit("startActivity");
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
      this.complete = true;
      this.$emit("completedActivity");
    },
  },
};
</script>
