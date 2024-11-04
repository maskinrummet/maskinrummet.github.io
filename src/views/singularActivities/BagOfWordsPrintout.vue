<template>
  <div>
    <p class="text-center mt-3 mb-3">
      {{ $t("minOccurences") }}: {{ minOccurrences }}
    </p>
    <div class="flex justify-content-center mb-6">
      <Slider v-model="minOccurrences" :min="1" :max="10" class="w-7" />
    </div>
    <p class="text-center mt-3 mb-3">{{ $t("numColumns") }}</p>
    <div class="flex justify-content-center mb-6">
      <InputNumber
        v-model="columns"
        inputId="minmax-buttons"
        showButtons
        :min="1"
        class="w-7"
      />
    </div>
    <p class="text-center mt-3 mb-3">{{ $t("fontSize") }}</p>
    <div class="flex justify-content-center mb-6">
      <InputNumber
        v-model="fontSize"
        inputId="minmax-buttons"
        showButtons
        :min="1"
        class="w-7"
      />
    </div>
    <div class="flex justify-content-center mb-6">
      <Button @click="printBoW">{{ $t("printOrSave") }}</Button>
    </div>
    <div id="printbox" class="flex justify-content-center">
      <table
        :style="{
          fontSize: fontSize + 'px',
          tableLayout: 'fixed',
          textAlign: 'center',
        }"
      >
        <tr v-for="(row, rowIndex) in tableContents" :key="rowIndex">
          <td v-for="(item, colIndex) in row" :key="colIndex">
            {{ item }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getBagOfWords } from "@/views/activities/utils";
import InputNumber from "primevue/inputnumber";

export default {
  name: "WordCloud",
  components: {
    InputNumber,
  },
  props: {
    dataset: {
      required: true,
    },
  },
  data() {
    return {
      minOccurrences: 1,
      columns: 6,
      fontSize: 18,
    };
  },
  computed: {
    sentences() {
      if (!this.dataset.sentences) return [];
      return this.dataset.sentences.map((x) => x.text);
    },
    bagOfWords() {
      return getBagOfWords(this.sentences).filter(
        (x) => x[1] >= this.minOccurrences
      );
    },
    tableContents() {
      let expandedList = [];
      this.bagOfWords.forEach(([word, count]) => {
        for (let i = 0; i < count; i++) {
          expandedList.push(word);
        }
      });
      expandedList = expandedList.sort(() => Math.random() - 0.5);
      const rows = [];
      for (let i = 0; i < expandedList.length; i += this.columns) {
        rows.push(expandedList.slice(i, i + this.columns));
      }
      return rows;
    },
  },
  methods: {
    printBoW() {
      var prtContent = document.getElementById("printbox");
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
  },
};
</script>
