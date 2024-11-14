<template>
  <h5 v-if="techniqueName">{{ techniqueName }}</h5>
  <p v-if="techniqueName">{{ techniqueDescription }}</p>
  <div class="flex justify-content-center align-items-center">
    <Dropdown
      v-model="selectionMethod"
      :options="selectionMethodOptions"
      :placeholder="$t('selectMethod')"
      :optionLabel="({ i18nKey }) => $t(i18nKey)"
      optionValue="value"
      :disabled="generatedSentence.some((word) => !word.show)"
    />
    <Button
      class="m-1"
      severity="success"
      @click="generate"
      :disabled="
        disableGenerate ||
        !selectionMethod ||
        generatedSentence.some((word) => !word.show)
      "
    >
      {{ $t("generate") }}
    </Button>
  </div>
  <div
    class="flex my-3 mx-auto"
    style="max-width: 50rem"
    v-if="generatedSentence.length !== 0"
  >
    <div class="flex w-3 justify-content-start">
      <p>{{ $t("mostLikely") }}</p>
    </div>
    <div class="flex w-6 justify-content-center mx-1">
      <div
        v-for="c in categoricalColours"
        :style="{
          backgroundColor: c,
          width: 100 / categoricalColours.length + '%',
        }"
        :key="c"
      ></div>
    </div>
    <div class="flex w-3 justify-content-end">
      <p class="text-right">{{ $t("leastLikely") }}</p>
    </div>
  </div>
  <div class="mt-2">
    <span v-for="word in generatedSentence" :key="word.pos">
      <Button
        v-if="word.show"
        class="m-1"
        :style="getButtonColour(word)"
        :disabled="!finishedGenerating"
        @click="(e) => $refs['pie_' + word.pos][0].show(e)"
        :ref="'button_' + word.pos"
      >
        {{ word.word }}
      </Button>
      <!-- TODO: would be nice to have right left arrow keys to select -->
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
            {{ $t("position") }}: {{ word.pos + 1 }}
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
          <Button :style="getButtonColour(word)">
            {{ word.word }}
          </Button>
        </div>
        <div v-else class="flex justify-content-center">
          <Button :style="getButtonColour(word)">
            {{ word.word }}
          </Button>
        </div>
      </OverlayPanel>
    </span>
    <Button
      v-if="generatedSentence.some((word) => !word.show)"
      class="m-1"
      severity="contrast"
      :disabled="true"
    >
      <span class="loading"></span>
    </Button>
  </div>
  <div class="flex align-items-center" v-if="finishedGenerating">
    <Message
      severity="success"
      :closable="false"
      v-if="originalSentence"
      class="ml-auto"
      >{{ $t("originalText") }}</Message
    >
    <Message severity="warn" v-else :closable="false" class="ml-auto">{{
      $t("unoriginalText")
    }}</Message>
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
import {
  MAX_SENTENCE_LENGTH,
  categoricalColours,
  cleanString,
  otherColour,
  selectionMethodOptions,
} from "@/views/activities/utils";
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
      selectionMethodOptions,
      selectionMethod: null,
      categoricalColours,
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
      otherColour,
    };
  },
  methods: {
    generate() {
      this.generatedSentence = this.generateFn(this.selectionMethod);
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
    getButtonColour(w) {
      let c = w.backgroundColor ?? this.otherColour;
      return {
        backgroundColor: c,
        border: "1px solid " + c,
      };
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
.p-overlaypanel {
  border: 2px solid var(--text-color-secondary);
}

.p-overlaypanel.p-overlaypanel::before {
  border-bottom-color: var(--text-color-secondary);
}

.p-overlaypanel.p-overlaypanel-flipped::before {
  border-top-color: var(--text-color-secondaryr);
  border-bottom-color: transparent;
}

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
