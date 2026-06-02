<template>
  <h1>{{ $t("welcome") }}</h1>
  <div v-html="$t('welcomeText')" class="mb-5"></div>
  <h2>{{ $t("availableActivities") }}</h2>
  <div class="grid align-items-stretch">
    <router-link
      v-for="activity in filteredActivities"
      :key="activity.id"
      :to="`/${$i18n.locale}/activity/${activity.id}`"
      :aria-label="$t(`activities.${activity.id}.title`)"
      class="col-12 md:col-6 xl:col-4 flex no-underline text-color"
    >
      <Card class="w-full h-full">
        <template #header>
          <img
            :src="activity.image"
            :alt="$t(`activities.${activity.id}.title`)"
            class="w-full block"
            style="height: 196px; object-fit: cover; border-radius: 6px 6px 0 0"
          />
        </template>
        <template #title>
          <div class="flex align-items-baseline justify-content-between gap-3">
            <span>{{ $t(`activities.${activity.id}.title`) }}</span>
            <span class="flex align-items-center gap-2 text-sm font-normal flex-shrink-0">
              <span>{{ activity.duration }}{{ $t("mins").slice(0, 1) }}</span>
              <i class="pi pi-stopwatch"></i>
            </span>
          </div>
        </template>
        <template #subtitle>
          <span class="text-bluegray-400 font-light">
            {{ $t(activity.modality) }}
          </span>
        </template>
        <template #content>
          <p class="m-0 line-height-3">
            {{ $t(`activities.${activity.id}.description`) }}
          </p>
        </template>
        <template #footer>
          <div class="flex flex-column gap-3 pt-2 h-full">
            <div class="flex align-items-center flex-wrap gap-2 mt-auto">
              <Tag
                :value="`${activity.age}+ ${$t('years')}`"
                class="bg-purple-500 text-white border-none"
              />
              <span class="text-500 mx-0.5">|</span>
              <Tag
                v-for="(topic, index) in activity.topics"
                :key="index"
                :value="$t(topic)"
                severity="secondary"
                class="cursor-pointer"
                @click.stop="(e) => toggle(e, getRef(activity.id, topic))"
              />
            </div>
          </div>
        </template>
      </Card>
    </router-link>
  </div>
  <!--<h2 class="mt-5">{{ $t("singularActivitiesHeading") }}</h2>
  <DataTable :value="singularActivities">
    <Column field="title" :header="$t('title')">
      <template #body="{ data }">
        <router-link :to="`/${$i18n.locale}/single-activity/${data.id}`">
          <Button
            :label="$t(`singularActivities.${data.id}.title`)"
            class="p-button-link w-full text-left"
          />
        </router-link>
      </template>
    </Column>
  </DataTable> -->
  <div class="flex justify-content-center mt-4">
    <router-link :to="'/' + $i18n.locale + '/contact'" class="no-underline">
      <Button :label="$t('suggestActivity')" />
    </router-link>
  </div>
</template>

<style>
.p-card {
  display: flex;
  flex-direction: column;
}

.p-card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.p-card-footer {
  margin-top: auto;
}
</style>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "AppHomepage",
  setup() {
    const store = useStore();
    const activities = computed(() => store.state.activities);

    return {
      activities,
    };
  },
  computed: {
    allTopicOptions() {
      return [...new Set(this.activities.flatMap((a) => a.topics))].sort();
    },
    filteredActivities() {
      if (!this.selectedTopics.length) {
        return this.activities;
      }

      return this.activities.filter((activity) =>
        this.selectedTopics.every((topic) => activity.topics.includes(topic))
      );
    },
  },
  methods: {
    getDenseListString(list, maxChars = 20) {
      const listString = list.map((v) => this.$t(v)).join(", ");
      return listString.length > maxChars
        ? listString.slice(0, maxChars - 3) + "..."
        : listString;
    },
    toggle(e, ref) {
      this.$refs[ref][0].toggle(e);
    },
    getRef(id, topic) {
      return `${id}-${topic}`;
    },
  },
  data() {
    return {
      selectedTopics: [],
    };
  },
};
</script>
