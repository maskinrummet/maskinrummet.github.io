<template>
  <div>
    <h3>
      <router-link to="/"> {{ $t("availableActivities") }} </router-link> >
      {{ $t("currentActivity") }}
    </h3>
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
      <div v-if="!inProgress">
        <Card>
          <template #title>{{ $t("whatYouNeed") }}</template>
          <template #content>
            <div v-html="$t(`activities.${activity.id}.whatYouNeed`)"></div>
          </template>
        </Card>
        <Fieldset
          class="mt-2"
          :legend="$t('learningGoals')"
          :toggleable="true"
          collapsed
        >
          <div v-html="$t(`activities.${activity.id}.learningGoals`)"></div>
        </Fieldset>
        <Card class="my-2">
          <template #title>{{ $t("intro") }}</template>
          <template #content>
            <div v-html="$t(`activities.${activity.id}.intro`)"></div>
          </template>
        </Card>
      </div>

      <!-- Switch logic for activity -->
      <component
        :is="currentComponent"
        v-if="currentComponent"
        :activityID="activity.id"
        @startActivity="inProgress = true"
        @completedActivity="completed = true"
      ></component>
      <div v-else>Activity has not been registered properly</div>
      <div v-if="completed">
        <Card class="bg-green-900 text-white">
          <template #title>{{ $t("congrats") }}</template>
          <template #content>
            <p>{{ $t("youCompleted") }}</p>
          </template>
        </Card>
        <Fieldset
          class="mt-2"
          :legend="$t('learningOutcomes')"
          :toggleable="true"
          collapsed
        >
          <div v-html="$t(`activities.${activity.id}.learningOutcomes`)"></div>
        </Fieldset>
        <Card class="mt-2">
          <template #title>{{ $t("seeMore") }}</template>
          <template #content>
            <div v-html="$t(`activities.${activity.id}.readMore`)"></div>
          </template>
        </Card>
      </div>
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
import activities from "./activities";

export default {
  name: "ActivityDetail",
  data() {
    return {
      inProgress: false,
      completed: false,
    };
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
  computed: {
    pascalCaseId() {
      return this.activity.id[0].toUpperCase() + this.activity.id.slice(1);
    },
    currentComponent() {
      return activities[this.pascalCaseId]?.default || null;
    },
  },
};
</script>
