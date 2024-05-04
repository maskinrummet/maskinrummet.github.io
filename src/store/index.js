import { createStore } from "vuex";

export default createStore({
  state: {
    activities: [
      {
        id: "text-cleaning",
        title: "textCleaning",
        description: "textCleaningDesc",
        modality: "digital",
        subject: "anySubject",
        age: 10, // + will be appended e.g. 10+
        topics: ["textCleaning", "tokenisation"],
        duration: 20, // mins
      },
      {
        id: "text-cleaning-paper",
        title: "textCleaningPaper",
        description: "textCleaningPaperDesc",
        modality: "practical",
        subject: "anySubject",
        age: 8, // + will be appended e.g. 10+
        topics: ["textCleaning", "tokenisation", "etc"],
        duration: 40, // mins
      },
    ],
  },
  getters: {
    getActivityById: (state) => (id) => {
      return state.activities.find((activity) => activity.id === id);
    },
  },
});
