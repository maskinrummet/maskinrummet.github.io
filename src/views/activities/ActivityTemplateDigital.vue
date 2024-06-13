<template>
  <span ref="scrollReset"></span>
  <div v-if="!dataset">
    <DatasetSelection @datasetReady="getDataset" />
  </div>
  <DatasetModal
    @refresh="refreshDataset"
    :datasetId="datasetId"
    ref="datasetModal"
  ></DatasetModal>
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
          :nextCallback="
            () => {
              resetScroll();
              nextCallback();
            }
          "
          :centerButtonText="$t('viewDataset')"
          :centerButtonCallback="showDatasetModal"
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
          :prevCallback="
            () => {
              resetScroll();
              prevCallback();
            }
          "
          :finishCallback="completed"
        />
      </template>
    </StepperPanel>
  </Stepper>
</template>
<script>
import DatasetSelection from "@/components/DatasetSelection.vue";
import DatasetModal from "@/components/DatasetModal.vue";
import { getDatasetById } from "@/api";

export default {
  name: "TextCleaning",
  components: {
    DatasetSelection,
    DatasetModal,
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
      this.resetScroll();
    },
    refreshDataset(dataset) {
      this.dataset = dataset;
    },
    completed() {
      this.resetScroll();
      this.complete = true;
      this.$emit("completedActivity");
    },
    showDatasetModal() {
      this.$refs.datasetModal.show();
    },
    resetScroll() {
      this.$refs.scrollReset.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
