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
  <Stepper v-if="dataset && !complete" v-model:active-step="currStep">
    <StepperPanel :header="$t('wordCloud')">
      <template #content="{ nextCallback }">
        <Fieldset
          :legend="$t('wordCloud') + '?'"
          :toggleable="true"
          :collapsed="true"
          class="center-legend"
        >
          <InspirationCard
            :title="$t('wordCloud')"
            :description="$t('wordCloudExplained')"
          >
            <template #example>
              <img
                class="w-full border-2 border-round-md max-w-30rem"
                src="@/assets/word-cloud.png"
                :alt="$t(`wordCloudExample`)" /></template
          ></InspirationCard>
        </Fieldset>
        <p class="text-center mt-3 mb-3">
          {{ $t(`activities.${activityID}.custom.wordCloudBelow`) }}
        </p>
        <div class="flex justify-content-center">
          <div class="w-9 p-3 h-30rem border-2 border-round-md">
            <VueWordCloud
              :spacing="1 / 2"
              :words="bagOfWords"
              :color="([, weight]) => calcColor(weight)"
              font-family="Inter var, sans-serif"
              @update:progress="updateLoading"
              v-memo="[bagOfWords]"
            ></VueWordCloud>
            <ProgressBar
              v-if="loading"
              mode="indeterminate"
              class="w-9 m-auto h-2rem"
              style="margin-top: -15rem !important"
            >
            </ProgressBar>
          </div>
        </div>
        <div class="flex justify-content-center align-items-center my-2">
          <label for="minOccurrences" class="mr-2"
            >{{ $t("minWordCloudOccurences") }}:</label
          >
          <InputNumber
            v-model="minOccurrences"
            inputId="minmax-buttons"
            showButtons
            :min="1"
            class="adjust-width"
          />
        </div>
        <div class="grid mt-3">
          <div class="col flex justify-content-center align-items-center">
            <label for="langStemming" class="mr-2">{{ $t("stemming") }}:</label>
            <Dropdown
              v-model="langStemming"
              :options="stemmingOptions"
              :optionLabel="stemmingOptionLabel"
              optionValue="value"
              filter
            />
          </div>
          <div class="col flex justify-content-center align-items-center">
            <label for="langStopwords" class="mr-2"
              >{{ $t("stopwords") }}:</label
            >
            <Dropdown
              v-model="langStopwords"
              :options="stopwordsOptions"
              :optionLabel="stopwordsOptionLabel"
              optionValue="value"
              filter
            />
          </div>
        </div>
        <div class="grid mt-3">
          <div class="col">
            <Fieldset
              :legend="$t('stemming') + '?'"
              :toggleable="true"
              :collapsed="true"
              class="center-legend"
            >
              <InspirationCard
                :title="$t('stemming')"
                :description="
                  $t(`activities.${activityID}.custom.stemmingExplained`)
                "
              >
                <template #footer></template>
                <template #example>
                  <div class="w-full border-2 border-round-md max-w-30rem p-3">
                    <p v-html="$t(`stemmingExample`)"></p></div></template
              ></InspirationCard>
            </Fieldset>
          </div>
          <div class="col">
            <Fieldset
              :legend="$t('stopwords') + '?'"
              :toggleable="true"
              :collapsed="true"
              class="center-legend"
            >
              <InspirationCard
                :title="$t('stopwords')"
                :description="
                  $t(`activities.${activityID}.custom.stopwordsExplained`)
                "
              >
                <template #example>
                  <div class="w-full border-2 border-round-md max-w-30rem p-3">
                    <p v-html="$t(`stopwordsExample`)"></p></div></template
              ></InspirationCard>
            </Fieldset>
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
    <StepperPanel :header="$t('positionalTextGeneration')">
      <template #content="{ prevCallback, nextCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.positionalGeneration`) }}
        </p>
        <PositionalTextGen :dataset="dataset"></PositionalTextGen>
        <Fieldset
          :legend="`${$t('greedy')}? ${$t('random')}?`"
          :toggleable="true"
          :collapsed="true"
          class="center-legend mt-4"
        >
          <InspirationCard :title="$t('randomness')">
            <template #description>
              {{ $t("randomnessExplained") }}
              <ul>
                <li :class="randomnessDemo === 'greedy' ? 'font-bold' : ''">
                  {{ $t("greedyExplained") }}
                </li>
                <li
                  :class="
                    randomnessDemo === 'weightedRandom' ? 'font-bold' : ''
                  "
                >
                  {{ $t("weightedRandomExplained") }}
                </li>
                <li :class="randomnessDemo === 'random' ? 'font-bold' : ''">
                  {{ $t("randomExplained") }}
                </li>
              </ul>
              {{ $t("whatIsTemperature") }}
            </template>
            <template #example>
              <div class="w-full border-2 border-round-md max-w-30rem p-3">
                <div class="flex justify-content-center">
                  <Button
                    v-if="randomnessDemo === 'greedy'"
                    @click="drawWord"
                    >{{ $t("chooseWord") }}</Button
                  >
                  <Button
                    v-else
                    @click="randomTimeout"
                    :disabled="randomChoice"
                    >{{ $t("chooseWord") }}</Button
                  >
                </div>
                <div class="flex flex-wrap justify-content-center gap-2 my-5">
                  <div class="flex align-items-center">
                    <RadioButton
                      v-model="randomnessDemo"
                      inputId="greedy"
                      name="randomnessDemo"
                      value="greedy"
                      :disabled="randomChoice"
                    />
                    <label for="greedy" class="ml-2">{{ $t("greedy") }}</label>
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton
                      v-model="randomnessDemo"
                      inputId="weightedRandom"
                      name="randomnessDemo"
                      value="weightedRandom"
                      :disabled="randomChoice"
                    />
                    <label for="weightedRandom" class="ml-2">{{
                      $t("weightedRandom")
                    }}</label>
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton
                      v-model="randomnessDemo"
                      inputId="random"
                      name="randomnessDemo"
                      value="random"
                      :disabled="randomChoice"
                    />
                    <label for="random" class="ml-2">{{ $t("random") }}</label>
                  </div>
                </div>
                <div
                  class="mx-auto triangle-down"
                  v-if="randomnessDemo !== 'greedy'"
                ></div>
                <div></div>
                <!-- This div prevents pie chart from going into the margin of the triangle above-->
                <div
                  class="m-3 max-w-full"
                  :class="randomnessDemo === 'greedy' ? '' : 'rotating'"
                  ref="pie"
                  :style="{
                    animationPlayState: randomChoice ? 'running' : 'paused',
                    aspectRatio: 1,
                  }"
                >
                  <Pie :data="pieChartData" :options="chartOptions"></Pie>
                </div>

                <div>
                  <Button
                    disabled
                    v-for="(x, i) in chosenSentence"
                    :key="i"
                    class="m-1"
                    >{{ x }}</Button
                  >
                </div>
                <div class="flex justify-content-center mt-2">
                  <Button
                    severity="danger"
                    @click="
                      () => {
                        this.chosenSentence = [];
                      }
                    "
                    v-if="chosenSentence.length !== 0"
                    >{{ $t("clear") }}</Button
                  >
                </div>
              </div></template
            ></InspirationCard
          >
        </Fieldset>
        <StepperButtons
          class="pt-4"
          :prevCallback="
            () => {
              resetScroll();
              prevCallback();
            }
          "
          :nextCallback="
            () => {
              resetScroll();
              nextCallback();
            }
          "
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('ngrams')">
      <template #content="{ prevCallback, nextCallback }">
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.positionalTextGenBreakdown`) }}
        </p>
        <div class="flex justify-content-center">
          <div class="w-9 p-3 h-30rem border-2 border-round-md">
            <VueWordCloud
              :spacing="1 / 2"
              :words="nGramBagOfWords"
              :color="() => `hsl(${Math.random() * 360}, 65%, 35%)`"
              font-family="Inter var, sans-serif"
              @update:progress="updateLoading"
              v-memo="[nGramBagOfWords]"
            ></VueWordCloud>
            <ProgressBar
              v-if="loading"
              mode="indeterminate"
              class="w-9 m-auto h-2rem"
              style="margin-top: -15rem !important"
            >
            </ProgressBar>
          </div>
        </div>
        <p class="text-center">{{ $t("windowSize") }}: {{ windowSize }}</p>
        <div class="flex justify-content-center">
          <Slider
            v-model="windowSize"
            :min="1"
            :max="5"
            class="w-6 mb-3 max-w-10rem"
          />
        </div>
        <div class="flex justify-content-center align-items-center my-2">
          <label for="minOccurrences" class="mr-2"
            >{{ $t("minWordCloudOccurences") }}:</label
          >
          <InputNumber
            v-model="minOccurrences"
            inputId="minmax-buttons"
            showButtons
            :min="1"
            class="adjust-width"
          />
        </div>
        <StepperButtons
          class="pt-4"
          :prevCallback="
            () => {
              resetScroll();
              prevCallback();
            }
          "
          :nextCallback="
            () => {
              resetScroll();
              nextCallback();
            }
          "
        />
      </template>
    </StepperPanel>
    <StepperPanel :header="$t('nGramsGeneration')">
      <template #content="{ prevCallback }">
        <p class="text-center mt-3">
          {{ $t(`activities.${activityID}.custom.introToSankey`) }}
        </p>
        <p class="text-center">{{ $t("windowSize") }}: {{ windowSize }}</p>
        <div class="flex justify-content-center">
          <Slider
            v-model="windowSize"
            :min="1"
            :max="5"
            class="w-6 mb-3 max-w-10rem"
          />
        </div>
        <p class="text-center">
          {{ $t(`activities.${activityID}.custom.topX`) }}: {{ topX }}
        </p>
        <div class="flex justify-content-center">
          <Slider
            v-model="topX"
            :min="1"
            :max="10"
            class="w-6 mb-3 max-w-20rem"
          />
        </div>
        <div class="flex justify-content-center">
          <SankeyChart
            :flows="flows"
            :style="{
              height: flows.length * 2 + 'rem',
              maxHeight: '95vh',
              maxWidth: '50rem',
            }"
          ></SankeyChart>
        </div>
        <p class="text-center mt-5">
          {{ $t(`activities.${activityID}.custom.nGramGeneration`) }}
        </p>
        <NgramTextGen
          :dataset="dataset"
          :window-size-prop="windowSize"
          @windowSizeChange="(x) => (this.windowSize = x)"
        ></NgramTextGen>
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
import { getDatasetById } from "@/api";
import i18n from "@/i18n";
import {
  getBagOfWords,
  stemmingOptions,
  stopwordsOptions,
  categoricalColours,
  slidingWindow,
  cleanString,
  sortNumericalThenAlphabetical,
} from "@/views/activities/utils";
import DatasetModal from "@/components/DatasetModal.vue";
import InspirationCard from "@/components/InspirationCard.vue";
import NgramTextGen from "../singularActivities/NgramTextGen.vue";
import PositionalTextGen from "../singularActivities/PositionalTextGen.vue";
import { Pie } from "vue-chartjs";
import RadioButton from "primevue/radiobutton";
import SankeyChart from "@/components/SankeyChart.vue";

export default {
  name: "TextGeneration",
  components: {
    DatasetSelection,
    DatasetModal,
    InspirationCard,
    NgramTextGen,
    PositionalTextGen,
    Pie,
    RadioButton,
    SankeyChart,
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
      currStep: 0,
      maxColor: [163, 11, 11],
      minColor: [24, 86, 143],
      windowSize: 2,
      topX: 5,
      stemmingOptions,
      stopwordsOptions,
      langStemming: false,
      langStopwords: false,
      loading: false,
      categoricalColours,
      randomnessDemo: "greedy",
      randomChoice: false,
      chosenSentence: [],
      minOccurrences: 1,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  computed: {
    bagOfWords() {
      return getBagOfWords(
        this.sentences,
        this.langStopwords,
        this.langStemming
      ).filter((x) => x[1] >= this.minOccurrences);
    },
    nGramBagOfWords() {
      return Object.entries(this.ngrams)
        .filter(
          ([ngram]) =>
            !ngram.startsWith(i18n.global.t("startToken")) &&
            !ngram.endsWith(i18n.global.t("endToken"))
        )
        .map((x) => [x[0], Object.entries(x[1]).reduce((a, [, b]) => a + b, 0)])
        .filter((x) => x[1] >= this.minOccurrences);
    },
    maxOccurences() {
      return Math.max(...this.bagOfWords.map(([, weight]) => weight));
    },
    sentences() {
      if (!this.dataset.sentences) return [];
      return this.dataset.sentences.map((x) => x.text);
    },
    ngrams() {
      return slidingWindow(this.sentences.map(cleanString), this.windowSize);
    },
    topXNgrams() {
      return Object.entries(this.ngrams)
        .sort(([, valuesA], [, valuesB]) => {
          let sumA = Object.values(valuesA).reduce((acc, val) => acc + val, 0);
          let sumB = Object.values(valuesB).reduce((acc, val) => acc + val, 0);
          return sumB - sumA;
        })
        .filter(
          ([ngram]) =>
            !ngram.startsWith(i18n.global.t("startToken")) &&
            !ngram.endsWith(i18n.global.t("endToken"))
        )
        .slice(0, this.topX);
    },
    flows() {
      let flows = [];

      for (const [from, values] of this.topXNgrams) {
        let sortedEntries = Object.entries(values).sort(
          sortNumericalThenAlphabetical
        );
        for (const [to, flow] of sortedEntries) {
          flows.push({ from: this.windowSize + "-gram: " + from, to, flow });
        }
      }

      return flows;
    },
    pieChartData() {
      return {
        labels: ["A", "B"],
        datasets: [
          {
            data: this.randomnessDemo == "random" ? [50, 50] : [80, 20],
            backgroundColor: [
              categoricalColours[0],
              categoricalColours[categoricalColours.length - 1],
            ],
          },
        ],
      };
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
    calcColor(weight) {
      let percentage = weight / this.maxOccurences;

      let color = this.minColor.map((minComponent, index) => {
        const maxComponent = this.maxColor[index];
        const interpolatedComponent = Math.round(
          minComponent + percentage * (maxComponent - minComponent)
        );
        return interpolatedComponent;
      });

      return `rgb(${color.join(",")})`;
    },
    stemmingOptionLabel({ i18nKey }) {
      if (i18nKey === "doNoStemming") return i18n.global.t(i18nKey);
      return i18n.global.t(i18nKey) + " " + i18n.global.t("stemming");
    },
    stopwordsOptionLabel({ i18nKey }) {
      if (i18nKey === "doNoStopwords") return i18n.global.t(i18nKey);
      return i18n.global.t(i18nKey) + " " + i18n.global.t("stopwords");
    },
    updateLoading(progress) {
      if (!progress) {
        this.loading = false;
        return;
      }
      this.loading = true;
    },
    completed() {
      this.resetScroll();
      this.complete = true;
      this.$emit("completedActivity");
    },
    showDatasetModal() {
      this.$refs.datasetModal.show();
    },
    drawWord() {
      let transformMatrix = window
        .getComputedStyle(this.$refs.pie)
        .getPropertyValue("transform");
      let rotation = 0;

      if (transformMatrix && transformMatrix !== "none") {
        let values = transformMatrix.split("(")[1].split(")")[0].split(",");
        let a = parseFloat(values[0]);
        let b = parseFloat(values[1]);
        rotation = Math.atan2(b, a) * (180 / Math.PI);
      }

      if (rotation <= 0) rotation = 360 + rotation;

      let totalValue = this.pieChartData.datasets[0].data.reduce(
        (sum, value) => sum + value,
        0
      );
      let selectedValue = Math.round(totalValue * (1 - rotation / 360));

      let currValue = 0;
      for (let i = 0; i < this.pieChartData.labels.length; i++) {
        currValue += this.pieChartData.datasets[0].data[i];
        if (currValue >= selectedValue) {
          this.chosenSentence.push(this.pieChartData.labels[i]);
          break;
        }
      }
    },
    randomTimeout() {
      this.randomChoice = true;
      setTimeout(() => {
        this.randomChoice = false;
        this.drawWord();
      }, Math.floor(Math.random() * 2000 + 100));
    },
    resetScroll() {
      this.$refs.scrollReset.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style>
.center-legend .p-fieldset-legend {
  margin-left: auto;
  margin-right: auto;
}

.adjust-width {
  width: 25%;
  min-width: 5rem;
}

.adjust-width input {
  width: 100%;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}

.triangle-down {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 50px solid var(--text-color);
}
</style>
