<template>
  <div class="w-3">
    <div class="flex justify-content-center">
      <Button @click="handleClick" :disabled="randomChoice">{{
        isSpinning ? "Choose word" : "Spin for next word"
      }}</Button>
      <Button :disabled="!isSpinning || randomChoice" @click="randomTimeout">{{
        "Random word"
      }}</Button>
    </div>
    <div class="mx-auto triangle-down"></div>
    <div class="flex justify-content-center p-0">
      <div
        class="rotating m-3"
        ref="pie"
        :style="{ animationPlayState: isSpinning ? 'running' : 'paused' }"
      >
        <Pie :data="pieChartData" :options="chartOptions" />
      </div>
    </div>
    <div class="flex justify-content-center">Your sentence:</div>
    <div>
      <Button disabled v-for="(x, i) in chosenSentence" :key="i" class="m-1">{{
        x
      }}</Button>
    </div>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
export default {
  name: "SpinningPieChart",
  components: {
    Pie,
  },
  props: {
    pieChartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSpinning: true,
      randomChoice: false,
      chosenSentence: [],
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
  methods: {
    handleClick() {
      if (this.isSpinning) this.drawWord();
      else this.reSpin();
    },
    drawWord() {
      this.isSpinning = false;

      let transformMatrix = window
        .getComputedStyle(this.$refs.pie)
        .getPropertyValue("transform");
      let rotation = 0;

      if (transformMatrix && transformMatrix !== "none") {
        let values = transformMatrix.split("(")[1].split(")")[0].split(",");
        let a = parseFloat(values[0]);
        let b = parseFloat(values[1]);
        rotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      }

      if (rotation < 0) rotation = 360 + rotation;

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
    reSpin() {
      this.isSpinning = true;
    },
    randomTimeout() {
      this.randomChoice = true;
      setTimeout(() => {
        this.randomChoice = false;
        this.handleClick();
      }, Math.floor(Math.random() * 2000 + 100));
    },
  },
};
</script>

<style>
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
  border-top: 50px solid #000;
}
</style>
