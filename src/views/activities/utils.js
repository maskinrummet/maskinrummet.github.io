import i18n from "@/i18n";
import { stopwordDictDa, stopwordDictDe } from "./extraStopWords";

const languages = [
  { code: "En", label: "english", nlp: require("@nlpjs/lang-en") },
  { code: "Da", label: "danish", nlp: require("@nlpjs/lang-da") },
  { code: "Fr", label: "french", nlp: require("@nlpjs/lang-fr") },
  { code: "De", label: "german", nlp: require("@nlpjs/lang-de") },
  { code: "Es", label: "spanish", nlp: require("@nlpjs/lang-es") },
  { code: "It", label: "italian", nlp: require("@nlpjs/lang-it") },
  { code: "Nl", label: "dutch", nlp: require("@nlpjs/lang-nl") },
  { code: "Pt", label: "portuguese", nlp: require("@nlpjs/lang-pt") },
  { code: "Sv", label: "swedish", nlp: require("@nlpjs/lang-sv") },
  { code: "No", label: "norwegian", nlp: require("@nlpjs/lang-no") },
];

export const stemmingOptions = [
  { i18nKey: "doNoStemming", value: false },
  ...languages.map((lang) => ({
    i18nKey: lang.label,
    value: new lang.nlp["Stemmer" + lang.code](),
  })),
];

function addStopwords(stopworder, code) {
  if (code === "Da") stopworder.dictionary = stopwordDictDa;
  if (code === "De") stopworder.dictionary = stopwordDictDe;
  return stopworder;
}

export const stopwordsOptions = [
  { i18nKey: "doNoStopwords", value: false },
  ...languages.map((lang) => ({
    i18nKey: lang.label,
    value: addStopwords(new lang.nlp["Stopwords" + lang.code](), lang.code),
  })),
];

export function sortNumericalThenAlphabetical(a, b) {
  if (b[1] !== a[1]) {
    return b[1] - a[1];
  }
  return a[0].localeCompare(b[0]);
}

export function getBagOfWords(texts, stopwords = false, stemmer = false) {
  const fullText = cleanString(texts.join(" "), false);
  const words = fullText.split(/\s+/).filter((x) => !!x);

  const filteredWords = stopwords ? stopwords.removeStopwords(words) : words;

  const stemmedWords = stemmer
    ? filteredWords.map((x) => stemmer.stemWord(x))
    : filteredWords;

  const wordCount = stemmedWords.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const bagOfWords = Object.entries(wordCount).sort(
    sortNumericalThenAlphabetical
  );

  return bagOfWords;
}

export const categoricalColours = [
  "#003C8A",
  "#2976A6",
  "#54A6C1",
  "#92B6C0",
  "#E7B42A",
  "#DC7209",
  "#C22D00",
  "#960000",
];

export const otherColour = "#6F6F6F";

export const MAX_SENTENCE_LENGTH = 50;

export function cleanString(s, includeEndToken = true) {
  return (
    s.replace(/[^\p{L}\p{N}\s]/gu, "").toLowerCase() +
    (includeEndToken ? " " + i18n.global.t("endToken") : "")
  );
}

export function getOtheredProbs(
  probs,
  chosenWord,
  max = categoricalColours.length
) {
  if (probs.length <= max) {
    return probs;
  }
  let otheredProbs = [];
  let currentValue = -1;
  let othersAtCurrentValue = [];
  let foundChosenWord = false;
  for (let i in probs) {
    if (chosenWord === probs[i][0]) {
      otheredProbs.push(probs[i]);
      foundChosenWord = true;
    } else if (i < max - (foundChosenWord ? 0 : 1)) {
      otheredProbs.push(probs[i]);
    } else {
      if (currentValue === -1) {
        currentValue = probs[i][1];
      } else if (currentValue !== probs[i][1]) {
        otheredProbs.push([
          i18n.global.t("othersWith") +
            " " +
            currentValue +
            " " +
            i18n.global.t("occurences"),
          othersAtCurrentValue.reduce((a, [, b]) => a + b, 0),
        ]);
        currentValue = probs[i][1];
        othersAtCurrentValue = [];
      }
      othersAtCurrentValue.push(probs[i]);
    }
  }
  if (othersAtCurrentValue.length !== 0) {
    otheredProbs.push([
      i18n.global.t("othersWith") +
        " " +
        currentValue +
        " " +
        i18n.global.t("occurences"),
      othersAtCurrentValue.reduce((a, [, b]) => a + b, 0),
    ]);
  }
  return otheredProbs;
}

