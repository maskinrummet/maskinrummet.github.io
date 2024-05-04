<template>
  <div>
    <h3>{{ $t("currentActivity") }}</h3>
    <div v-if="activity">
      <Card class="mb-2 bg-purple-900 text-white">
        <template #header>
          <div class="flex justify-content-between pt-3 px-5">
            <div>
              <i class="pi pi-user"></i>
              {{ $t("age") }} {{ activity.age }}+
            </div>
            <div class="text-right">
              {{ activity.duration + $t("mins").slice(0, 1) }}
              <i class="pi pi-stopwatch"></i>
            </div>
          </div>
        </template>
        <template #title>{{ $t(`activities.${activity.id}.title`) }}</template>
        <template #subtitle>{{ $t(activity.modality) }}</template>
        <template #content>
          <p>{{ $t(`activities.${activity.id}.description`) }}</p>
          <div class="pt-3">
            {{ $t("subject") }}:
            <Tag :value="$t(activity.subject)"></Tag>
          </div>
          <div class="pt-1">
            {{ $t("topics") }}:
            <Tag
              v-for="(t, i) in activity.topics"
              :value="$t(t)"
              :key="i"
              severity="secondary"
              class="mr-1"
            ></Tag>
          </div>
        </template>
      </Card>

      <!-- Switch logic for activity -->
      <TextCleaning
        v-if="activity.id === 'textCleaning'"
        :activityID="activity.id"
      ></TextCleaning>
      <TextCleaningPaper
        v-else-if="activity.id === 'textCleaningPaper'"
        :activityID="activity.id"
      ></TextCleaningPaper>
      <div v-else>Activity has not been registered properly</div>
    </div>
    <div v-else>
      <p>{{ $t("activityNotFound") }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Card from "primevue/card";
import Tag from "primevue/tag";
import { TextCleaning, TextCleaningPaper } from "./activities";

export default {
  name: "ActivityDetail",
  components: {
    Card,
    Tag,
    TextCleaning,
    TextCleaningPaper,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const activityId = computed(() => route.query.id);
    const activity = computed(() =>
      store.getters.getActivityById(activityId.value)
    );

    return {
      activity,
    };
  },
};
</script>
