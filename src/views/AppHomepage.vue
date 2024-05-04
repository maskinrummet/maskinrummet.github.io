<template>
  <h1>{{ $t("availableActivities") }}</h1>
  <DataTable
    :value="activities"
    v-model:filters="filters"
    filterDisplay="row"
    :globalFilterFields="['topics']"
    removableSort
  >
    <Column field="title" :header="$t('title')">
      <template #body="{ data }">
        <router-link :to="{ path: 'activity', query: { id: data.id } }">
          <Button :label="$t(data.title)" class="p-button-link" />
        </router-link>
      </template>
    </Column>
    <Column field="modality" :header="$t('modality')" sortable>
      <template #body="{ data }">
        {{ $t(data.modality) }}
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
    <Column
      field="topics"
      :header="$t('topics')"
      :showFilterMenu="false"
      :showClearButton="false"
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
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="allTopicOptions"
          placeholder="Filter by topic"
          class="p-column-filter"
          :showClear="true"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ $t(slotProps.value) }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <Tag :value="$t(slotProps.option)" severity="secondary" />
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column field="duration" :header="$t('duration')" sortable>
      <template #body="{ data }">{{ data.duration }} {{ $t("mins") }}</template>
    </Column>
  </DataTable>
  <router-link to="/contact" class="flex no-underline mt-2">
    <Button :label="$t('suggestActivity')" />
  </router-link>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { computed } from "vue";
import { useStore } from "vuex";
import { FilterMatchMode } from "primevue/api";
import Dropdown from "primevue/dropdown";

export default {
  name: "AppHomepage",
  components: {
    DataTable,
    Column,
    Button,
    Tag,
    Dropdown,
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
  data() {
    return {
      filters: { topics: { value: null, matchMode: FilterMatchMode.CONTAINS } },
    };
  },
};
</script>
