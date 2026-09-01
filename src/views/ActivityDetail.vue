<template>
  <div>
    <h3>
      <router-link :to="'/' + $i18n.locale">
        {{ $t("availableActivities") }}
      </router-link>
      >
      {{ $t(`activities.${activity.id}.title`) }}
    </h3>
    <div v-if="activity">
      <!-- Switch logic for activity -->
      <component
        :is="currentComponent"
        v-if="currentComponent"
        :activityID="activity.id"
        :activity="activity"
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

    const activityId = computed(() => route.params.id);
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
