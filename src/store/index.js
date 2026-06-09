import { createStore } from "vuex";

import writeSlipImage from "@/assets/activities/write-slip.jpg";
import bagOfWordsPracticalImage from "@/assets/hq-bag-of-words.jpg";
import spinningWheelImage from "@/assets/activities/spinning-wheels.jpg";
import createNewImage from "@/assets/activities/create-new.jpg";
import { ActicityModality } from "@/constants/activities";

export default createStore({
  state: {
    activities: [
      {
        id: "textCleaning",
        modality: ActicityModality.DIGITAL,
        subject: "anySubject",
        age: 10, // + will be appended e.g. 10+
        topics: ["textCleaning", "tokenisation"],
        duration: 20, // mins
        image: writeSlipImage,
      },
      {
        id: "bagOfWordsPractical",
        modality: ActicityModality.PRACTICAL,
        subject: "anySubject",
        age: 8,
        topics: ["textCleaning", "tokenisation", "textGeneration"],
        duration: 40,
        image: bagOfWordsPracticalImage,
      },
      {
        id: "textGeneration",
        modality: ActicityModality.DIGITAL,
        subject: "anySubject",
        age: 14,
        topics: ["textGeneration"],
        duration: 40,
        image: spinningWheelImage,
      },
      {
        id: "embodiedSentenceGeneration",
        modality: ActicityModality.EITHER,
        subject: "anySubject",
        age: 6,
        topics: ["textGeneration", "datasetBias"],
        duration: 20,
        image: createNewImage,
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
