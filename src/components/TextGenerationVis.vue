<template>
  <h5 v-if="techniqueName">{{ techniqueName }}</h5>
  <p v-if="techniqueName">{{ techniqueDescription }}</p>
  <div class="flex justify-content-center">
    <Button
      class="m-1"
      severity="success"
      @click="generate"
      :disabled="generatedSentence.some((word) => !word.show)"
    >
      {{ $t("generate") }}
    </Button>
  </div>
  <div class="m-auto w-full">
    <span v-for="word in generatedSentence" :key="word.pos">
      <Button v-if="word.show" class="m-1" severity="info" :disabled="true">
        {{ word.word }}
      </Button>
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
  <div
    class="flex align-items-center"
    v-if="
      generatedSentence.length && generatedSentence.every((word) => word.show)
    "
  >
    <Button class="my-3 m-auto" @click="showPies = true" severity="help">
      {{ $t("how") }}
    </Button>
  </div>
  <div v-if="showPies">
    <div v-for="word in generatedSentence" :key="word.pos">
      <div v-if="word.pos === currPos">
        <div class="flex justify-content-between w-full">
          <Button
            icon="pi pi-angle-left"
            :aria-label="$t('previous')"
            @click="currPos--"
            :disabled="currPos === 0"
            class="w-1 my-auto"
          />
          <div class="w-10">
            <Pie :data="word.pieChartData" :options="chartOptions" />
          </div>

          <Button
            class="w-1 my-auto"
            icon="pi pi-angle-right"
            :aria-label="$t('next')"
            @click="currPos++"
            :disabled="currPos === generatedSentence.length - 1"
          />
        </div>
        <div class="flex justify-content-center m-2">
          <Button severity="contrast">
            {{ $t("position") }}: {{ word.pos }}
          </Button>
        </div>
        <div v-if="word.prevN" class="flex justify-content-center">
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
      </div>
    </div>
  </div>
</template>

<script>
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
    techniqueName: {
      type: String,
    },
    techniqueDescription: {
      type: String,
    },
  },
  data() {
    return {
      generatedSentence: [],
      showPies: false,
      currPos: 0,
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
      this.showPies = false;
      this.currPos = 0;
      this.generatedSentence = this.generateFn();
      for (let i in this.generatedSentence) {
        setTimeout(() => {
          this.generatedSentence[i].show = true;
        }, i * 1000);
      }
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
