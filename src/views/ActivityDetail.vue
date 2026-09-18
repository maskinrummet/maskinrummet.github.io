<template>
  <div class="activity-detail">
    <h3>
      <router-link :to="'/' + $i18n.locale">
        {{ $t("availableActivities") }}
      </router-link>
      >
      {{ $t(`activities.${activity.id}.title`) }}
    </h3>
    <template v-if="activity">
      <!-- Switch logic for activity -->
      <component
        :is="currentComponent"
        v-if="currentComponent"
        :activityID="activity.id"
        :activity="activity"
      ></component>
      <div v-else>Activity has not been registered properly</div>
    </template>
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
    return { };
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
