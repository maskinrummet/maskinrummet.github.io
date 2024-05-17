# maskinrummet

## Welcome / Velkommen til!

Maskinrummet (The Engine Room) is a project to spread and contribute educational resources around text processing and AI systems, which I have undertaken as part of my master's thesis at Aarhus University. These systems have wide societal implications, and the general population currently faces a lack of resources for learning about how these tools work, what they can do, and how they affect our daily lives - We are seeking to make a dent in this deficit.

Suggestions are extremely welcome!

### Contributing a Lesson

If you have an idea for a lesson and are comfortable programming in Vue, follow the steps below. If coding is not your thing, send me an email at lukejconnelly1@gmail.com.

1. **Pick an ID for your lesson**  
   It should be at least two words. The current style is camelCase for the ID, with PascalCase for the Vue component.

2. **In `@i18n`, add your camelCaseId as a key with each of the below keys**  
   `custom` can be used for longer texts. HTML rendering using `v-html` is enabled on each of the keys.

   ```json
   example: {
       title: "etc",
       description: "etc",
       whatYouNeed: "etc",
       learningGoals: "etc",
       intro: "etc",
       learningOutcomes: "etc",
       readMore: "etc",
       custom: {
           addAnythingElseHere: "etc"
       }
   }
   ```

3. **In `@store`, add to the activity key the following:**

   ```json
   {
     "id": "yourCamelCaseId",
     "modality": "digital", // one of digital, practical, optional
     "subject": "anySubject", // anySubject for any, else subject name and add it to i18n if it's not present
     "age": 14, // integer, + will be displayed beside this
     "topics": ["textGeneration"], // multiple of "datasetBias", "textGeneration", "textCleaning", "tokenisation" or add a newTopic to i18n and also add "newTopicExplained" with a description
     "duration": 40 // integer, mins
   }
   ```

4. **In `@views/ActivityDetail.vue`, import and register your component, and add a lookup for the component with ID to `componentMap`:**

   ```javascript
   componentMap = {
       ...,
       yourCamelCaseId: "YourPascalCaseId"
   };
   ```

5. **In `@src/views/activities.js`, import and export your component**

6. **Finally, in `@views/activities`, create `YourPascalCaseId.vue`**  
   It receives `activityID: String` as a prop for use in i18n, and should emit `startActivity` to hide intro and `completedActivity` to show outro. Please consider cross-device compatibility - phones are important!

### Thanks!

Thanks for taking a look at our hyggelig project!  
// Luke
