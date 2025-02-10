<template>
  <div>
    <span class="flex justify-content-center">
      <label class="my-auto">{{
        $t(`singularActivities.${activityID}.custom.printAsPage`)
      }}</label>
      <InputSwitch v-model="easyCutMode" class="my-auto mx-3" />
      <label class="my-auto">{{
        $t(`singularActivities.${activityID}.custom.printForCutting`)
      }}</label></span
    >
    <p class="text-center mt-5 mb-3">
      {{ $t("minOccurences") }}: {{ minOccurrences }}
    </p>
    <div class="flex justify-content-center mb-4">
      <Slider
        v-model="minOccurrences"
        :min="1"
        :max="10"
        class="w-full max-w-20rem"
      />
    </div>
    <div class="flex flex-wrap justify-content-center gap-4">
      <div class="flex flex-column align-items-center" v-if="easyCutMode">
        <p class="text-center">{{ $t("numRows") }}</p>
        <InputNumber
          v-model="easyCutRows"
          inputId="minmax-buttons"
          showButtons
          :min="1"
        />
      </div>
      <div class="flex flex-column align-items-center" v-if="easyCutMode">
        <p class="text-center">{{ $t("numColumns") }}</p>
        <InputNumber
          v-model="easyCutColumns"
          inputId="minmax-buttons"
          showButtons
          :min="1"
        />
      </div>
      <div class="flex flex-column align-items-center" v-else>
        <p class="text-center">{{ $t("numColumns") }}</p>
        <InputNumber
          v-model="columns"
          inputId="minmax-buttons"
          showButtons
          :min="1"
        />
      </div>
      <div class="flex flex-column align-items-center">
        <p class="text-center">{{ $t("fontSize") }}</p>
        <InputNumber
          v-model="fontSize"
          inputId="minmax-buttons"
          showButtons
          :min="1"
        />
      </div>
    </div>
    <div class="flex justify-content-center mb-6 mt-6">
      <Button @click="printBoW">{{ $t("printOrSave") }}</Button>
    </div>
    <div
      v-if="easyCutMode"
      id="easycut"
      class="overflow-x-scroll surface-300 p-3 flex gap-2 white-space-nowrap"
    >
      <div v-for="(page, i) in easyCutContents" class="page" :key="i">
        <table
          v-for="(table, ii) in [
            page[1],
            page[2],
            page[6],
            page[5],
            page[7],
            page[4],
            page[0],
            page[3],
          ]"
          :key="ii"
          :class="ii === 6 ? 'pivot' : ''"
          :style="{
            fontSize: fontSize + 'px',
          }"
        >
          <tr
            v-for="(row, iii) in table"
            :key="iii"
            :style="{ height: 100 / table.length + '%' }"
          >
            <td v-for="(x, iv) in row" :key="iv">{{ x }}</td>
          </tr>
        </table>
      </div>
      <div
        v-html="$t(`singularActivities.${activityID}.custom.cuttingGuide`)"
        class="hidden"
        id="guide"
      ></div>
    </div>
    <div id="noneasycut" class="flex justify-content-center" v-else>
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

<style>
.page {
  border: 1px solid black;
  margin: 10mm;
  padding: 10mm;
  background-color: white;
  width: 190mm;
  height: 277mm;
  table-layout: fixed;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1cm;
  justify-content: center;
  flex: 0 0 auto;
}

.page table {
  margin: 0;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

.page td {
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ccc;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
}
</style>

<script>
import { getBagOfWords } from "@/views/activities/utils";
import { printBoWCss } from "@/assets/printCss";

export default {
  name: "WordCloud",
  props: {
    dataset: {
      required: true,
    },
    activityID: {
      required: true,
    },
  },
  data() {
    return {
      minOccurrences: 1,
      columns: 6,
      fontSize: 18,
      easyCutMode: true,
      easyCutColumns: 4,
      easyCutRows: 3,
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
    wordList() {
      let expandedList = [];
      this.bagOfWords.forEach(([word, count]) => {
        for (let i = 0; i < count; i++) {
          expandedList.push(word);
        }
      });
      expandedList = expandedList.sort(() => Math.random() - 0.5);
      return expandedList;
    },
    tableContents() {
      const rows = [];
      for (let i = 0; i < this.wordList.length; i += this.columns) {
        rows.push(this.wordList.slice(i, i + this.columns));
      }
      return rows;
    },
    easyCutContents() {
      const pages = [];
      for (
        let i = 0;
        i < this.wordList.length;
        i += this.easyCutColumns * this.easyCutRows * 8
      ) {
        pages.push(
          this.wordList.slice(i, i + this.easyCutColumns * this.easyCutRows * 8)
        );
      }
      const formattedPages = pages
        .slice(0, -1)
        .map((x) =>
          this.reshapeTo3DArray(x, 8, this.easyCutRows, this.easyCutColumns)
        );
      let finalPage = pages.at(-1);
      if (finalPage.length === this.easyCutColumns * this.easyCutRows * 8) {
        finalPage = this.reshapeTo3DArray(
          finalPage,
          8,
          this.easyCutRows,
          this.easyCutColumns
        );
      } else {
        let template = this.reshapeTo3DArray(
          Array(this.easyCutColumns * this.easyCutRows * 8).fill(" "),
          8,
          this.easyCutRows,
          this.easyCutColumns
        );

        // Tables read top to bottom, left to right
        let tableLayout = [
          [false, true],
          [true, true],
          [true, false],
          [false, false],
          [true, false],
          [false, false],
          [false, true],
          [true, true],
        ];

        for (
          let i = 0;
          i < this.easyCutColumns * this.easyCutRows * 8;
          i += 8
        ) {
          let currSegment = finalPage.slice(i, i + 8);
          let n = currSegment.filter((x) => x.length).length;
          if (n === 0) {
            break;
          } else {
            for (let j in currSegment) {
              let r = this.rowIndexes(tableLayout[j][0])[
                Math.floor(i / 8 / this.easyCutColumns)
              ];
              let c = this.colIndexes(tableLayout[j][1])[
                Math.floor((i / 8) % this.easyCutColumns)
              ];
              template[j][r][c] = currSegment[j];
            }
          }
        }

        finalPage = template;
      }
      formattedPages.push(finalPage);
      return formattedPages;
    },
  },
  methods: {
    rowIndexes(fromTopToBottom) {
      let x = [...Array(this.easyCutRows).keys()];
      return fromTopToBottom ? x : x.reverse();
    },
    colIndexes(fromLeftToRight) {
      let x = [...Array(this.easyCutColumns).keys()];
      return fromLeftToRight ? x : x.reverse();
    },
    reshapeTo3DArray(arr, dim1, dim2, dim3) {
      let index = 0;
      return Array.from({ length: dim1 }, () =>
        Array.from({ length: dim2 }, () =>
          Array.from({ length: dim3 }, () => arr[index++])
        )
      );
    },
    printBoW() {
      var prtContent = document.getElementById(
        this.easyCutMode ? "easycut" : "noneasycut"
      );
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(`
  <html>
    <head>
      <style>
      ${printBoWCss}
      </style>
    </head>
    <body>
      ${prtContent.innerHTML}
    </body>
  </html>
`);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
    },
  },
};
</script>
