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
        id: "textCleaningPaper",
        modality: "practical",
        subject: "anySubject",
        age: 8,
        topics: ["textCleaning", "tokenisation"],
        duration: 40,
      },
    ],
  },
  getters: {
    getActivityById: (state) => (id) => {
      return state.activities.find((activity) => activity.id === id);
    },
  },
});