export function formatResultForVis(res) {
  return res.map((word, i) => {
    let otheredProbs = getOtheredProbs(word.probs, word.word);
    let probsWithoutOther = otheredProbs.filter(
      (x) => !x[0].startsWith(i18n.global.t("othersWith"))
    );
    return {
      word: word.word,
      pos: i,
      show: false,
      count: word.count,
      prevN: word.prevN,
      hasPie: true,
      backgroundColor: word.word.startsWith(i18n.global.t("othersWith"))
        ? otherColour
        : categoricalColours[
            probsWithoutOther.findIndex(([w]) => w == word.word)
          ],
      pieChartData: {
        labels: otheredProbs.map((x) => x[0]),
        datasets: [
          {
            data: otheredProbs.map((x) => x[1]),
            backgroundColor: otheredProbs.map((x) =>
              x[0].startsWith(i18n.global.t("othersWith"))
                ? otherColour
                : categoricalColours[
                    probsWithoutOther.findIndex(([w]) => w == x[0])
                  ]
            ),
          },
        ],
      },
    };
  });
}

export function slidingWindow(sentences, N) {
  let probabilities = {};
  for (let s of sentences) {
    let prevN = [];
    for (let i = 0; i < N; i++) {
      prevN.push(i18n.global.t("startToken"));
    }
    for (let x of s.split(/\s+/).filter((x) => !!x)) {
      if (prevN.join(" ") in probabilities) {
        if (x in probabilities[prevN.join(" ")]) {
          probabilities[prevN.join(" ")][x]++;
        } else {
          probabilities[prevN.join(" ")][x] = 1;
        }
      } else {
        probabilities[prevN.join(" ")] = {};
        probabilities[prevN.join(" ")][x] = 1;
      }
      prevN.shift();
      prevN.push(x);
    }
    if (prevN.join(" ") in probabilities) {
      if (i18n.global.t("endToken") in probabilities[prevN.join(" ")]) {
        probabilities[prevN.join(" ")][i18n.global.t("endToken")]++;
      } else {
        probabilities[prevN.join(" ")][i18n.global.t("endToken")] = 1;
      }
    } else {
      probabilities[prevN.join(" ")] = {};
      probabilities[prevN.join(" ")][i18n.global.t("endToken")] = 1;
    }
  }
  return probabilities;
}

export function getHighestValueKey(o) {
  return Object.entries(o).sort(sortNumericalThenAlphabetical)[0][0];
}

export function getWeightedRandomKey(o) {
  return getRandomKey(o, true);
}

export function getRandomKey(dictionary, useWeights = false) {
  let opts = [];
  if (useWeights) {
    // add V number of Ks to opts
    opts = Object.keys(dictionary).reduce(
      (acc, k) => acc.concat(Array(dictionary[k]).fill(k)),
      []
    );
  } else {
    opts = Object.keys(dictionary);
  }

  const randomNum = Math.random() * opts.length;

  for (let i = 0; i < opts.length; i++) {
    if (randomNum < i + 1) {
      return opts[i];
    }
  }
}

export const selectionMethodOptions = [
  { i18nKey: "greedy", value: getHighestValueKey },
  { i18nKey: "weightedRandom", value: getWeightedRandomKey },
  { i18nKey: "random", value: getRandomKey },
];

