import { createI18n } from "vue-i18n";

const messages = {
  en: {
    maskinrummet: "Engine Room",
    home: "Home",
    about: "About",
    aboutText:
      "The Engine Room is a project that aims to provide a learning resource for the general population and teachers with a focus on AI and text processing technologies.",
    contact: "Contact",
    contactText:
      "Site created and under development by Luke Connelly (+45 93 87 34 09, lukejconnelly1{'@'}gmail.com).",
    language: "Language",
    currLanguage: "English",
    error404: "Page not found",
    availableActivities: "Available activities",
    suggestActivity: "Suggest an activity",
    currentActivity: "Current activity",
    title: "Title",
    modality: "Modality",
    subject: "Subject",
    age: "Age",
    duration: "Duration",
    topics: "Topics",
    textCleaning: "Text cleaning",
    digital: "Digital",
    anySubject: "Any",
    mins: "mins",
    tokenisation: "Tokenisation",
    practical: "Practical",
    selectTopics: "Select topics",
    activityNotFound: "Activity not found",
    whatYouNeed: "What you need for this activity",
    learningGoals: "Learning goals",
    intro: "Introduction",
    howTo: "How to use the site",
    longSentence: "That sentence is a bit too long, try a shorter one!",
    emptySentence: "You need to write something in the box!",
    back: "Back",
    next: "Next",
    finishLesson: "Finish lesson",
    congrats: "Congratulations!",
    youCompleted: "You have completed the lesson.",
    learningOutcomes: "Learning outcomes",
    seeMore: "See more",
    splitting: "Splitting",
    lowercasing: "Lowercasing",
    cleaning: "Cleaning",
    sentenceInputTitle: "Input a sentence",
    yourSentence: "Your sentence",
    submit: "Submit",
    gotSentence: "Received sentence:",
    activities: {
      textCleaning: {
        title: "Text cleaning",
        description:
          "In this lesson we explore how texts can be cleaned into words for processing.",
        whatYouNeed: "Nothing :)",
        learningGoals:
          "Understand how text can be cleaned into words for processing. Get an introdcution to tokenisation.",
        intro:
          "How do we process a piece of text? It's a more difficult question than it seems at first as text is represented in computers as 'strings' of characters in binary. Therefore while we can see the words 'hello', 'HELLO', and 'Helloooo' all mean the same thing, they are very different to a computer. To start with, let's focus on trying to break up a piece of text into words.",
        custom: {
          howComputersSee: "How computers see text",
          characterCodesExplained: "Character Codes Explained etc",
          splitSentenceUsingSpaceBelow:
            "Split the sentence below into words by clicking the space between them.",
          lowercaseSentenceBelow: "Lowercase the sentence below.",
        },
      },
      textCleaningPaper: {
        title: "Text cleaning with paper",
        description:
          "In this lesson we explore how texts can be cleaned into words for processing using paper.",
        whatYouNeed:
          "Some paper and a pen. If you're running this in a group, we have template sheets for writing on available.",
      },
    },
  },
  da: {
    maskinrummet: "Maskinrummet",
    home: "Hjem",
    about: "Om",
    aboutText:
      "Maskinrummet er et projekt, der sigter mod at give en læringsressource til den brede befolkning og lærere med fokus på AI og tekstbehandlingsteknologier.",
    contact: "Kontakt",
    contactText:
      "Websted oprettet og under udvikling af Luke Connelly (+45 93 87 34 09, lukejconnelly1{'@'}gmail.com).",
    language: "Sprog",
    currLanguage: "Engelsk",
    error404: "Siden blev ikke fundet",
    availableActivities: "Tilgængelige aktiviteter",
    suggestActivity: "Forslå en aktivitet",
    currentActivity: "Nuværende aktivitet",
    title: "Titel",
    modality: "Modalitet",
    subject: "Fag",
    age: "Alder",
    duration: "Varighed",
    topics: "Emner",
    textCleaning: "Tekstrensning",
    digital: "Digital",
    anySubject: "Alle",
    mins: "min",
    tokenisation: "Tokenisering",
    activities: {
      textCleaning: {
        title: "Tekstrensning",
        description:
          "I denne lektion udforsker vi, hvordan tekster kan renses og opdeles i ord til behandling.",
      },
      textCleaningPaper: {
        title: "Tekstrensning med papir",
        description:
          "I denne lektion udforsker vi, hvordan tekster kan renses og opdeles i ord til behandling ved hjælp af papir.",
      },
    },
    practical: "Praktisk",
    selectTopics: "Vælg emner",
    activityNotFound: "Aktiviteten blev ikke fundet",
  },
};

export const langs = [
  { name: "English", value: "en" },
  { name: "Dansk", value: "da" },
];

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
