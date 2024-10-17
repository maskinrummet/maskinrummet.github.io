import { createStore } from "vuex";

export default createStore({
  state: {
    activities: [
      {
        id: "textCleaning",
        modality: "digital", // one of: digital, practical, mixed, embodied, resource
        subject: "anySubject",
        age: 10, // + will be appended e.g. 10+
        topics: ["textCleaning", "tokenisation"],
        duration: 20, // mins
      },
      {
        id: "bagOfWordsPractical",
        modality: "practical",
        subject: "anySubject",
        age: 8,
        topics: ["textCleaning", "tokenisation", "textGeneration"],
        duration: 40,
      },
      {
        id: "textGeneration",
        modality: "digital",
        subject: "anySubject",
        age: 14,
        topics: ["textGeneration"],
        duration: 40,
      },
      {
        id: "embodiedSentenceGeneration",
        modality: "either",
        subject: "anySubject",
        age: 6,
        topics: ["textGeneration", "datasetBias"],
        duration: 20,
      },
    ],
    singularActivities: [
      {
        id: "wordCloud",
      },
      {
        id: "ngramTextGen",
      },
    ],
  },
  getters: {
    getActivityById: (state) => (id) => {
      return state.activities.find((activity) => activity.id === id);
    },
    getSingularActivityById: (state) => (id) => {
      return state.singularActivities.find((activity) => activity.id === id);
    },
  },
});
