# maskinrummet

## Welcome / Velkommen til!

Maskinrummet (The Engine Room) is a project to spread and contribute educational resources around text processing and AI systems, which I have undertaken as part of my master's thesis at Aarhus University. These systems have wide societal implications, and the general population currently faces a lack of resources for learning about how these tools work, what they can do, and how they affect our daily lives - We are seeking to make a dent in this deficit.

Suggestions are extremely welcome!

### Contributing a Lesson

If coding is not your thing, send me an email at lukejconnelly1@gmail.com.

If you have an idea for a lesson, but don't have time to program it, consider adding to `activityIdeas` with a short .txt following the template.

If you have time to help and are comfortable programming in Vue, follow the steps below:

1. **Pick an ID for your lesson**  
   It should be at least two words. The current style is camelCase for the ID, with PascalCase for the Vue component.

2. **In `@i18n`, add your camelCaseId as a key under `activities` with each of the below keys**  
   `custom` can be used for longer texts. HTML rendering using `v-html` is enabled on each of the keys.

   ```javascript
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

3. **In `@store`, add to the `activities` key the following:**

   ```javascript
   {
     id: "yourCamelCaseId",
     modality: "digital", // one of digital, practical, either
     subject: "anySubject", // anySubject for any, else subject name and add it to i18n if it's not present
     age: 14, // integer, + will be displayed beside this
     topics: ["textGeneration"], // multiple of "datasetBias", textGeneration", "textCleaning", "tokenisation" or add a newTopic to i18n and also add "newTopicExplained" with a description
     duration: 40 // integer, mins
   }
   ```

4. **Finally, in `@views/activities`, create `YourPascalCaseId.vue`**  
   Templates for this are provided in `ActivityTemplateDigital.vue` and `ActivityTemplatePractical.vue` It receives `activityID: String` as a prop for use in i18n, and should emit `startActivity` to hide the intro and `completedActivity` to show the outro. Please consider cross-device compatibility!

### Adding a language

To add a language, go to `@i18n/index.js`. Firstly add your language name and code (value) to the `langs` const:

```javascript
export const langs = [...{ name: "Volapük", value: "vo" }];
```

Then just add your language code to the messages object, along with each of the translations:

```javascript
   export const messages = {
      vo: {
         maskinrummet: "Büdazänod",
         ...
      }
   }
```

### Thanks!

Thanks for taking a look at our hyggelig project!  
// Luke
