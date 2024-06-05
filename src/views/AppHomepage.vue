<template>
  <h1>{{ $t("welcome") }}</h1>
  <div v-html="$t('welcomeText')" class="mb-5"></div>
  <h2>{{ $t("availableActivities") }}</h2>
  <DataTable
    :value="activities"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="['topics']"
    removableSort
  >
    <Column field="title" :header="$t('title')">
      <template #body="{ data }">
        <router-link :to="{ path: 'activity', query: { id: data.id } }">
          <Button
            :label="$t(`activities.${data.id}.title`)"
            class="p-button-link w-full text-left"
          />
        </router-link>
      </template>
    </Column>
    <Column field="modality" :header="$t('modality')" sortable>
      <template #body="{ data }">
        {{ $t(data.modality) }}
      </template>
    </Column>
    <Column
      field="topics"
      :header="$t('topics')"
      filterField="topics"
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        <Tag
          v-for="(t, i) in data.topics"
          :value="$t(t)"
          :key="i"
          severity="secondary"
          class="mr-1 mb-1 cursor-pointer"
          @click="(e) => toggle(e, getRef(data.id, t))"
        ></Tag
        ><OverlayPanel
          v-for="(t, i) in data.topics"
          :key="i"
          :ref="getRef(data.id, t)"
          class="max-w-20rem"
        >
          <h3 class="m-0">{{ $t(t) }}</h3>
          <p class="m-0 mt-3">{{ $t(`${t}Explained`) }}</p>
        </OverlayPanel>
      </template>
      <template #filter="{ filterModel }">
        <MultiSelect
          v-model="filterModel.value"
          :options="allTopicOptions"
          :placeholder="$t('selectTopics')"
          class="p-column-filter"
        >
          <template #value="slotProps">
            <div
              v-if="slotProps.value && slotProps.value.length"
              class="flex align-items-center"
            >
              {{ getDenseListString(slotProps.value) }}
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <span>{{ $t(slotProps.option) }}</span>
            </div>
          </template>
        </MultiSelect>
      </template>
    </Column>
    <Column field="subject" :header="$t('subject')" sortable>
      <template #body="{ data }">
        <Tag :value="$t(data.subject)" />
      </template>
    </Column>
    <Column field="age" :header="$t('age')" sortable>
      <template #body="{ data }">{{ data.age }}+</template>
    </Column>
    <Column field="duration" :header="$t('duration')" sortable>
      <template #body="{ data }">{{ data.duration }} {{ $t("mins") }}</template>
    </Column>
  </DataTable>
  <div class="flex justify-content-end mt-2">
    <router-link to="/contact" class="no-underline">
      <Button :label="$t('suggestActivity')" />
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { FilterService } from "primevue/api";

FilterService.register("filterBySetMatch", (valueSet, filterSet) => {
  if (!filterSet) {
    return false;
  }
  if (!valueSet) {
    return true;
  }
  return [...new Set(filterSet)].every((element) =>
    new Set(valueSet).has(element)
  );
});

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
      filters: {
        topics: { value: null, matchMode: "filterBySetMatch" },
      },
    };
  },
};
</script>
