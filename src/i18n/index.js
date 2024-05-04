import { createI18n } from "vue-i18n";

const messages = {
  en: {
    maskinrummet: "The Engine Room",
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
    textCleaningDesc:
      "In this lesson we explore how texts can be cleaned into words for processing.",
    digital: "Digital",
    anySubject: "Any",
    mins: "mins",
    tokenisation: "Tokenisation",
    textCleaningPaper: "Text cleaning with paper",
    textCleaningPaperDesc:
      "In this lesson we explore how texts can be cleaned into words for processing using paper.",
    practical: "Practical",
    selectTopics: "Select topics",
  },
  da: {
    maskinrummet: "Maskinrummet",
    home: "Hjem",
    about: "Om os",
    aboutText:
      "Maskinrummet er et projekt, der sigter mod at give et læringsressource for den generelle befolkning og lærere med fokus på AI og tekstbehandlingsteknologier.",
    contact: "Kontakt",
    contactText:
      "Websted oprettet og under udvikling af Luke Connelly (+45 93 87 34 09, lukejconnelly1{'@'}gmail.com).",
    language: "Sprog",
    currLanguage: "Dansk",
    error404: "Siden blev ikke fundet",
    availableActivities: "Tilgængelige aktiviteter",
    suggestActivity: "Foreslå en aktivitet",
    currentActivity: "Nuværende aktivitet",
    title: "Titel",
    modality: "Modalitet",
    subject: "Fag",
    age: "Alder",
    duration: "Varighed",
    topics: "Emner",
    textCleaning: "Tekst rensning",
    textCleaningDesc: "I denne",
    digital: "Digitalt",
    anySubject: "Flexibel",
    mins: "min",
    tokenisation: "Tokenisering",
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
