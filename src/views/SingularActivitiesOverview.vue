<template>
  <h1>{{ $t("singularActivitiesHeading") }}</h1>
  <p class="mb-5">{{ $t("singularActivitiesDescription") }}</p>

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
  </DataTable>

</template>

<style>
</style>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SingularActivitiesOverview",
  setup() {
    const store = useStore();
    const singularActivities = computed(() => store.state.singularActivities);

    return {
      singularActivities,
    };
  }
};
</script>
