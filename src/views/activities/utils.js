import i18n from "@/i18n";

const { StemmerDa, StopwordsDa } = require("@nlpjs/lang-da");
const { StemmerEn, StopwordsEn } = require("@nlpjs/lang-en");
const { StemmerFr, StopwordsFr } = require("@nlpjs/lang-fr");
const { StemmerDe, StopwordsDe } = require("@nlpjs/lang-de");
const { StemmerEs, StopwordsEs } = require("@nlpjs/lang-es");
const { StemmerIt, StopwordsIt } = require("@nlpjs/lang-it");
const { StemmerNl, StopwordsNl } = require("@nlpjs/lang-nl");
const { StemmerPt, StopwordsPt } = require("@nlpjs/lang-pt");
const { StemmerSv, StopwordsSv } = require("@nlpjs/lang-sv");
const { StemmerNo, StopwordsNo } = require("@nlpjs/lang-no");

function getTranslationStemmer(lang) {
  return i18n.global.t(lang) + " " + i18n.global.t("stemming");
}

function getTranslationStopwords(lang) {
  console.log(i18n.global.t(lang) + " " + i18n.global.t("stopwords"));
  return i18n.global.t(lang) + " " + i18n.global.t("stopwords");
}

export const stemmingOptions = [
  { label: i18n.global.t("doNoStemming"), value: false },
  { label: getTranslationStemmer("english"), value: new StemmerEn() },
  { label: getTranslationStemmer("danish"), value: new StemmerDa() },
  { label: getTranslationStemmer("french"), value: new StemmerFr() },
  { label: getTranslationStemmer("german"), value: new StemmerDe() },
  { label: getTranslationStemmer("spanish"), value: new StemmerEs() },
  { label: getTranslationStemmer("italian"), value: new StemmerIt() },
  { label: getTranslationStemmer("dutch"), value: new StemmerNl() },
  { label: getTranslationStemmer("portuguese"), value: new StemmerPt() },
  { label: getTranslationStemmer("swedish"), value: new StemmerSv() },
  { label: getTranslationStemmer("norwegian"), value: new StemmerNo() },
];

export const stopwordsOptions = [
  { label: i18n.global.t("doNoStopwords"), value: false },
  { label: getTranslationStopwords("english"), value: new StopwordsEn() },
  { label: getTranslationStopwords("danish"), value: new StopwordsDa() },
  { label: getTranslationStopwords("french"), value: new StopwordsFr() },
  { label: getTranslationStopwords("german"), value: new StopwordsDe() },
  { label: getTranslationStopwords("spanish"), value: new StopwordsEs() },
  { label: getTranslationStopwords("italian"), value: new StopwordsIt() },
  { label: getTranslationStopwords("dutch"), value: new StopwordsNl() },
  { label: getTranslationStopwords("portuguese"), value: new StopwordsPt() },
  { label: getTranslationStopwords("swedish"), value: new StopwordsSv() },
  { label: getTranslationStopwords("norwegian"), value: new StopwordsNo() },
];

