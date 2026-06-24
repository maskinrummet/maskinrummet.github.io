import { createStore } from "vuex";

import tokenisationImage from "@/assets/activities/tokenisation-banner.png";
import bagOfWordsPracticalImage from "@/assets/hq-bag-of-words.jpg";
import spinningWheelImage from "@/assets/activities/spinning-wheels.jpg";
import createNewImage from "@/assets/activities/create-new.jpg";
import ngramImage from "@/assets/activities/ngram_example.png";
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
        image: ngramImage,
      },
      {
        id: "hourOfAI",
        modality: ActivityModality.PHYSICAL,
        subject: "anySubject",
        age: 10,
        topics: ["textGeneration", "datasetBias"],
        duration: 60,
        image: spinningWheelImage,
        link: "hour-of-ai",
      },
      {
        id: "textCleaning",
        modality: ActivityModality.DIGITAL,
        subject: "anySubject",
        age: 10, // + will be appended e.g. 10+
        topics: ["textCleaning", "tokenisation"],
        duration: 20, // mins
        image: tokenisationImage,
      },
      {
        id: "bagOfWordsPractical",
        modality: ActivityModality.PHYSICAL,
        subject: "anySubject",
        age: 8,
        topics: ["textCleaning", "tokenisation", "textGeneration"],
        duration: 40,
        image: bagOfWordsPracticalImage,
      },
      {
        id: "embodiedSentenceGeneration",
        modality: ActivityModality.EITHER,
        subject: "anySubject",
        age: 8,
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
