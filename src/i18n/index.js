import { createI18n } from "vue-i18n";

const messages = {
  en: {
    maskinrummet: "Engine Room",
    home: "Home",
    about: "About",
    contact: "Contact",
    luke: "Luke Connelly",
    student: "Computer Science Masters Student at Aarhus University",
    phoneNumber: "+45 93 87 34 09",
    email: "lukejconnelly1{'@'}gmail.com",
    aboutLuke:
      "Please get in contact with me with suggestions, questions, or feedback! I would love to hear it!",
    thanks:
      "With thanks to Magnus, Karl-Emil, Susanne, Line, and especially the teachers and research participants who have worked together with us to create this site",
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
    textCleaningExplained:
      "Text cleaning is the process of preparing text for processing, which can involve removing punctuation, splitting into words or sentences, and general standardisation of the text.",
    digital: "Digital",
    anySubject: "Any",
    mins: "mins",
    tokenisation: "Tokenisation",
    tokenisationExplained:
      "Tokenisation is the process of splitting text into meaningful units, such as words, for further processing.",
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
    splitting: "Splitting into words",
    lowercasing: "Lowercasing",
    cleaning: "Cleaning punctuation",
    sentenceInputTitle: "Input a sentence",
    yourSentence: "Your sentence",
    submit: "Submit",
    gotSentence: "Received sentence:",
    seeComputer: "Change all to computer view",
    seeHuman: "Change all to human view",
    autoClick: "Auto click all",
    helpUs:
      "Help us out with suggestions; sharing; contributing to our GitHub; and supporting science in your community",
    ourProject: "Our Project",
    aboutOurProject:
      "Text processing, text AI, and chatbots have become incredibly popular, however, we see a lack of educational tools and resources for learning about how they work. We believe the society-wide impact of these technologies requires everyone to be afforded the opportunity to learn. Therefore we developed this website through consulation with teachers, as a resource for developing understanding and critical thinking skills, through simple and applicable activities.",
    compEmpowerment: "Computational Empowerment",
    aboutCompEmpowerment:
      "Computational empowerment is an approach and a Participatory Design response to challenges related to the emerging need for digital literacy in lower secondary education. The approach extends the current focus on computational thinking to include a concern for how children and youth are empowered through constructive, analytical and critical engagement with technology. [Dindler, C., Smith, R. C., & Iversen, O. S. (2020). Computational Empowerment: participatory design in education. CoDesign: International Journal of CoCreation in Design and the Arts, 16(1), 66-80. https://doi.org/10.1080/15710882.2020.1722173]",
    futureWork: "Future Work",
    aboutFutureWork: "To be decided...",
    textGeneration: "Text generation",
    textGenerationExplained:
      "Text generation is the process of creating text, often accomplished in e.g. ChatGPT with the use of AI.",
    createANewDatasetIntro:
      "Here you can create a new dataset for use on the site. You can provide all the text, or make it open for others to contribute to. You can change this, or add/delete to the dataset at any time. Each dataset has a password, which you can share with anyone who you'd also like to be able to edit it. NOTE: This is not a secure app, use silly passwords which you wouldn't mind being publicly available online. In summary, datasets are:",
    editable: "Editable",
    deleteable: "Deleteable",
    passwordProtected: "Password protected",
    publiclyVisible: "Publicly visible",
    datasetName: "Dataset name",
    datasetPassword: "Dataset password",
    confirmDatasetPassword: "Confirm dataset password",
    openDataset: "Open dataset for others to contribute?",
    open: "Open",
    closed: "Closed",
    startEmptyDataset: "Start with an empty dataset?",
    startingSentences:
      "Sentences which the dataset will start with (You can always add more or delete later)",
    action: "Action",
    delete: "Delete",
    selectSplitter: "Select how the text above should be split in the dataset",
    add: "Add",
    createDataset: "Create Dataset",
    emptyDatasetName: "You need to provide a dataset name",
    longDatasetName: "The dataset name is too long",
    emptyPassword: "You need to provide a password for the dataset",
    longPassword: "The password is too long",
    passwordMismatch: "The passwords do not match",
    emptyStartingSentences:
      "This would create an empty dataset, you need to provide some starting sentences or uncheck the box above",
    selectADataset: "Select a dataset",
    serverErrorOccurred: "A server error occurred, please try again later",
    loading: "Loading...",
    viewDataset: "View dataset",
    or: "or",
    createADataset: "Create a dataset",
    newDataset: "New dataset",
    addSentenceAndStart:
      "Add a sentence to the selected dataset and start activity",
    startActivity: "Start activity",
    startActivityWOSentence:
      "Start activity without adding a sentence to the dataset",
    noDatasetSelected: "No dataset selected",
    inputTexts: "Input texts",
    nevermind: "Nevermind",
    refreshDataset: "Refresh Dataset",
    saveChanges: "Save changes",
    openForInput: "Open for input",
    closedForInput: "Closed for input",
    editDataset: "Edit dataset",
    generate: "Generate",
    how: "How?",
    position: "Position",
    previous: "Previous",
    other: "Other",
    wordCloud: "Word Cloud",
    positionalTextGeneration: "Positional Text Generation",
    nGramsGeneration: "N-Grams Text Generation",
    windowSize: "Window size",
    doNoStemming: "Perform no stemming",
    doNoStopwords: "Filter no stopwords",
    englishStopwords: "English stopwords",
    danishStopwords: "Danish stopwords",
    englishStemming: "English stemming",
    danishStemming: "Danish stemming",
    datasetBias: "Dataset Bias",
    randomWords: "Random words",
    mostCommonWords: "Most common words",
    generateRandomWords: "Generate random words",
    optional: "Optional",
    datasetBiasExplained:
      "Dataset bias is when a dataset is skewed towards certain topics, words, or phrases, which can lead to unfair choices or incorrect outputs from AI trained on the dataset.",
    activities: {
      textCleaning: {
        title: "Text cleaning",
        description:
          "In this lesson we explore how texts can be cleaned into words for processing in text AI.",
        whatYouNeed: "Nothing :)",
        learningGoals:
          '<ul><li>Understand how computers "see" text</li><li>Understand how text can be "cleaned" into words for processing</li><li>Get an introduction to tokenisation</li></ul>',
        intro:
          "How do we process a piece of text? It's a more difficult question than it seems at first as text is represented in computers as 'strings' of characters, as numbers. Therefore while we can see the words 'hello', 'HELLO', and 'Hello!' all mean the same thing, they are very different to a computer.<br><br>To start with, let's focus on trying to break up a piece of text into words.",
        learningOutcomes:
          "Hopefully after completing this lesson you:<ul><li>Understand what tokenisation is and how it might be used in text processing</li><li>Have a better understanding of how computers process text as 'strings' of characters</li><li>How this means the 'meaning' of text that's obvious to us people can be much more difficult for a computer</li></ul>",
        readMore:
          'You can see exactly how ChatGPT and OpenAI\'s GPT models would tokenise text here: <a href="https://platform.openai.com/tokenizer" target="_blank">https://platform.openai.com/tokenizer</a><br><br>If you\'re interested in learning more about tokenisation, you can read more about it here: <a href="https://www.datacamp.com/blog/what-is-tokenization" target="_blank">https://www.datacamp.com/blog/what-is-tokenization</a>',
        custom: {
          howComputersSee:
            "Below you can see how your computer sees your sentence. You can hover on the characters/codes or use the buttons to reveal the original text.",
          characterCodesExplained:
            "Each character (this includes letters, numbers, and punctuation) a computer sees is represented by a number called a character code. For example, the letter 'a' is represented by the number 97, 'b'=98, 'c'=99, and so on.",
          splitSentenceUsingSpaceBelow:
            "So, if we want to get words out of our text, we first need a way to understand which character codes are parts of words, and which aren't. One common way is to start by splitting the strings of characters using spaces, represented by character code 32. Click these to remove them from your sentence.",
          lowercaseSentenceBelow:
            "Now we have something that starts to look like individual words. But, if someone submitted the word 'HELLO' and another person submitted 'hello', the computer would see these as two completely different sets of numbers, when we would probably want to treat them as the same word. One way to do this is to convert all the characters to lowercase. Click the uppercase characters below to do this.",
          removePuncBelow:
            "Now our words look right, but punctuation can still cause problems. For example, 'hello' and 'hello!' are still different words to a computer. Sometimes it can be fine to remove it, but we might also need the punctuation to understand words. For example, the sentence 'Let's eat, Grandma!' is very different from 'Let's eat Grandma!'. Therefore, to handle this we will keep the punctuation, but mark it as not part of the individual words. Click below to mark punctuation and finish cleaning your string.",
          introToTokenisation:
            "Great job! You've now cleaned your text into words and punctuation. This process is called 'tokenisation', where we turn texts into lists of 'tokens' which contribute to the meaning of the text. This is a key part, and usually the first step, for text processing in AI. While ours was reasonably effective, there were a few simplifications to make things easier. For example, the word don't would be split into the words 'don' and 't', because of the punctuation, when we would probably want to treat it as one word or 'do' and 'not'. Therefore, the usual way of doing tokenisation on a text is to use 'Machine Learning' on a big dataset to allow text processing AIs to automatically learn the patterns of how words are split up.",
        },
      },
      textCleaningPaper: {
        title: "Text cleaning with paper",
        description:
          "In this lesson we explore how texts can be cleaned into words for processing using paper.",
        whatYouNeed:
          "Some paper and a pen. If you're running this in a group, we have template sheets for writing on available.",
        custom: {},
      },
      embodiedSentenceGeneration: {
        title: "Embodied Sentence Generation",
        description:
          "In this lesson you play the role of AI, generating sentences from the top words in a dataset",
        whatYouNeed: "Nothing :)",
        learningGoals:
          "<ul><li>Understand through embodiment the difference between random and probability driven generation</li><li>Experience the limitations and biases a dataset provides firsthand</li><li>Get an introduction to word clouds and stop words</li></ul>",
        intro:
          "Here we use a dataset to experience some of how computers generate text. However, you can also choose to follow along practically - just write some sentences on paper and cut it up into words.<br><br>It might be interesting to try this twice, with datasets of different biases, to see how different the experience is.<br><br>To start, select a dataset below (you can use it as an example if following along practically).",
        learningOutcomes:
          "Hopefully after completing this lesson you: <ul><li>Have seen the effects of dataset on generation output</li><li>Have seen the impact of a random choice and a greedy choice from a dataset</li><li>Have learned what a stop word is and why they are useful</li></ul>",
        readMore:
          'An overview on bias in AI is available here: <a href="http://text-processing.com/demo/stem/</a>https://glair.ai/post/bias-in-natural-language-processing-nlp" target="_blank">https://glair.ai/post/bias-in-natural-language-processing-nlp</a>',
        custom: {
          randomWordGen:
            "Below we will randomly choose 5 words from the selected dataset. If you imagine the dataset cut up into words in front of you, this is like randomly picking up 5 of them. Once you have the 5 words, write down the first sentence that comes to mind which uses all of the words. e.g. [apple, doctor, john, the, happy] -> 'John the doctor is happy eating an apple'. For a big challenge, try to keep them in the order they were picked!",
          repeat:
            "You can repeat this as many times as you like, and see how different the sentences are each time.",
          stopwordsExplained:
            "We know that the most popular words in text are probably 'the', 'and', 'is', 'in', etc. These are called 'stop words', and they don't tell us much about the meaning of the text, and really clog the word cloud. Therefore, we can filter them out from our word cloud to get a better idea of what the dataset is about. In the physical pile of words, this would be like going through and taking out the uninteresting ones. You can choose a stop words list to use on our word cloud using the dropdown below, then the word cloud and most common words above will update.",
          wordCloud:
            "Below we've represented the dataset as a word cloud. With a pile of cut up words, this would be similar to arranging them all face up on the table in front of you.",
          topWords:
            "Below are the 5 most common words in the dataset you selected. You could achieve this by counting the words in the pile in front of you, and then picking out the most common ones. This would be time consuming even with 10 sentences, but computers can process thousands of sentences in a second. Because we're taking the 5 biggest words, this is typically called a \"greedy\" approach. While the words changed every time when we randomly pulled, here they will be the same every time. Try and repeat the process of creating a sentence using these words from before. Hopefully, it's a more accurate representation of the dataset, however - we can only do this once.",
          bias: "Now that you've written down a few sentences, it's worth thinking about how the dataset you selected affected the sentences you created. While your understanding of language was responsible for stitching these sentences together, like an AI has a general understanding of language, the probabilities of the words we picked came from the dataset, and therefore likely impacted what you would say. If you're not sure, try and repeat the process, but use a new dataset with a different theme. This is similar to how AI's can be biased by the datasets they are trained on, unintentionally leaning towards the opinions or themes of the dataset.",
        },
      },
      textGeneration: {
        title: "Word Cloud & Text generation",
        description:
          "In this lesson we explore how datasets can be summarised with word clouds, how a computer can generate text using a dataset, and how language models balance creativity and truthfulness.",
        whatYouNeed: "Nothing :)",
        learningGoals:
          "<ul><li>Learn about what stemming and stop words are, and how we can understand text using word clouds.</li><li>Explore how text can be generated by computers, with different methods.</li><li>Get an intuition for how randomness plays into good (and unreliable) text generation.</li></ul>",
        intro:
          "How do computers generate text? How can they understand it's meaning? In this lesson we use word clouds to visualise a dataset, and then generate text using it. We'll see how computers can generate text that's creative, but also how they can get it wrong.<br><br>To get started, pick or create a dataset to work with.",
        learningOutcomes:
          "Hopefully after completing this lesson you: <ul><li>Understand what stemming and stop words are, and how they can be used in text processing.</li><li>Have a better understanding of how computers can generate text, and how they can be creative, but also unreliable.</li><li>You should also have a better understanding of how randomness plays into text generation, and how it can be used to make text generation more creative.</li></ul>",
        readMore:
          'You can try out a stemmer directly here: <a href="http://text-processing.com/demo/stem/" target="_blank">http://text-processing.com/demo/stem/</a><br><br>A nice explainer video on ngrams is available here: <a href="https://www.youtube.com/watch?v=E_mN90TYnlg" target="_blank">https://www.youtube.com/watch?v=E_mN90TYnlg</a>',
        custom: {
          wordCloudBelow:
            "Below you can see a word cloud generated from the dataset you selected. The size of the words represents how often they appear in the dataset. Already from this, computers can start to understand what the dataset is about, and what the most important words are. For example, if we're trying to tell if a dataset is about animals, we might look for words like 'dog', 'cat', 'bird', being used multiple times. Through this technique, which a computer instead records as words and the number of times they appear, a computer can better understand what a dataset is about.",
          stemmingExplained:
            "In a word cloud, we probably want the words 'love','loved' and 'loves' to count as 'love'. Luckily, through a set of rules called 'stemming', which cuts a word down to its root, we can do this. This improves the accuracy of the word cloud, and you can choose a stemming method to use on our word cloud using the dropdown if you like.",
          stopwordsExplained:
            "We know that the most popular words in text are probably 'the', 'and', 'is', 'in', etc. These are called 'stop words', and they don't tell us much about the meaning of the text, and really clog the word cloud. Therefore, we can filter them out from our word cloud to get a better idea of what the dataset is about. You can choose a stop words list to use on our word cloud using the dropdown below.",
          positionalGeneration:
            "One of the simplest ways to start to generate text is to take the most common first word across the dataset, then the most common second word, then third, and so on. You can click generate below to see how it looks for this dataset, and the how button shows the words which were at position 0, 1, 2 (computers actually start counting at 0) and so on.",
          nGramGeneration:
            "While positional generation is simple, as we get further into the text, stop words become the most likely, and the text often starts to make less sense. Also, if we see 'Ready, steady,' in a text, we always know 'go' is coming next, no matter what position in the sentence it is. Therefore, it's useful to think of words in groups called n-grams. An n-gram is n-words that appeared one after another. So, if we had a 2-gram of 'Ready, steady', we could predict 'go' is the most likely next word. Below we will do n-grams on the dataset you selected, and you can experiment with different sizes to see how it changes the output. When you've done that, you can also decide how you want to choose what the next word is. When we take the most likely word, we call that a 'greedy' approach. This is effective, but can lead to unoriginal text. Therefore, adding randomness, either by randomly choosing a word or choosing one according to probability weights (imagine spinning the pie chart), we can make it easier to get an original sentence, which isn't always the same. In language models, how much randomness there is in a model is called the 'temperature'.",
        },
      },
    },
  },
  da: {
    maskinrummet: "Maskinrummet",
    home: "Hjem",
    about: "Om",
    contact: "Kontakt",
    luke: "Luke Connelly",
    student: "Computervidenskab kandidatstuderende på Aarhus Universitet",
    phoneNumber: "+45 93 87 34 09",
    email: "lukejconnelly1{'@'}gmail.com",
    aboutLuke:
      "Kontakt mig venligst med forslag, spørgsmål eller feedback! Jeg vil meget gerne høre fra dig!",
    thanks:
      "Tak til Magnus, Karl-Emil, Susanne, Line, og især lærerne og forskningsdeltagerne, der har arbejdet sammen med os for at skabe denne hjemmeside",
    language: "Sprog",
    currLanguage: "Dansk",
    error404: "Siden blev ikke fundet",
    availableActivities: "Tilgængelige aktiviteter",
    suggestActivity: "Foreslå en aktivitet",
    currentActivity: "Nuværende aktivitet",
    title: "Titel",
    modality: "Modalitet",
    subject: "Emne",
    age: "Alder",
    duration: "Varighed",
    topics: "Emner",
    textCleaning: "Tekstrensning",
    digital: "Digital",
    anySubject: "Ethvert emne",
    mins: "min",
    tokenisation: "Tokenisering",
    practical: "Praktisk",
    selectTopics: "Vælg emner",
    activityNotFound: "Aktiviteten blev ikke fundet",
    whatYouNeed: "Hvad du skal bruge til denne aktivitet",
    learningGoals: "Læringsmål",
    intro: "Introduktion",
    howTo: "Sådan bruges siden",
    longSentence: "Denne sætning er lidt for lang, prøv en kortere!",
    emptySentence: "Du skal skrive noget i boksen!",
    back: "Tilbage",
    next: "Næste",
    finishLesson: "Afslut lektionen",
    congrats: "Tillykke!",
    youCompleted: "Du har gennemført lektionen.",
    learningOutcomes: "Læringsresultater",
    seeMore: "Se mere",
    splitting: "Opdeling i ord",
    lowercasing: "Gør småt",
    cleaning: "Rensning af tegnsætning",
    sentenceInputTitle: "Indtast en sætning",
    yourSentence: "Din sætning",
    submit: "Indsend",
    gotSentence: "Modtaget sætning:",
    seeComputer: "Skift alt til computer-visning",
    seeHuman: "Skift alt til menneske-visning",
    autoClick: "Auto-klik alle",
    helpUs:
      "Hjælp os med forslag; deling; bidrag til vores GitHub; og støt videnskaben i dit lokalsamfund",
    ourProject: "Vores projekt",
    aboutOurProject:
      "Tekstbehandling, tekst-AI og chatbots er blevet utroligt populære, men vi ser mangel på uddannelsesværktøjer og ressourcer til at lære om, hvordan de fungerer. Vi mener, at samfundets brede indflydelse af disse teknologier kræver, at alle får mulighed for at lære. Derfor udviklede vi denne hjemmeside gennem konsultation med lærere, som en ressource til at udvikle forståelse og kritisk tænkning gennem enkle og anvendelige aktiviteter.",
    compEmpowerment: "Computational Empowerment",
    aboutCompEmpowerment:
      "Computational empowerment er en tilgang og et Participatory Design-svar på udfordringer relateret til det voksende behov for digital læsefærdighed i mellemskolen. Tilgangen udvider det nuværende fokus på computational thinking for at inkludere en bekymring for, hvordan børn og unge styrkes gennem konstruktivt, analytisk og kritisk engagement med teknologi. [Dindler, C., Smith, R. C., & Iversen, O. S. (2020). Computational Empowerment: participatory design in education. CoDesign: International Journal of CoCreation in Design and the Arts, 16(1), 66-80. https://doi.org/10.1080/15710882.2020.1722173]",
    futureWork: "Fremtidigt arbejde",
    aboutFutureWork: "Skal besluttes...",
    activities: {
      textCleaning: {
        title: "Tekstrensning",
        description:
          "I denne lektion undersøger vi, hvordan tekster kan renses til ord for behandling i tekst-AI.",
        whatYouNeed: "Ingenting :)",
        learningGoals:
          "Forstå, hvordan tekst kan 'renses' til ord for behandling. Få en introduktion til tokenisering.",
        intro:
          "Hvordan behandler vi et stykke tekst? Det er et mere komplekst spørgsmål, end det ser ud ved første øjekast, da tekst repræsenteres i computere som 'strenge' af tegn og som tal. Selvom vi kan se, at ordene 'hej', 'HEJ', og 'Hej!' betyder det samme, er de meget forskellige for en computer. Lad os starte med at forsøge at bryde en tekst op i ord.",
        learningOutcomes:
          "Forhåbentlig forstår du efter at have gennemført denne lektion, hvad tokenisering er, og hvordan det kan bruges i tekstbehandling. Du bør også have en bedre forståelse af, hvordan computere behandler tekst som 'strenge' af tegn, og hvordan dette gør den 'betydning', der er indlysende for os mennesker, meget mere udfordrende for en computer.",
        readMore:
          "Du kan se præcis, hvordan ChatGPT og OpenAI's GPT-modeller ville tokenisere tekst her: https://platform.openai.com/tokenizer. Hvis du er interesseret i at lære mere om tokenisering, kan du læse mere om det her: https://www.datacamp.com/blog/what-is-tokenization",
        custom: {
          howComputersSee:
            "Nedenfor kan du se, hvordan din computer ser din sætning. Du kan svæve over tegnene/koderne eller bruge knapperne til at afsløre den oprindelige tekst.",
          characterCodesExplained:
            "Hvert tegn (herunder bogstaver, tal og tegnsætning), som en computer ser, repræsenteres af et tal kaldet et tegnkode. For eksempel repræsenteres bogstavet 'a' af nummer 97, 'b'=98, 'c'=99, og så videre.",
          splitSentenceUsingSpaceBelow:
            "Så hvis vi vil få ord ud af vores tekst, skal vi først forstå, hvilke tegnkoder der udgør ord, og hvilke der ikke gør. En almindelig måde er at starte med at splitte strenge af tegn ved at bruge mellemrum, repræsenteret ved tegnkode 32. Klik på dem for at fjerne dem fra din sætning.",
          lowercaseSentenceBelow:
            "Nu har vi noget, der begynder at ligne individuelle ord. Men hvis nogen indsendte ordet 'HELLO', og en anden indsendte 'hello', ville computeren se disse som to helt forskellige sæt tal, selvom vi måske ville betragte dem som det samme ord. En måde at håndtere dette på er at konvertere alle tegn til små bogstaver. Klik på de store bogstaver nedenfor for at gøre dette.",
          removePuncBelow:
            "Nu ser vores ord rigtige ud, men tegnsætning kan stadig forårsage problemer. For eksempel er 'hello' og 'hello!' stadig forskellige ord for en computer. Nogle gange er det fint at fjerne tegnsætning, men vi har måske også brug for det for at forstå ordenes betydning. For eksempel er sætningen 'Lad os spise, mormor!' meget forskellig fra 'Lad os spise mormor!' For at håndtere dette vil vi beholde tegnsætningen, men markere den som ikke en del af de individuelle ord. Klik nedenfor for at markere tegnsætningen og afslutte rensning af din streng.",
          introToTokenisation:
            "Godt gået! Du har nu renset din tekst til ord og tegnsætning. Denne proces kaldes 'tokenisering', hvor vi omdanner tekster til lister over 'tokens', som bidrager til tekstens betydning. Dette er en central del, og normalt det første skridt, i tekstbehandling med AI. Selvom vores metode var ret effektiv, var der nogle forenklinger for at gøre processen nemmere. For eksempel ville ordet 'don't' blive opdelt i 'don' og 't', på grund af tegnsætningen, mens vi nok ville behandle det som ét ord eller som 'do' og 'not'. Derfor er den sædvanlige metode at bruge 'Machine Learning' på et stort datasæt for at lade tekstbehandlings-AI'er lære, hvordan ord bedst opdeles.",
        },
      },
      textCleaningPaper: {
        title: "Tekstrensning med papir",
        description:
          "I denne lektion undersøger vi, hvordan tekster kan renses til ord for behandling ved brug af papir.",
        whatYouNeed:
          "Noget papir og en kuglepen. Hvis du kører dette i en gruppe, har vi skabeloner tilgængelige.",
      },
    },
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