export function getBagOfWords(texts, stopwords = false, stemmer = false) {
  const fullText = texts
    .join(" ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "");
  const words = fullText.split(/\s+/);

  const filteredWords = stopwords ? stopwords.removeStopwords(words) : words;

  const stemmedWords = stemmer
    ? filteredWords.map((x) => stemmer.stemWord(x))
    : filteredWords;

  const wordCount = stemmedWords.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const bagOfWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

  return bagOfWords;
}

export const categoricalColours = [
  "#e41a1c", //red
  "#377eb8", //blue
  "#ff7f00", //orange
  "#184716", //green
  "#984ea3", //purple
  "#06ba7b", //turquoise
  "#ba06ab", //pink
  "#ffd500", //yellow
  "#573c21", //brown
];

export const otherColour = "#bbb";

export const pieChartColors = categoricalColours.concat(otherColour);

export function cleanString(s) {
  return s.replace(/[^\p{L}\p{N}\s]/gu, "").toLowerCase() + " [END]";
}

export function getOtheredProbs(probs, max = categoricalColours.length) {
  let allProbsWithOther = probs;
  if (probs.length > max) {
    allProbsWithOther = probs.slice(0, max);
    allProbsWithOther.push([
      i18n.global.t("other"),
      probs.slice(max).reduce((a, [, b]) => a + b, 0),
    ]);
  }
  return allProbsWithOther;
}

export function generateMostCommonWord(inputTexts) {
  let allSentences = inputTexts.map(cleanString);
  let wordCounts = {};
  let maxSentenceLength = Math.max(
    ...allSentences.map((sentence) => sentence.split(" ").length + 1)
  );

  for (let sentence of allSentences) {
    let words = sentence.split(" ");
    for (let w of words) {
      wordCounts[w] = wordCounts[w] ? wordCounts[w] + 1 : 1;
    }
  }

  let allProbs = Object.entries(wordCounts).sort(([, a], [, b]) => b - a);
  let allProbsWithOther = getOtheredProbs(allProbs);
  let mostCommonWord = allProbs[0][0];
  let filledArray = [];

  for (let i = 0; i < maxSentenceLength; i++) {
    filledArray.push(mostCommonWord);
  }

  return filledArray.concat("[END]").map((word, i) => ({
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
}

export function generateMostCommonWordByPosition(inputTexts) {
  let allSentences = inputTexts.map(cleanString);

  const wordCounts = {};

  allSentences.forEach((sentence) => {
    const words = sentence.split(" ");
    words.forEach((word, i) => {
      if (!wordCounts[i]) wordCounts[i] = {};
      wordCounts[i][word] = (wordCounts[i][word] || 0) + 1;
    });
  });

  const mostCommonWordsList = [];

  for (let position of Object.keys(wordCounts)) {
    const words = Object.entries(wordCounts[position]);
    words.sort(([, a], [, b]) => b - a);
    const [mostCommonWord, max] = words[0];
    const allProbsWithOther = getOtheredProbs(words);

    mostCommonWordsList.push({
      word: mostCommonWord,
      count: max,
      probs: allProbsWithOther,
    });

    if (mostCommonWord === "[END]") break;
  }

  return mostCommonWordsList.map((word, i) => ({
    word: word.word,
    pos: i,
    show: false,
    count: word.count,
    hasPie: true,
    backgroundColor:
      pieChartColors[word.probs.findIndex(([w]) => w == word.word)],
    pieChartData: {
      labels: word.probs.map((x) => x[0]),
      datasets: [
        {
          data: word.probs.map((x) => x[1]),
          backgroundColor: pieChartColors,
        },
      ],
    },
  }));
}

export function slidingWindow(sentences, N) {
  let probabilities = {};
  for (let s of sentences) {
    let prevN = [];
    for (let i = 0; i < N; i++) {
      prevN.push("[START]");
    }
    for (let x of s.split(" ")) {
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
      if ("[END]" in probabilities[prevN.join(" ")]) {
        probabilities[prevN.join(" ")]["[END]"]++;
      } else {
        probabilities[prevN.join(" ")]["[END]"] = 1;
      }
    } else {
      probabilities[prevN.join(" ")] = {};
      probabilities[prevN.join(" ")]["[END]"] = 1;
    }
  }
  return probabilities;
}

export function greedyChoice(probabilities) {
  let N = Object.keys(probabilities)[0].split(" ").length;
  let prevN = [];
  for (let i = 0; i < N; i++) {
    prevN.push("[START]");
  }
  let sentence = [];
  let nextWord = Object.entries(probabilities[prevN.join(" ")]).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  while (nextWord !== "[END]" && sentence.length < 40) {
    sentence.push({
      word: nextWord,
      probs: Object.entries(probabilities[prevN.join(" ")]).sort(
        ([, a], [, b]) => b - a
      ),
      prevN: prevN.join(" "),
    });
    prevN.shift();
    prevN.push(nextWord);
    nextWord = Object.entries(probabilities[prevN.join(" ")]).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
  }
  sentence.push({
    word: nextWord,
    probs: Object.entries(probabilities[prevN.join(" ")]).sort(
      ([, a], [, b]) => b - a
    ),
    prevN: prevN.join(" "),
  });
  return sentence;
}

export function getRandomKeyProportionateToValue(dictionary) {
  let totalSum = 0;
  for (let key in dictionary) {
    totalSum += dictionary[key];
  }

  const randomNum = Math.random() * totalSum;

  let currentSum = 0;
  for (let key in dictionary) {
    currentSum += dictionary[key];
    if (randomNum < currentSum) {
      return key;
    }
  }
}

export function weightedRandomChoice(probabilities) {
  let N = Object.keys(probabilities)[0].split(" ").length;
  let prevN = [];
  for (let i = 0; i < N; i++) {
    prevN.push("[START]");
  }
  let sentence = [];
  let nextWord = getRandomKeyProportionateToValue(
    probabilities[prevN.join(" ")]
  );
  while (nextWord !== "[END]" && sentence.length < 40) {
    sentence.push({
      word: nextWord,
      probs: Object.entries(probabilities[prevN.join(" ")]).sort(
        ([, a], [, b]) => b - a
      ),
      prevN: prevN.join(" "),
    });
    prevN.shift();
    prevN.push(nextWord);
    nextWord = getRandomKeyProportionateToValue(probabilities[prevN.join(" ")]);
  }
  sentence.push({
    word: nextWord,
    probs: Object.entries(probabilities[prevN.join(" ")]).sort(
      ([, a], [, b]) => b - a
    ),
    prevN: prevN.join(" "),
  });
  return sentence;
}

export function getRandomKey(dictionary) {
  let keys = Object.keys(dictionary);

  const randomNum = Math.random() * keys.length;

  for (let i = 0; i < keys.length; i++) {
    if (randomNum < i + 1) {
      return keys[i];
    }
  }
}

export function randomChoice(probabilities) {
  //TODO: combine this and above
  let N = Object.keys(probabilities)[0].split(" ").length;
  let prevN = [];
  for (let i = 0; i < N; i++) {
    prevN.push("[START]");
  }
  let sentence = [];
  let nextWord = getRandomKey(probabilities[prevN.join(" ")]);
  while (nextWord !== "[END]" && sentence.length < 40) {
    sentence.push({
      word: nextWord,
      probs: Object.entries(probabilities[prevN.join(" ")]).sort(
        ([, a], [, b]) => b - a
      ),
      prevN: prevN.join(" "),
    });
    prevN.shift();
    prevN.push(nextWord);
    nextWord = getRandomKey(probabilities[prevN.join(" ")]);
  }
  sentence.push({
    word: nextWord,
    probs: Object.entries(probabilities[prevN.join(" ")]).sort(
      ([, a], [, b]) => b - a
    ),
    prevN: prevN.join(" "),
  });
  return sentence;
}

export const selectionMethodOptions = [
  { label: i18n.global.t("greedy"), value: greedyChoice },
  { label: i18n.global.t("weightedRandom"), value: weightedRandomChoice },
  { label: i18n.global.t("random"), value: randomChoice },
];

export function generateNgram(inputTexts, selectionMethod, N) {
  let sentences = inputTexts.map(cleanString);
  let slidingResult = selectionMethod(slidingWindow(sentences, N));
  return slidingResult.map((word, i) => ({
    word: word.word,
    pos: i,
    show: false,
    count: word.probs[0][1],
    prevN: word.prevN,
    hasPie: true,
    backgroundColor:
      pieChartColors[word.probs.findIndex(([w]) => w == word.word)],
    pieChartData: {
      labels: getOtheredProbs(word.probs).map((x) => x[0]),
      datasets: [
        {
          data: getOtheredProbs(word.probs).map((x) => x[1]),
          backgroundColor: pieChartColors,
        },
      ],
    },
  }));
}

export function getRandomWord(texts, languageStopWords, languageStem) {
  const bagOfWords = getBagOfWords(texts, languageStopWords, languageStem);
  return drawFromBagOfWords(bagOfWords);
}

export function drawFromBagOfWords(bagOfWords) {
  return getRandomKeyProportionateToValue(Object.fromEntries(bagOfWords));
}
