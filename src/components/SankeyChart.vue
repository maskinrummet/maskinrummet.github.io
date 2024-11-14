<template>
  <div ref="chartContainer"></div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, onUnmounted } from "vue";
import Chart from "chart.js/auto";
import { SankeyController, Flow } from "chartjs-chart-sankey";

Chart.defaults.font.size = 16;
Chart.defaults.font.weight = "bold";
Chart.defaults.font.family = "Inter var, sans-serif";
Chart.defaults.borderColor = "black";

Chart.register(SankeyController, Flow);

export default defineComponent({
  props: {
    flows: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartContainer = ref(null);
    let chartInstance = null;

    const getColour = (index, total) => {
      return `hsl(${(index * 360) / total}, 100%, 50%)`;
    };

    const initializeChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }

      if (chartContainer.value) {
        chartContainer.value.innerHTML = "";
      }

      const canvas = document.createElement("canvas");
      chartContainer.value.appendChild(canvas);

      chartInstance = new Chart(canvas, {
        type: "sankey",
        data: {
          datasets: [
            {
              label: "Sankey",
              data: props.flows,
              colorFrom: () => "gray",
              colorTo: (c) => getColour(c.dataIndex, props.flows.length),
              colorMode: "gradient",
              size: "max",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    watch(() => props.flows, initializeChart, { deep: true });

    onUnmounted(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    onMounted(initializeChart);

    return { chartContainer };
  },
});
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
