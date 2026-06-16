<template>
  <header>
    <div class="flex gap-8 header-content">
      <div>
        <h1 class="mt-0 text-6xl" v-html="$t('areYouReadyToLearn')"></h1>
        <div v-html="$t('welcomeText')" class="mb-5"></div>
      </div>
      <video autoplay muted controls>
        <source src="/maskinrummet_intro.webm" type="video/webm" />
        <source src="/maskinrummet_intro.mp4" type="video/mp4" />
      </video>
    </div>
  </header>

  <h2>{{ $t("availableActivities") }}</h2>

  <div class="flex flex-column lg:flex-row gap-4 align-items-start">
    <div
      class="filters-container w-full lg:w-15rem lg:flex-shrink-0 flex flex-wrap gap-4"
    >
      <div v-for="filter in filters" :key="filter.key" class="filter-container">
        <h4 class="m-0 mb-2">{{ $t(filter.titleKey) }}</h4>
        <div class="flex flex-column gap-2">
          <div
            v-for="option in filter.options"
            :key="option.value"
            class="flex align-items-center gap-2"
          >
            <Checkbox
              v-model="filter.selectedValues"
              :inputId="`${filter.key}-${option.value}`"
              :value="option.value"
            />
            <label :for="`${filter.key}-${option.value}`">{{ $t(option.labelKey) }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="activity-grid flex-1 w-full">
      <router-link
        v-for="activity in filteredActivities"
        :key="activity.id"
        :to="getActivityLink(activity)"
        :aria-label="$t(`activities.${activity.id}.title`)"
        class="activity-card flex no-underline text-color"
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
              <span class="activity-title">{{ $t(`activities.${activity.id}.title`) }}</span>
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
  </div>

  <div class="flex justify-content-center mt-4">
    <router-link :to="'/' + $i18n.locale + '/contact'" class="no-underline">
      <Button :label="$t('suggestActivity')" />
    </router-link>
  </div>
</template>

<style>
.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  gap: 1rem;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
}

.activity-card {
  min-width: 0;

  .activity-title {
    word-break: break-word;
    hyphens: auto;
  }
}

.p-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.p-card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.p-card-footer {
  margin-top: auto;
}

.filter-container {
  min-width: 150px;
}

@media (min-width: 992px) {
  .filters-container {
    position: sticky;
    top: 1rem;
  }
}

header {
  padding-block: 4rem;
  padding-inline: 40px;
  margin-inline: -40px;
  display: flex;
  justify-content: center;
  color: white;
  background: linear-gradient(var(--purple-400), var(--purple-600));

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: var(--purple-400);
    z-index: -1;
  }

  a {
    color: white;
    text-decoration: underline;
  }

  .header-content {
    max-width: 1200px;
  }

  h1 > span {
    text-decoration: underline;
    text-decoration-color: var(--purple-600);
    text-decoration-thickness: 4px;
  }

  video {
    flex: 1 1 150%;
    width: 100%;
    border-radius: 8px;
    height: fit-content;
    min-width: 420px;

    @media (max-width: 1100px) {
      display: none;
    }
  }

  @media (max-width: 700px) {
    padding-block: 2rem;
  }
}

</style>

<script>
import { ActicityModality } from "@/constants/activities";
import { computed } from "vue";
import { useStore } from "vuex";

const createFilters = () => [
  {
    key: "age",
    titleKey: "filterAge",
    options: [
      { labelKey: "filterAge6To8", value: "6-8" },
      { labelKey: "filterAge8To10", value: "8-10" },
      { labelKey: "filterAge10To12", value: "10-12" },
      { labelKey: "filterAge12Plus", value: "12+" },
    ],
    selectedValues: [],
    filterFn(activity, selectedValues) {
      return selectedValues.some((range) => {
        if (range === "6-8") return activity.age >= 6 && activity.age < 8;
        if (range === "8-10") return activity.age >= 8 && activity.age < 10;
        if (range === "10-12") return activity.age >= 10 && activity.age < 12;
        if (range === "12+") return activity.age >= 12;
        return false;
      });
    },
  },
  {
    key: "modality",
    titleKey: "filterModality",
    options: [
      { labelKey: "filterPractical", value: ActicityModality.PRACTICAL },
      { labelKey: "filterDigital", value: ActicityModality.DIGITAL },
    ],
    selectedValues: [],
    filterFn(activity, selectedValues) {
      return activity.modality == ActicityModality.EITHER || selectedValues.includes(activity.modality);
    },
  },
  {
    key: "duration",
    titleKey: "filterDuration",
    options: [
      { labelKey: "filterDurationLt20", value: "lt20" },
      { labelKey: "filterDuration20To40", value: "20-40" },
      { labelKey: "filterDuration40To60", value: "40-60" },
      { labelKey: "filterDurationGt60", value: "gt60" },
    ],
    selectedValues: [],
    filterFn(activity, selectedValues) {
      return selectedValues.some((range) => {
        if (range === "lt20") return activity.duration < 20;
        if (range === "20-40") return activity.duration >= 20 && activity.duration < 40;
        if (range === "40-60") return activity.duration >= 40 && activity.duration <= 60;
        if (range === "gt60") return activity.duration > 60;
        return false;
      });
    },
  },
];

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
    filteredActivities() {
      return this.activities.filter((activity) =>
        this.filters.every(
          (filter) =>
            !filter.selectedValues.length ||
            filter.filterFn(activity, filter.selectedValues)
        )
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
    getActivityLink(activity) {
      return activity.link ? `/${this.$i18n.locale}/${activity.link}` : `/${this.$i18n.locale}/activity/${activity.id}`;
    }
  },
  data() {
    return {
      filters: createFilters(),
    };
  },
};
</script>
