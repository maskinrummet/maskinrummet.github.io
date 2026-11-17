<template>
  <div>
    <h3>
      <router-link :to="'/' + $i18n.locale">
        {{ $t("singularActivitiesHeading") }}
      </router-link>
      >
      <span v-if="dataset">
        <router-link
          :to="'/' + $i18n.locale + '/single-activity/' + activity.id"
        >
          {{ $t("selectADataset") }}
        </router-link>
        > {{ $t(`singularActivities.${activity.id}.title`) }}
      </span>
      <span v-else>
        {{ $t("selectADataset") }}
      </span>
    </h3>
    <div v-if="activity">
      <div v-if="loading">
        <ProgressBar v-if="loading" mode="indeterminate"></ProgressBar>
      </div>
      <div v-else-if="datasetError">
        {{ datasetError }}
      </div>
      <div v-else-if="!started" class="intro">
        <DatasetSelectionV2
          @update:selected-dataset-id="selectedDatasetId = $event"
          @update:user-sentence="sentence = $event"
        />

        <Button v-if="selectedDatasetId" :label="'Start'" @click="startActivity" />
      </div>

      <div v-else>
        <!-- Switch logic for activity -->
        <component
          :is="currentComponent"
          v-if="currentComponent && dataset"
          :activityID="activity.id"
          :dataset="dataset"
        ></component>
        <div v-else>Activity has not been registered properly</div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t("activityNotFound") }}</p>
    </div>
  </div>
</template>

<style>
.intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

<script>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import singularActivities from "./singularActivities";
import { getDatasetById } from "@/api";
import DatasetSelectionV2 from "@/components/DatasetSelectionV2.vue";

export default {
  name: "ActivityDetail",
  components: {
    DatasetSelectionV2,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const dataset = ref(null);
    const datasetError = ref(null);
    const loading = ref(null);
    const activityId = computed(() => route.params.id);
    const datasetId = computed(() => route.params.datasetId);
    const started = computed(() => !!datasetId.value);
    onMounted(() => {
      if (datasetId.value) {
        loading.value = true;
        getDatasetById(datasetId.value)
          .then(({ data }) => {
            dataset.value = data;
            datasetError.value = null;
            loading.value = false;
          })
          .catch(({ response }) => {
            if (response.status === 404) {
              datasetError.value = "This dataset could not be found :(";
            } else {
              datasetError.value = response;
            }
            loading.value = false;
          });
      }
    });
    const activity = computed(() =>
      store.getters.getSingularActivityById(activityId.value)
    );

    return {
      loading,
      activity,
      dataset,
      datasetError,
      datasetId,
      started,
    };
  },
  data() {
    return {
      selectedDatasetId: null,
      sentence: "",
    };
  },
  computed: {
    pascalCaseId() {
      return this.activity.id[0].toUpperCase() + this.activity.id.slice(1);
    },
    currentComponent() {
      return singularActivities[this.pascalCaseId]?.default || null;
    },
  },
  methods: {
    startActivity() {
      this.$router.push({
        name: this.$route.name,
        params: { ...this.$route.params, datasetId: this.selectedDatasetId },
      });
    },
    refreshDataset(dataset) {
      this.dataset = dataset;
    },
  },
  watch: {
    datasetId(v) {
      this.loading = true;
      this.datasetError = null;
      if (v) {
        getDatasetById(v)
          .then(({ data }) => {
            this.dataset = data;
          })
          .catch(({ response }) => {
            if (response.status === 404) {
              this.datasetError = "This dataset could not be found :(";
            } else {
              this.datasetError = response;
            }
          });
      } else {
        this.dataset = null;
      }
      this.loading = false;
    },
  },
};
</script>
