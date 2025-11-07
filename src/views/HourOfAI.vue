<template>
  <div class="flex justify-content-center pt-5">
    <img
      class="h-3rem"
      src="@/assets/kombineretlogo.jpg"
      alt="Aarhus University and Hour of AI logo"
    />
  </div>

  <div class="flex align-items-center justify-content-center flex-wrap p-5">
    <div class="text-4xl mr-5">
      {{ $t("hourOfAI.hourOfAITitle") }}
    </div>
    <div class="border-round m-2 p-2 bg-primary">
      {{ $t("hourOfAI.ages") }}
    </div>
  </div>

  <div class="grid border-round surface-100 p-3 mb-5">
    <div v-for="(img, i) in highlightedImages" :key="i" class="col-6 lg:col-3">
      <img
        class="w-full border-round-2xl align-self-center"
        :src="`images/${img}.jpg`"
        alt="Images of Activity"
      />
    </div>
  </div>

  <Card class="my-2">
    <template #title>{{ $t("intro") }}</template>
    <template #content>
      <div v-html="$t(`hourOfAI.intro`)"></div>
    </template>
  </Card>

  <Card class="my-3">
    <template #title>{{ $t("whatYouNeed") }}</template>
    <template #content>
      <div v-html="$t(`hourOfAI.whatYouNeed`)"></div>
    </template>
  </Card>

  <Card class="my-3 border-solid border-primary bg-primary-reverse">
    <template #title>{{ $t("hourOfAI.surveyTitle") }}</template>
    <template #content>
      <div v-html="$t(`hourOfAI.surveyText`)"></div>
    </template>
  </Card>

  <Fieldset legend="Steps" :toggleable="true" class="mb-3 surface-100">
    <div class="flex flex-row flex-wrap w-full h-full">
      <div
        v-for="({ text, teachingPoint, questions, imageLink }, i) in steps"
        :key="i"
        class="flex lg:flex-row flex-column w-full h-full bg-white border-solid border-gray-200 border-round p-3 mb-3"
      >
        <div
          class="flex flex-column align-items-center justify-content-start flex-1"
        >
          <h2 class="p-3">{{ $t("hourOfAI.step") }} {{ i + 1 }}</h2>
          <div class="p-2" v-html="text"></div>
          <img
            class="w-full max-w-full border-round-2xl align-self-center m-3"
            :src="'/' + imageLink"
            alt="Step Image"
          />
        </div>

        <Divider class="block lg:hidden" layout="horizontal" />
        <Divider class="hidden lg:block" layout="vertical" />
        <!-- Right side -->
        <div
          class="flex flex-column align-items-center justify-content-start flex-1 gap-4"
        >
          <div class="flex flex-column align-items-center" v-if="teachingPoint">
            <h2 class="p-3">
              {{ $t("hourOfAI.teachingPoint") }}
            </h2>
            <div class="p-2" v-html="teachingPoint"></div>
          </div>
          <Divider
            layout="horizontal"
            class="mb-0"
            v-if="teachingPoint && questions"
          />
          <div class="flex flex-column align-items-center" v-if="questions">
            <h2 class="p-3">
              {{ $t("hourOfAI.questions") }}
            </h2>
            <div class="p-2 text-primary mb-5" v-html="questions"></div>
          </div>
        </div>
      </div>
    </div>
  </Fieldset>

  <Card class="my-1 mb-4">
    <template #title>{{ $t("learningOutcomes") }}</template>
    <template #content>
      <div v-html="$t(`hourOfAI.learningOutcomes`)"></div>
    </template>
  </Card>

  <p class="my-4 text-center" v-html="$t('hourOfAI.acks')"></p>
</template>

<script>
import i18n from "@/i18n";

export default {
  data() {
    return {
      highlightedImages: [
        "write-slip",
        "pooled-slip",
        "pies",
        "spinning-wheels",
      ],
    };
  },
  computed: {
    steps() {
      let locale = i18n.global.locale;
      if (!locale || !i18n.global.messages[locale].hourOfAI) return [];
      return i18n.global.messages[locale].hourOfAI.steps;
    },
  },
};
</script>
