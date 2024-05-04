<template>
  <h1>{{ $t("availableActivities") }}</h1>
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
            class="p-button-link"
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
          class="mr-1 mb-1"
        />
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
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { computed } from "vue";
import { useStore } from "vuex";
import MultiSelect from "primevue/multiselect";
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
  components: {
    DataTable,
    Column,
    Button,
    Tag,
    MultiSelect,
  },
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
