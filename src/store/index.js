import { createStore } from "vuex";
import { ActivityModality } from "@/constants/activities";

export default createStore({
  state: {
    activities: [
      {
        id: "textGeneration",
        modality: ActivityModality.DIGITAL,
        subject: "anySubject",
        age: 14,
        topics: ["textGeneration"],
        duration: 40,
      },
      {
        id: "hourOfAI",
        modality: ActivityModality.PHYSICAL,
        subject: "anySubject",
        age: 10,
        topics: ["textGeneration", "datasetBias"],
        duration: 60,
        link: "hour-of-ai",
      },
      {
        id: "textCleaning",
        modality: ActivityModality.DIGITAL,
        subject: "anySubject",
        age: 10, // + will be appended e.g. 10+
        topics: ["textCleaning", "tokenisation"],
        duration: 20, // mins
      },
      {
        id: "bagOfWordsPractical",
        modality: ActivityModality.PHYSICAL,
        subject: "anySubject",
        age: 8,
        topics: ["textCleaning", "tokenisation", "textGeneration"],
        duration: 40,
      },
      {
        id: "embodiedSentenceGeneration",
        modality: ActivityModality.EITHER,
        subject: "anySubject",
        age: 8,
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
      { id: "positionalTextGen" },
      {
        id: "bagOfWordsPrintout",
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
