<template>
  <div v-if="!dataset">
    <DatasetSelection @datasetReady="getDataset" />
  </div>
  <Stepper v-if="dataset && !complete">
    <StepperPanel :header="$t('step1')">
      <template #content="{ nextCallback }">
        <div class="text-center">
          <p>
            {{ $t(`activities.${activityID}.custom.textAboutDataset`) }}
          </p>
          <div
            v-for="(s, i) in sentences"
            :key="i"
            class="m-2 border-2 border-round-md p-2"
          >
            {{ s }}
          </div>
        </div>
        <StepperButtons
          class="pt-4"
          :nextCallback="nextCallback"
          :centerButtonText="$t('refreshDataset')"
          :centerButtonCallback="refreshDataset"
          :centerButtonDisabled="refreshing"
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('step2')">
      <template #content="{ prevCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.secondTextandActivity`) }}
        </p>
        <StepperButtons
          class="pt-4"
          :prevCallback="prevCallback"
          :finishCallback="completed"
        />
      </template>
    </StepperPanel>
  </Stepper>
</template>
<script>
import DatasetSelection from "@/components/DatasetSelection.vue";
import { getDatasetById } from "@/api";

export default {
  name: "TextCleaning",
  components: {
    DatasetSelection,
  },
  props: {
    activityID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataset: null,
      datasetId: null,
      sentence: "",
      complete: false,
      refreshing: false,
    };
  },
  computed: {
    sentences() {
      if (!this.dataset.json_string) return [];
      return JSON.parse(this.dataset.json_string);
    },
  },
  methods: {
    async getDataset({ datasetId, userSentence }) {
      this.datasetId = datasetId;
      this.sentence = userSentence;
      this.dataset = (await getDatasetById(datasetId)).data;
      this.$emit("startActivity");
    },
    async refreshDataset() {
      this.refreshing = true;
      this.dataset = (await getDatasetById(this.datasetId)).data;
      this.refreshing = false;
    },
    completed() {
      this.complete = true;
      this.$emit("completedActivity");
    },
  },
};
</script>