export function generateNgram(inputTexts, selectionMethod, N) {
  let sentences = inputTexts.map(cleanString);
  let probabilities = slidingWindow(sentences, N);

  let prevN = [];

  for (let i = 0; i < N; i++) {
    prevN.push(i18n.global.t("startToken"));
  }

  let sentence = [];

  let nextWord = selectionMethod(probabilities[prevN.join(" ")]);

  while (
    nextWord !== i18n.global.t("endToken") &&
    sentence.length < MAX_SENTENCE_LENGTH
  ) {
    sentence.push({
      word: nextWord,
      count: probabilities[prevN.join(" ")][nextWord],
      probs: Object.entries(probabilities[prevN.join(" ")]).sort(
        sortNumericalThenAlphabetical
      ),
      prevN: prevN.join(" "),
    });
    prevN.shift();
    prevN.push(nextWord);
    nextWord = selectionMethod(probabilities[prevN.join(" ")]);
  }

  sentence.push({
    word: nextWord,
    count: probabilities[prevN.join(" ")][nextWord],
    probs: getOtheredProbs(
      Object.entries(probabilities[prevN.join(" ")]).sort(
        sortNumericalThenAlphabetical
      ),
      nextWord
    ),
    prevN: prevN.join(" "),
  });

  return formatResultForVis(sentence);
}

export function generatePositionally(inputTexts, selectionMethod) {
  let allSentences = inputTexts.map(cleanString);
  const wordCounts = {};

  allSentences.forEach((sentence) => {
    const wordsInSentence = sentence.split(/\s+/).filter((x) => !!x);
    wordsInSentence.forEach((word, i) => {
      if (!wordCounts[i]) wordCounts[i] = {};
      wordCounts[i][word] = (wordCounts[i][word] || 0) + 1;
    });
  });

  const selectionResult = [];

  for (let position of Object.keys(wordCounts)) {
    const wordOptions = Object.entries(wordCounts[position]);
    wordOptions.sort(sortNumericalThenAlphabetical);
    const chosenWord = selectionMethod(Object.fromEntries(wordOptions));

    selectionResult.push({
      word: chosenWord,
      count: wordCounts[position][chosenWord],
      probs: wordOptions,
    });

    if (chosenWord === i18n.global.t("endToken")) break;
  }

  return formatResultForVis(selectionResult);
}

export function getRandomWord(texts, languageStopWords, languageStem) {
  const bagOfWords = getBagOfWords(texts, languageStopWords, languageStem);
  return drawFromBagOfWords(bagOfWords);
}

export function drawFromBagOfWords(bagOfWords) {
  return getRandomKey(Object.fromEntries(bagOfWords), true);
}

/* export function generateMostCommonWord(inputTexts) {
  let allSentences = inputTexts.map(cleanString);
  let wordCounts = {};
  let maxSentenceLength = Math.max(
    ...allSentences.map(
      (sentence) => sentence.split(/\s+/).filter((x) => !!x).length + 1
    )
  );

  for (let sentence of allSentences) {
    let words = sentence.split(/\s+/).filter((x) => !!x);
    for (let w of words) {
      wordCounts[w] = wordCounts[w] ? wordCounts[w] + 1 : 1;
    }
  }

  let allProbs = Object.entries(wordCounts).sort(sortNumericalThenAlphabetical);
  let allProbsWithOther = getOtheredProbs(allProbs);
  let mostCommonWord = allProbs[0][0];
  let filledArray = [];

  for (let i = 0; i < maxSentenceLength; i++) {
    filledArray.push(mostCommonWord);
  }

  return filledArray.concat(i18n.global.t("endToken")).map((word, i) => ({
    word,
    pos: i,
    show: false,
    count: wordCounts[word],
    hasPie: i < maxSentenceLength,
    backgroundColor:
      pieChartColors[allProbsWithOther.findIndex(([w]) => w == word)],
    pieChartData: {
      labels: allProbsWithOther.map((x) => x[0]),
      datasets: [
        {
          data: allProbsWithOther.map((x) => x[1]),
          backgroundColor: pieChartColors,
        },
      ],
    },
  }));
} */
