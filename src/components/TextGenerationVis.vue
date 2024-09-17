<template>
  <h5 v-if="techniqueName">{{ techniqueName }}</h5>
  <p v-if="techniqueName">{{ techniqueDescription }}</p>
  <div class="flex justify-content-center">
    <Button
      class="m-1"
      severity="success"
      @click="generate"
      :disabled="
        disableGenerate || generatedSentence.some((word) => !word.show)
      "
    >
      {{ $t("generate") }}
    </Button>
  </div>
  <div class="mt-2">
    <span v-for="word in generatedSentence" :key="word.pos">
      <Button
        v-if="word.show"
        class="m-1"
        severity="info"
        :disabled="!finishedGenerating"
        @click="(e) => $refs['pie_' + word.pos][0].show(e)"
        :ref="'button_' + word.pos"
      >
        {{ word.word }}
      </Button>
      <!-- TODO: would be nice to have right left arrow keys to select, and would be nice to place overlay floating without w-full (currently a bug in PrimeVue) -->
      <OverlayPanel :ref="'pie_' + word.pos" class="w-30rem max-w-full">
        <div class="flex justify-content-between">
          <Button
            icon="pi pi-angle-left"
            :aria-label="$t('previous')"
            :disabled="word.pos === 0"
            class="w-1 my-auto"
            @click="
              (e) => {
                showOverlay(word.pos - 1);
                hideOverlay(word.pos);
                e.stopPropagation();
              }
            "
          />
          <div class="w-10">
            <Pie :data="word.pieChartData" :options="chartOptions" />
          </div>
          <Button
            class="w-1 my-auto"
            icon="pi pi-angle-right"
            :aria-label="$t('next')"
            :disabled="word.pos === generatedSentence.length - 1"
            @click="
              (e) => {
                hideOverlay(word.pos);
                showOverlay(word.pos + 1);
                e.stopPropagation();
              }
            "
          />
        </div>
        <div class="flex justify-content-center m-2">
          <Button severity="contrast">
            {{ $t("position") }}: {{ word.pos }}
            {{
              word.pos === MAX_SENTENCE_LENGTH
                ? `(${$t("maxSentenceLength")})`
                : ""
            }}
          </Button>
        </div>
        <div v-if="word.prevN" class="flex justify-content-center flex-wrap">
          <div v-for="x in word.prevN.split(' ')" :key="x">
            <Button severity="secondary">
              {{ x }}
            </Button>
          </div>
          <Button severity="contrast">=></Button>
          <Button severity="help">
            {{ word.word }}
          </Button>
        </div>
        <div v-else class="flex justify-content-center">
          <Button severity="help">
            {{ word.word }}
          </Button>
        </div>
      </OverlayPanel>
    </span>
    <Button
      v-if="generatedSentence.some((word) => !word.show)"
      class="m-1"
      severity="info"
      :disabled="true"
    >
      <span class="loading"></span>
    </Button>
  </div>
  <div class="flex align-items-center" v-if="finishedGenerating">
    <Button
      severity="success"
      v-if="originalSentence"
      disabled
      class="ml-auto"
      >{{ $t("originalText") }}</Button
    >
    <Button severity="warning" v-else disabled class="ml-auto">{{
      $t("unoriginalText")
    }}</Button>
    <Button
      class="my-3 ml-2 mr-auto"
      @click="
        (e) => {
          showOverlay(0);
          e.stopPropagation();
        }
      "
      severity="help"
    >
      {{ $t("how") }}
    </Button>
  </div>
</template>

<script>
import { MAX_SENTENCE_LENGTH, cleanString } from "@/views/activities/utils";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default {
  components: {
    Pie,
  },
  props: {
    generateFn: {
      type: Function,
    },
    sentences: {
      type: Array,
    },
    techniqueName: {
      type: String,
    },
    techniqueDescription: {
      type: String,
    },
    disableGenerate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      MAX_SENTENCE_LENGTH,
      generatedSentence: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  methods: {
    generate() {
      this.generatedSentence = this.generateFn();
      for (let i in this.generatedSentence) {
        setTimeout(() => {
          this.generatedSentence[i].show = true;
        }, i * 400);
      }
    },
    showOverlay(pos) {
      this.$refs["button_" + pos][0].$el.click();
    },
    hideOverlay(pos) {
      this.$refs["pie_" + pos][0].hide();
    },
  },
  computed: {
    finishedGenerating() {
      return (
        this.generatedSentence.length &&
        this.generatedSentence.every((word) => word.show)
      );
    },
    cleanedSentences() {
      return this.sentences.map((s) => cleanString(s));
    },
    generatedSentenceComplete() {
      return this.generatedSentence.map((word) => word.word).join(" ");
    },
    originalSentence() {
      if (!this.finishedGenerating) return false;
      return !this.cleanedSentences.includes(this.generatedSentenceComplete);
    },
  },
};
</script>

<style>
.loading::after {
  display: inline-block;
  animation: dotty steps(1, end) 1s infinite;
  content: "";
}

@keyframes dotty {
  0% {
    content: "";
  }

  25% {
    content: ".";
  }

  50% {
    content: "..";
  }

  75% {
    content: "...";
  }

  100% {
    content: "";
  }
}
</style>
