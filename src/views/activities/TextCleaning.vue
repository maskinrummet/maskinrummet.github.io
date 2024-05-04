<template>
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
</template>

<script>
import Card from "primevue/card";

export default {
  name: "TextCleaning",
  components: {
    Card,
  },
  props: {
    activityID: {
      type: String,
      required: true,
    },
  },
};
</script>
