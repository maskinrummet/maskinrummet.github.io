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
    welcome: "Welcome to the Engine Room!",
    welcomeText:
      'This is an educational resource designed at Aarhus University to teach how text processing and AI systems work<br><br>Teachers: we hope you can use the site in your classroom - our activities allow students to get hands-on with data and AI<br><br>Please <a href="/#/en/contact">get in contact</a> with suggestions, questions, or feedback! I would love to hear it!<br><br>Below you\'ll find a list of our activities, and if you\'d like more on how to use the site or inspiration, check out our <a href="/#/en/how-to">how to use the site video</a>',
    aboutLuke:
      "Please get in contact with me with suggestions, questions, or feedback! I would love to hear it!",
    thanks:
      "With thanks to Magnus, Karl-Emil, Susanne, Line, and especially the teachers and research participants who have worked together with us to create this site",
    language: "Language",
    currLanguage: "English",
    activity: "Activity",
    error404: "Page not found",
    availableActivities: "Guided activities",
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
    anySubject: "Flexible",
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
    howTo: "How to",
    howToUseTheSite: "How to use the site",
    videoOnHowTo:
      "Watch the video above to get an introduction to our site and how to use it personally or as part of a classroom activity",
    longSentence: "That sentence is a bit too long, try a shorter one!",
    emptySentence: "You need to write something in the box!",
    back: "Back",
    next: "Next",
    finishLesson: "Finish lesson",
    niceWork: "Nice work! Let's continue to the next step",
    congrats: "Congratulations!",
    youCompleted: "You have completed the lesson :)",
    learningOutcomes: "Learning outcomes",
    seeMore: "See more",
    splitting: "Splitting into words",
    lowercasing: "Lowercasing",
    cleaning: "Cleaning punctuation",
    sentenceInputTitle: "Input a sentence",
    yourSentence: "Your sentence",
    submit: "Submit",
    gotSentence: "Received the sentence:",
    seeComputer: "Change all to computer view",
    seeHuman: "Change all to human view",
    autoClick: "Auto click all",
    helpUs:
      "Help us out with suggestions; sharing; contributing to our GitHub; and supporting science in your community",
    ourProject: "Our Project",
    aboutOurProject:
      "Text processing, text AI, and chatbots have become incredibly popular, however, we see a lack of educational tools and resources for learning about how they work. We believe the society-wide impact of these technologies requires everyone to be afforded the opportunity to learn. Therefore we developed this website through consultation with teachers, as a resource for developing understanding and critical thinking skills, through simple and applicable activities.",
    compEmpowerment: "Computational Empowerment",
    aboutCompEmpowerment:
      "Computational empowerment is an approach and a Participatory Design response to challenges related to the emerging need for digital literacy in lower secondary education. The approach extends the current focus on computational thinking to include a concern for how children and youth are empowered through constructive, analytical and critical engagement with technology. [Dindler, C., Smith, R. C., & Iversen, O. S. (2020). Computational Empowerment: participatory design in education. CoDesign: International Journal of CoCreation in Design and the Arts, 16(1), 66-80. https://doi.org/10.1080/15710882.2020.1722173]",
    futureWork: "Future Work",
    aboutFutureWork: "To be decided...",
    textGeneration: "Text generation",
    textGenerationExplained:
      "Text generation is the process of creating text, often accomplished in e.g. ChatGPT with the use of AI.",
    createANewDatasetIntro:
      "Here you can create a new dataset for use on the site. You can provide all the text, or make it open for others to contribute to. You can change this, or add/delete to the dataset at any time.<br><br>Each dataset has a password, which you can share with anyone who you'd also like to be able to edit it.<br><br><b>NOTE:</b> This is not a secure app, use silly passwords which you wouldn't mind being publicly available online.<br><br>In summary, datasets are:<ul><li>Editable</li><li>Deleteable</li><li>Password protected</li><li>Publicly visible</li></ul>",
    datasetName: "Dataset name",
    datasetPassword: "Dataset password",
    confirmDatasetPassword: "Confirm dataset password",
    openDataset: "Open dataset for others to contribute?",
    open: "Open",
    closed: "Closed",
    startEmptyDataset: "Start with an empty dataset?",
    startingSentences:
      "Sentences which the dataset will start with: (You can always add more or delete later)",
    useModalBelow: "Use the inputs below to add some sentences to the dataset",
    text: "Text",
    action: "Action",
    delete: "Delete",
    selectSplitter: "Select how the text above should be split in the dataset",
    newline: "Newline",
    period: "Full stop",
    comma: "Comma",
    inputSentence: "Input sentence",
    inputText: "Input text",
    sentence: "Sentence",
    tooLong: "Too long!",
    areYouSureDelete:
      "Are you sure you want to delete the entire dataset permanently?",
    add: "Add",
    createDataset: "Create Dataset",
    emptyDatasetName: "You need to provide a dataset name",
    longDatasetName: "The dataset name is too long (max 50 characters)",
    emptyPassword: "You need to provide a password for the dataset",
    longPassword: "The password is too long",
    passwordMismatch: "The passwords do not match",
    emptyStartingSentences:
      "This would create an empty dataset, you need to provide some starting sentences or uncheck the box above",
    emptySentences: "Sentences may not be empty",
    longSentences: "Sentences may not be more than 250 characters",
    emptyDataset: "This dataset is currently empty",
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
    datasetSelectionExplanation:
      "In this activity we will use a dataset to generate and summarise text. You can create your own dataset, create a dataset which others can contribute to, or use one of the available datasets.",
    inputTexts: "Input Sentences",
    deleteDataset: "Delete Dataset",
    refreshDataset: "Get new changes",
    saveChanges: "Save changes",
    openForInput: "Open for input",
    closedForInput: "Closed for input",
    editDataset: "Edit dataset",
    generate: "Generate",
    how: "How?",
    position: "Position",
    previous: "Previous",
    othersWith: "Others with",
    occurences: "occurences",
    wordCloud: "Word Cloud",
    wordCloudExplained:
      'In a word cloud, the more times a word appears, the larger it is shown. Using a word cloud, computers can start to understand what the dataset is about, and what the most important words are. For example, if we\'re trying to tell if a dataset is about animals, we might look for words like "dog", "cat", "bird", being used multiple times. Through this technique, which a computer instead records as words and the number of times they appear, a computer can better understand what a dataset is about.',
    positionalTextGeneration: "Positional Text Generation",
    nGramsGeneration: "N-grams Text Generation",
    windowSize: "N-gram size",
    startToken: "[START]",
    endToken: "[END]",
    maxSentenceLength: "Maximum allowed length",
    doNoStemming: "Perform no stemming",
    doNoStopwords: "Filter no stopwords",
    stemming: "Stemming",
    stemmingExample:
      "<b>lov<span style='color: red'>e</span><br/>lov<span style='color: red'>ing</span><br/>lov<span style='color: red'>ed</span><hr/>lov-",
    stopwords: "Stopwords",
    stopwordsExample:
      "<b>Denmark <span style='color: red'>is a</span> Nordic country <span style='color: red'>in the</span> south-central portion <span style='color: red'>of</span> Northern Europe <span style='color: red'>with a</span> population <span style='color: red'>of</span> nearly 6 million</b>",
    english: "English",
    danish: "Danish",
    french: "French",
    german: "German",
    spanish: "Spanish",
    italian: "Italian",
    dutch: "Dutch",
    portuguese: "Portuguese",
    swedish: "Swedish",
    norwegian: "Norwegian",
    selectMethod: "Select method",
    randomness: "Randomness",
    randomnessExplained:
      "Greedy, weighted random, and random are three options for how we can make our choice of word more or less random.",
    greedyExplained:
      "When we make a greedy choice, we choose whatever has the highest probability/slice in the pie chart, and therefore the selection is not random (doing it multiple times will result in the same choice).",
    weightedRandomExplained:
      "By using weighted random, we choose randomly based on the probabilities (imagine spinning the pie chart for each choice).",
    randomExplained:
      "In random, we select randomly based on all the options, ignoring the probabilities.",
    whatIsTemperature:
      "In large language models, they don't use these exact ways of choosing, but the amount of randomness the model uses is called: Temperature",
    chooseWord: "Select word",
    clear: "Clear",
    ngrams: "N-grams",
    leastLikely: "Less Likely",
    mostLikely: "More Likely",
    greedy: "Greedy",
    random: "Random",
    weightedRandom: "Weighted Random",
    datasetBias: "Dataset Bias",
    randomWords: "Random words",
    mostCommonWords: "Most common words",
    generateRandomWords: "Generate random words",
    either: "Either",
    sentences: "Sentences",
    wordFrequency: "Word frequency",
    bagOfWords: "Bag of Words",
    originalText: "This is a new sentence not present in the dataset",
    unoriginalText: "This is a sentence already in the dataset",
    noSearchResults: "No results",
    emptyDropdown: "No options available",
    datasetBiasExplained:
      "Dataset bias is when a dataset is skewed towards certain topics, words, or phrases, which can lead to unfair choices or incorrect outputs from an AI trained on the dataset.",
    singularActivitiesHeading: "Unguided Activities",
    minWordCloudOccurences:
      "Minimum antal forekomster i teksten for at være vist i ordskyen (brug dette til store, langsomme datasæt)",
    customFilterWords: "Words to exclude from being shown in the word cloud",
    printOrSave: "Print or save as PDF",
    fontSize: "Font size",
    numColumns: "Number of columns",
    numRows: "Number of rows per table",
    minOccurences:
      "Minimum number of times a word should appear to be included",
    hourOfAI: {
      hourOfAITitle: "Build your own language model from paper",
      ages: "Ages 10-16",
      teachingPoint: "Teaching points",
      acks: "including links to the CSEdWeek and HourofAI.org websites, that says the following: The Hour of AI is a global campaign from CSforALL, in collaboration with Code.org.",
      questions: "Questions",
      intro:
        "<b>Invite your students to build their own sentence generator from paper. Students get a hands-on experience seeing how text becomes data and how this data becomes an AI model. Through this, they should learn that AI systems use data to make decisions or predictions [AI Big Ideas TODO], in this case by generating text</b><br><br>In this lesson the students start by writing sentences about themselves, in groups collect their sentences to datasets, and from these datasets create a simple sentence generation model. This is a very open exercise, where you can let the students explore and reflect on the steps independently, and we also provide some reflection questions to help you structure some reflections on how computers can generate text. With this lesson we aim to give them a hands-on experience and sense that they can be part of creating technology like text generation systems, through a simple paper-based example. A lesson plan summarising the content on this page is available here: [TODO], or alternatively you can print this page.",
      whatYouNeed:
        "TODOTechnically, you can do this exercise with only blank pieces of paper! But, we have provided a template for the students to write their sentences on (so that it's easier to rip it into words) [Print one per 10 students]; and a template for paper pie charts to visualise their dataset in the optional step 6 [Print one per group].",
      step: "Step",
      learningOutcomes:
        "At the end of this lesson, students should be able to reflect on how text can become data (ripping it, creating piles), and how this data can be used to create models which can generate/predict new data. It may be that they understand language models as probabilistic systems, which do not generate *the* answer, but randomly generate *an* answer based on existing input and data.",
      steps: [
        {
          text: "Each student writes a four-word sentence about themselves on a piece of paper. If using the template [TODO], students should write the first word in the red box.",
          teachingPoint:
            "The later steps where we create a model based on this data, in our experience, work best if the sentences end up quite similar, so we ideally want them to be simply structured and using similar words. This happens somewhat automatically when we ask them to write about themselves (the majority write I as the first word and follow this with a verb such as love). You can also further influence the similarities of the sentences, by giving examples: 'I love playing football' and 'I like to swim', or you could specify that the stucture should be <noun> <verb> <adjective> <noun>, but this is not necessary.",
          questions: "",
          imageLink: "images/write-slip.jpg",
        },
        {
          text: "The sentence should be ripped into individual words.",
          teachingPoint: "",
          questions:
            "<ul><li>Could a computer split words up like the students can? Usually we train a model to figure this out, but a simple method can be to split sentences by spaces and punctuation.</li><li>What makes something a word? Should “football” be ripped into two words or is it one? This can be interesting to discuss for language teachers, as it hits something fundamental in syntax and word origins and can be different in different languages.</li></ul>",
          imageLink: "images/ripped-slip.jpg",
        },
        {
          text: "Students work in groups of three or more to create “word piles”: all first words in one pile, all second words in another, and so on. Students should then analyse these piles for patterns, such as common words, unique words, and structures in the sentences. Sample reflection questions are provided below",
          teachingPoint:
            "4-5 students is an ideal group size. If the groups are smaller, students can also write multiple sentences so that there are still 4-5 sentences in their group.<br> Here we want to encourage the students to look for patterns and be curious, there are no wrong answers! ",
          questions:
            "<ul><li>What is the most common word? This is most likely 'I' based on the task, but there can also be common verbs or prepositions</li><li>Could someone put the sentences back together if they wanted to? This is a key point, something has been lost in the process of ripping the sentences up, so we often can't know how to put the sentences back together (if we ignore handwriting)</li><li>Are there patterns in the piles? For example, we might expect verbs in the second pile, and some mix of nouns, activities, and prepositions in the third and fourth</li><li>Would we know this is people saying something about themselves? Often the answer is yes, as there are words like names, I, and descriptive words or hobbies</li><li>Are these sentences using positive or negative words? Hopefully we get happy sentences, but again we might make the point that this can be tough to know, because we have lost some of the context (e.g. 'I am not happy' would give us the very positive word 'happy' but we don't know it was followed by NOT</li></ul>",
          imageLink: "images/pooled-slip.jpg",
        },
        {
          text: 'Students can draw one word from each pile randomly to "generate" a new sentence, considering whether these combinations make sense and how probable they are.',
          teachingPoint: "TODO",
          questions: "",
          imageLink: "images/pool-generation.jpg",
        },
        {
          text: 'Optionally, each pile can be visualised with a pie chart, which can be spun like a "wheel of fortune" sequentially to generate a new sentence',
          teachingPoint:
            "There is a printout available so that the students can draw and create their own pie charts, and we really recommend this [Printout2_ProbabilityWheels.pdf]. To “spin” the pie charts, we typically put a paper clip in the centre, hold it still with a pen, and flick it so that it spins around. You can also just spin them on a table or use a thumbtack.",
          questions: "",
          imageLink: "images/pies.jpg",
        },
        {
          text: "Using either the text generation method from step 5 (pulling a random word) or step 6 (spinning the pie charts) students should generate and write down 5-10 new sentences. Finally, the groups can reflect on their personal small language model",
          teachingPoint:
            "Sample questions are provided below. In general, we want to engage them as designers - what is good. Is a model with one word per position good because it will always make sense? Or is a good model interesting, even though it means sometimes it may not make complete sense?",
          questions:
            "When will this model work well? (luck and probability, data quality)<br>How could we improve this model? (more data? rules?)<br>Could this generate a sentence about you? How could you use it?",
          imageLink: "images/spinning-wheels.jpg",
        },
        {
          text: "[Optional extensions] Redesigning new, better piles/pie charts or making a model for a specific purpose:",
          teachingPoint:
            "Here is an example of our “once upon a billion” model which is an extension of this concept. With 9 wheels of 10 words, there are a billion possible stories to be generated here.",
          questions: "",
          imageLink: "images/once-upon-a-billion.jpg",
        },
      ],
    },
    singularActivities: {
      wordCloud: {
        title: "Word Cloud",
      },
      ngramTextGen: {
        title: "N-gram Text Generation",
      },
      positionalTextGen: {
        title: "Positional Text Generation",
      },
      bagOfWordsPrintout: {
        title: "Bag of Words printout",
        custom: {
          printForCutting: "Print for easy cutting",
          printAsPage: "Print as a handout",
          cuttingGuide:
            "<h1>Bag of Words cutting guide:</h1><h3>Folds:</h3><ul><li><strong>Red Line:</strong> Fold the paper carefully along the red line marked (1). The more neat this fold, the better the cutting will be at the end</li><li><strong>Blue Line:</strong> Fold along the blue line marked (2) next</li><li><strong>Green Line:</strong> Fold along the green line marked (3), so that you can see the coloured table facing you for the next step</li></ul><h3>Cutting:</h3><ul><li><strong>Purple Lines:</strong> Cut along the purple lines <em>all the way to the edges</em> of the paper, to remove the margin from the bottom and left edges.</li><li><strong>Orange Lines:</strong> Cut along the orange lines, but <em>do not cut all the way through to the edge</em>. Stop just at the margin, to make the next step easier</li><li><strong>Yellow Lines:</strong> Cut along the yellow lines, you do not need to cut out any blank boxes - they will all be empty. You should end with neat, same-size words to make your bag of words :)</li></ul>",
        },
      },
    },
    activities: {
      textCleaning: {
        title: "How can text be turned into words?",
        description:
          'In this lesson we explore how texts can be "cleaned" into words for processing in text AI.',
        whatYouNeed: "Nothing :)",
        learningGoals:
          '<ul><li>Understand how computers "see" text</li><li>Understand how text can be "cleaned" into words for processing</li><li>Get an introduction to tokenisation</li></ul>',
        intro:
          'How do we process a piece of text? It\'s a more difficult question than it seems at first as text is represented in computers as "strings" of characters, which are themselves represented as numbers. Therefore while we can see the words "hello", "HELLO", and \'Hello!\' all mean the same thing, they are very different to a computer.<br><br>To start with, let\'s focus on trying to break up a piece of text into words.',
        learningOutcomes:
          'Hopefully after completing this lesson you:<ul><li>Understand what tokenisation is and how it might be used in text processing</li><li>Have a better understanding of how computers process text as "strings" of characters</li><li>How this means the "meaning" of text that\'s obvious to us people can be much more difficult for a computer</li></ul>',
        readMore:
          'You can see exactly how ChatGPT and OpenAI\'s GPT models would tokenise text here: <a href="https://platform.openai.com/tokenizer" target="_blank">https://platform.openai.com/tokenizer</a><br><br>If you\'re interested in learning more about tokenisation, you can read more about it here: <a href="https://www.datacamp.com/blog/what-is-tokenization" target="_blank">https://www.datacamp.com/blog/what-is-tokenization</a>',
        custom: {
          howComputersSee:
            "Below you can see how your computer sees your sentence. You can hover on the characters/codes or use the buttons to reveal the original text.",
          characterCodesExplained:
            'Each character (this includes letters, numbers, and punctuation) a computer sees is represented by a number called a character code. For example, the letter "a" is represented by the number 97, "b"=98, "c"=99, and so on.',
          splitSentenceUsingSpaceBelow:
            "So, if we want to get words out of our text, we first need a way to understand which character codes are parts of words, and which aren't. One common way is to start by splitting the strings of characters using spaces, represented by character code 32. Click these to remove them from your sentence.",
          lowercaseSentenceBelow:
            'Now we have something that starts to look like individual words. But, if someone submitted the word "HELLO" and another person submitted "hello", the computer would see these as two completely different sets of numbers, when we humans would probably want to treat them as the same word. One way to solve this is to convert all the characters to lowercase. Click the uppercase characters below to do this.',
          removePuncBelow:
            'Now our words look right, but punctuation can still cause problems. For example, "hello" and "hello!" are still different words to a computer. Sometimes it can be fine to remove the punctuation, but we might also need the punctuation to understand sentences. For example, the sentence "Let\'s eat, Grandma!" is very different from "Let\'s eat Grandma!". Therefore, to handle this we will keep the punctuation, but mark it as not part of the individual words. Click below to mark punctuation and finish cleaning your string.',
          introToTokenisation:
            'Great job! You\'ve now cleaned your text into words and punctuation. This process is called "tokenisation", where we turn texts into lists of "tokens" which contribute to the meaning of the text. This is a key part, and usually the first step, for text processing in AI. While ours was reasonably effective, there were a few simplifications to make things easier. For example, the word "don\'t" would be split into the words "don" and "t", because of the punctuation, when we would probably want to treat it as one word or "do" and "not". Therefore, the usual way of doing tokenisation on a text is to use "Machine Learning" on a big dataset to allow text processing AIs to automatically learn the patterns of how words are split up.',
        },
      },
      embodiedSentenceGeneration: {
        title: "[Embodied] How can I generate text?",
        description:
          "In this lesson you play the role of AI, generating sentences from the top words in a dataset, to gain insight into how text generation works firsthand.",
        whatYouNeed: "Nothing :)",
        learningGoals:
          "<ul><li>Understand through embodiment the difference between random and probability driven generation</li><li>Experience the limitations and biases a dataset provides firsthand</li><li>Get an introduction to word clouds and stop words</li></ul>",
        intro:
          "Here we use a dataset to experience some of how computers generate text. However, you can also choose to follow along practically - just write some sentences on paper and cut it up into words.<br><br>It might be interesting to try this twice, with datasets of different biases, to see how different the experience is.<br><br>To start, select a dataset below (you can use it as an example if following along practically).",
        learningOutcomes:
          "Hopefully after completing this lesson you: <ul><li>Have seen the effects of dataset on generation output</li><li>Have seen the impact of a random choice and a greedy choice from a dataset</li><li>Have learned what a stop word is and why they are useful</li></ul>",
        readMore:
          'A video from Google explaining bias in machine learning is available here: <a href="https://www.youtube.com/watch?v=59bMh59JQDo" target="_blank">https://www.youtube.com/watch?v=59bMh59JQDo</a><br><br>And an example looking at text-to-image generation can be found here: <a href="https://www.microsoft.com/en-us/research/blog/understanding-social-biases-through-the-text-to-image-generation-lens/" target="_blank">https://www.microsoft.com/en-us/research/blog/understanding-social-biases-through-the-text-to-image-generation-lens/</a>',
        custom: {
          randomWordGen:
            'Below we will randomly choose 5 words from the selected dataset. If you imagine the dataset cut up into words in front of you, this is like randomly picking up 5 of them.<br><br>Once you have the 5 words, write down the first sentence that comes to mind which uses all of the words:<br>e.g. [apple] [doctor] [john] [the] [happy] => "John the doctor is happy eating an apple"<br><br>For a big challenge, try to keep them in the order they were picked!',
          repeat:
            "You can repeat this as many times as you like, and see how different the sentences are each time.",
          stopwordsExplained:
            'We know that the most popular words in text are probably "the", "and", "is", "in", etc. These are called "stop words", and they don\'t tell us much about the meaning of the text, and really clog the word cloud. Therefore, we can filter them out from our word cloud to get a better idea of what the dataset is about. In the physical pile of words, this would be like going through and taking out the uninteresting ones. You can choose a stop words list to use on our word cloud using the dropdown below, then the word cloud and most common words above will update.',
          wordCloud:
            "Below we've represented the dataset as a word cloud. With a pile of cut up words, this would be similar to arranging them all face up on the table in front of you.",
          topWords:
            "Below are the 5 most common words in the dataset you selected. You could achieve this by counting the words in the pile in front of you, and then picking out the most common ones. This would be time consuming even with 10 sentences, but computers can process thousands of sentences in a second. Because we're taking the 5 biggest words, this is typically called a \"greedy\" approach. While the words changed every time when we randomly selected them, here they will be the same every time. Try and repeat the process of creating a sentence using these words from before. Hopefully, it's a more accurate representation of the dataset, however - we can only do this once.",
          bias: "Now that you've written down a few sentences, it's worth thinking about how the dataset you selected affected the sentences you created. While your understanding of language was responsible for stitching these sentences together, like an AI has a general understanding of language, the probabilities of the words we picked came from the dataset, and therefore likely impacted what you would say. If you're not sure, try and repeat the process, but use a new dataset with a different theme. This is similar to how AI's can be biased by the datasets they are trained on, unintentionally leaning towards the opinions or themes of the dataset.",
        },
      },
      textGeneration: {
        title: "How can a computer understand and generate text?",
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
          'You can try out a stemmer directly here: <a href="http://text-processing.com/demo/stem/" target="_blank">http://text-processing.com/demo/stem/</a><br><br>A nice explainer video on N-grams is available here: <a href="https://www.youtube.com/watch?v=E_mN90TYnlg" target="_blank">https://www.youtube.com/watch?v=E_mN90TYnlg</a>',
        custom: {
          wordCloudBelow:
            "Below you can see a word cloud generated from the dataset you selected",
          stemmingExplained:
            'In a word cloud, we probably want the words "love","loved" and "loving" to count as "lov-". Luckily, through a set of rules called "stemming", which cuts a word down to its root, we can do this. This improves the accuracy of the word cloud, and you can choose a stemming method to use on our word cloud using the dropdown if you like.',
          stopwordsExplained:
            'We know that the most popular words in text are probably "the", "and", "is", "in", etc. These are called "stop words", and they don\'t tell us much about the meaning of the text, and really clog the word cloud. Therefore, we can filter them out from our word cloud to get a better idea of what the dataset is about. You can choose a stop words list to use on our word cloud using the dropdown below.',
          positionalGeneration:
            'One of the simplest ways to start to generate text is to take the most common first word across the dataset, then the most common second word, then third, and so on. You can click generate below to see how it looks for this dataset, and the "how" button shows the words which were at position 1, 2, 3 and so on.',
          positionalTextGenBreakdown:
            "While positional generation works well at the start, you might notice as we get further into the sentence the probabilities and the positions become more messy. Therefore it might make sense to look at which words appear together, rather than when they appear. One way to do this is N-grams: groups of words appearing in the text. Below you can see  your datasets N-grams in a word cloud:",
          topX: "How many of the most common N-grams to show",
          introToSankey:
            'As an example for how N-grams helps us generate text, if we see the 2-gram "Ready, steady," in a text, we know "go" will probably come next, no matter if that\'s position 1, 2, 3 or 5, 6, 7 or even 112, 113, 114. Below you can see the most common N-grams from your dataset, and the words which appeared after them.',
          nGramGeneration:
            "Below we will use N-grams for text generation on your dataset, and you can experiment with different Ns and randomness to see how it changes the output.",
        },
      },
      bagOfWordsPractical: {
        title: "What is text processing?",
        description:
          "In this lesson using paper and scissors, we explore how text can be split into words, processed by a computer, and used to generate new text.",
        whatYouNeed:
          'For this lesson you will need a way to write down sentences and cut them up into words (e.g. paper, scissors, pen). This can be regular paper, but we also provide the following templates:<ul><li>Colour - 12 sentences per page, 10 words per sentence, up to 6 pages (71 sentences) [<a href="/sentence-template.pdf" target="_blank">pdf</a>] [<a href="/sentence-template.docx" target="_blank">docx</a>]</li><li>Inksaver - 12 sentences per page, 10 words per sentence, up to 2 pages (23 sentences) [<a href="/sentence-template-inksaver.pdf" target="_blank">pdf</a>] [<a href="/sentence-template-inksaver.docx" target="_blank">docx</a>]</li></ul>',
        learningGoals:
          "In this lesson we aim to: <ul><li>Understand how text can be processed</li><li>Get an introduction to tokenisation</li><li>Get an introduction to bag of words as a technique for understanding what a text is about</li><li>Start thinking about generating text</li></ul>",
        intro:
          'For this lesson we will learn how computers can understand text and generate new text. To do so, we will need a set of sentences (5 is probably minimum, but more is better and theres no maximum). Before you start, consider having a theme for the sentences e.g. "people introducing themselves" or "opinions on a book you read recently". It\'s not strictly necessary, but it does make the ideas we are teaching more apparent.',
        learningOutcomes:
          "Hopefully at the end of this lesson you:<ul><li>Understand what text processing might look like</li><li>Recognise the word tokenisation</li><li>Have seen and understood the bag of words and its purpose</li><li>Have some ideas as to what makes good (and bad) text generation</li></ul>",
        readMore:
          'You can see exactly how ChatGPT and OpenAI\'s GPT models would tokenise text here: <a href="https://platform.openai.com/tokenizer" target="_blank">https://platform.openai.com/tokenizer</a><br><br>This site will automatically create a bag of words with probabilities based on any text you give it: <a href="https://www.online-utility.org/text/analyzer.jsp" target="_blank">https://www.online-utility.org/text/analyzer.jsp</a>',
        custom: {
          createSentences:
            "To start the activity write each sentece on a seperate line, then cut each sentence into words",
          cuttingAlt: "Example image of someone cutting up their sentence",
          whatIsAWord:
            'At this point, it\'s interesting to consider what makes a word. For example, is "don\'t" one word or two? Is New York a word? What about something like "!"? It\'s a difficult question to answer with rules, and therefore AIs typically split sentences by seeing lots of examples like you have just done, and noticing the patterns. The name for splitting a text up is: tokenisation.',
          wordFreqChart:
            "Now, take all of your words from all of the sentences and arrange them alphabetically on the desk in front of you, as shown below",
          freqAlt: "Example image of a word frequency chart",
          whatFrequencySays:
            'This helps us to see a few things. For one, we now know what words are the most common. This can help us understand what the text is about. For example, if we see "parrot" and "rabbit" a lot, we might guess the text is about animals. But as well as this, the unique words can tell us something. If we can see the word "enclosure" is used just once, we might guess that the text is about a zoo, rather than what pets people own. So, just by looking at the words without their sentences, we can still see hints for what the sentences were originally about. One limitation is that if we said we were NOT happy in a sentence, happy would be in our chart, and we\'d have no way of knowing it was supposed to be the opposite.',
          createBagOfWords:
            "A bag of words is a text processing technique which goes all the way back to the 1950s. The idea is that by counting the number of times each word appears, we can begin to understand what the text is about. To create your own bag of words, sweep your frequency graph into a pile, or bag if you have one handy",
          bagOfWordsAlt: "Example image of a bag of words",
          whatBagOfWordsDoes:
            'When a computer tokenises (splits) a text, this is what it ends up with. What can you think that this could be used for? One application was in email security, where for years Gmail used it to detect spam - because spammers would use words like "money", "now", "danger" much more than a regular email would. It\'s also worth thinking that although we are considering words individually, like "teams", "goals", "manager", if those individual words appear with the word "ball" we might assume those words are about football teams, goals and managers. But, the word "office" might make us think its about Microsoft teams, work goals, and managers. So words appearing together is also important, even though we lose the exact order by cutting the sentences up.',
          generateText:
            'We can already generate text now! Pick a number of words to draw, and pull them randomly out from the bag or pile. Even though our "sentence" might not make sense, we still generated new text. You can keep going until you run out of words, or add the word back every time to generate forever.',
          textGenerationAlt:
            "Example image of someone generating text from the bag of words",
          probabilities:
            "It can also be useful to consider the fact that theres actually a very small chance that you would pull out a sentence that went into the bag, in its exact order, and therefore generate a perfect (but unoriginal) sentence. Theres also a slightly bigger, but still small chance that you pull out something new that makes sense. We can think of the goal of text generation as being a task of increasing the probability that something new and that makes sense is generated based on our input data.",
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
    student: "Datalogi kandidatstuderende ved Aarhus Universitet",
    phoneNumber: "+45 93 87 34 09",
    email: "lukejconnelly1{'@'}gmail.com",
    welcome: "Velkommen til Maskinrummet!",
    welcomeText:
      'Dette er en undervisningsressource designet på Aarhus Universitet til at undervise i, hvordan tekstbehandling og AI-systemer fungerer<br><br>Lærere: vi håber, I kan bruge siden i jeres undervisning - vores aktiviteter giver eleverne mulighed for at arbejde praktisk med data og AI<br><br>Du må meget gerne <a href="/#/da/contact">kontakte os</a> med forslag, spørgsmål eller feedback! Jeg vil meget gerne høre fra jer!<br><br>Nedenfor finder I en liste over vores aktiviteter, og hvis I vil vide mere om, hvordan man bruger siden eller søger inspiration, så tjek vores <a href="/#/da/how-to">vejledningsvideo om brug af siden</a>',
    aboutLuke:
      "Kontakt mig venligst med forslag, spørgsmål eller feedback! Jeg vil meget gerne høre fra dig!",
    thanks:
      "Tak til Magnus, Karl-Emil, Susanne, Line, og især lærerne og forskningsdeltagerne, som har arbejdet sammen med os for at skabe denne side",
    language: "Sprog",
    currLanguage: "Dansk",
    activity: "Aktivitet",
    error404: "Side ikke fundet",
    availableActivities: "Korte forløb",
    suggestActivity: "Foreslå en aktivitet",
    currentActivity: "Aktuel aktivitet",
    title: "Titel",
    modality: "Modalitet",
    subject: "Fag",
    age: "Alder",
    duration: "Varighed",
    topics: "Emner",
    textCleaning: "Tekstrensning",
    textCleaningExplained:
      "Tekstrensning er processen med at forberede tekst til behandling, hvilket kan involvere fjernelse af tegnsætning, opdeling i ord eller sætninger og generel standardisering af teksten.",
    digital: "Digital",
    anySubject: "Fleksibel",
    mins: "minutter",
    tokenisation: "Tokenisering",
    tokenisationExplained:
      "Tokenisering er en proces hvor tekst opdeles i meningsfulde enheder, såsom ord, til videre bearbejdning.",
    practical: "Praktisk",
    selectTopics: "Vælg emner",
    activityNotFound: "Aktivitet ikke fundet",
    whatYouNeed: "Hvad du har brug for til denne aktivitet",
    learningGoals: "Læringsmål",
    intro: "Introduktion",
    howTo: "Hvordan",
    howToUseTheSite: "Sådan bruger du siden",
    videoOnHowTo:
      "Se videoen ovenfor for at få en introduktion til vores side og hvordan du bruger den personligt eller som en del af en klasseaktivitet",
    longSentence: "Den sætning er lidt for lang, prøv en kortere!",
    emptySentence: "Du skal skrive noget i boksen!",
    back: "Tilbage",
    next: "Næste",
    finishLesson: "Afslut lektion",
    niceWork: "Godt arbejde! Lad os fortsætte til næste trin",
    congrats: "Tillykke!",
    youCompleted: "Du har fuldført lektionen :)",
    learningOutcomes: "Læringsresultater",
    seeMore: "Se mere",
    splitting: "Opdeling i ord",
    lowercasing: "Konvertering til små bogstaver",
    cleaning: "Rensning af tegnsætning",
    sentenceInputTitle: "Indtast en sætning",
    yourSentence: "Din sætning",
    submit: "Indsend",
    gotSentence: "Modtaget sætningen:",
    seeComputer: "Skift alt til computer visning",
    seeHuman: "Skift alt til menneskelig visning",
    autoClick: "Automatisk klik alt",
    helpUs:
      "Hjælp os med forslag; deling; at bidrage til vores GitHub; og støtte videnskaben i dit lokalsamfund",
    ourProject: "Vores Projekt",
    aboutOurProject:
      "Tekstbehandling, tekst AI og chatbots er blevet utroligt populære, men vi ser en mangel på læringsværktøjer og ressourcer til at lære om, hvordan de fungerer. Vi mener, at den samfundsmæssige indvirkning af disse teknologier kræver, at alle får mulighed for at lære. Derfor har vi udviklet denne hjemmeside gennem konsultation med lærere som en ressource til at udvikle forståelse og kritiske tænkningsevner gennem enkle og anvendelige aktiviteter.",
    compEmpowerment: "Computational Empowerment",
    aboutCompEmpowerment:
      "Computational empowerment er en tilgang og et Participatory Design svar på udfordringer relateret til det stigende behov for digital dannelse i ungdomsuddannelserne. Tilgangen udvider det nuværende fokus på computational thinking til også at omfatte en bekymring for, hvordan børn og unge styrkes gennem konstruktiv, analytisk og kritisk engagement med teknologi. [Dindler, C., Smith, R. C., & Iversen, O. S. (2020). Computational Empowerment: participatory design in education. CoDesign: International Journal of CoCreation in Design and the Arts, 16(1), 66-80. https://doi.org/10.1080/15710882.2020.1722173]",
    futureWork: "Fremtidigt Arbejde",
    aboutFutureWork: "At blive besluttet...",
    textGeneration: "Tekstgenerering",
    textGenerationExplained:
      "Tekstgenerering er processen med at skabe tekst, som ofte udføres i f.eks. ChatGPT ved brug af AI.",
    createANewDatasetIntro:
      "Her kan du oprette et nyt datasæt til brug på siden. Du kan levere al teksten, eller gøre det åbent for andre at bidrage til. Du kan ændre dette eller tilføje/slette i datasættet når som helst.<br><br>Hvert datasæt har en adgangskode, som du kan dele med alle, du også gerne vil have mulighed for at redigere det.<br><br><b>BEMÆRK:</b> Dette er ikke en sikker app. Brug fjollede adgangskoder, som du ikke har noget imod bliver offentligt tilgængelige online.<br><br>Sammenfattende er datasæt:<ul><li>Redigerbare</li><li>Slettelige</li><li>Adgangskodebeskyttede</li><li>Offentligt synlige</li></ul>",
    datasetName: "Datasætnavn",
    datasetPassword: "Datasæt adgangskode",
    confirmDatasetPassword: "Bekræft datasæt adgangskode",
    openDataset: "Åbn datasæt så andre kan bidrage?",
    open: "Åben",
    closed: "Lukket",
    startEmptyDataset: "Start med et tomt datasæt?",
    startingSentences:
      "Sætninger, som datasættet starter med: (Du kan altid tilføje flere eller slette senere)",
    useModalBelow:
      "Brug inputboksen nedenfor til at tilføje sætninger til datasættet",
    text: "Tekst",
    action: "Handling",
    delete: "Slet",
    selectSplitter: "Vælg hvordan teksten ovenfor skal opdeles i datasættet",
    newline: "Ny linje",
    period: "Punktum",
    comma: "Komma",
    inputSentence: "Input sætning",
    inputText: "Input tekst",
    sentence: "Sætning",
    tooLong: "For langt!",
    areYouSureDelete:
      "Er du sikker på, at du vil slette hele datasættet permanent?",
    add: "Tilføj",
    createDataset: "Opret Datasæt",
    emptyDatasetName: "Du skal angive et datasætnavn",
    longDatasetName: "Datasætnavnet er for langt (maks 50 tegn)",
    emptyPassword: "Du skal angive en adgangskode til datasættet",
    longPassword: "Adgangskoden er for lang",
    passwordMismatch: "Adgangskoderne stemmer ikke overens",
    emptyStartingSentences:
      "Dette ville oprette et tomt datasæt, du skal angive nogle start-sætninger eller fjerne markeringen i boksen ovenfor",
    emptySentences: "Sætninger må ikke være tom",
    longSentences: "Sætninger må ikke være længere end 250 tegn",
    emptyDataset: "Dette datasæt er tomt",
    selectADataset: "Vælg et datasæt",
    serverErrorOccurred: "Der opstod en serverfejl, prøv venligst igen senere",
    loading: "Indlæser...",
    viewDataset: "Se datasæt",
    or: "eller",
    createADataset: "Opret et datasæt",
    newDataset: "Nyt datasæt",
    addSentenceAndStart:
      "Tilføj en sætning til det valgte datasæt og start aktivitet",
    startActivity: "Start aktivitet",
    startActivityWOSentence:
      "Start aktivitet uden at tilføje en sætning til datasættet",
    noDatasetSelected: "Intet datasæt valgt",
    datasetSelectionExplanation:
      "I denne aktivitet vil vi bruge et datasæt til at generere og opsummere tekst. Du kan oprette dit eget datasæt, oprette et datasæt som andre kan bidrage til, eller bruge et af de tilgængelige datasæt.",
    inputTexts: "Indsendte sætninger",
    deleteDataset: "Slet Datasæt",
    refreshDataset: "Hent nye ændringer",
    saveChanges: "Gem ændringer",
    openForInput: "Åben for indsendning",
    closedForInput: "Lukket for indsendning",
    editDataset: "Rediger datasæt",
    generate: "Generer",
    how: "Hvordan?",
    position: "Position",
    previous: "Forrige",
    othersWith: "Andre med",
    occurences: "optrædener",
    wordCloud: "Ordsky",
    wordCloudExplained:
      'I en ordsky: Jo flere gange ordet optræder i teksten, jo større er det. Fra en ordsky kan computere begynde at forstå, hvad datasættet handler om, og hvilke ord der er de vigtigste. For eksempel, hvis vi prøver at finde ud af, om et datasæt handler om dyr, kunne vi se efter ord som "hund", "kat", "fugl", der bruges flere gange. Gennem denne teknik, som en computer i stedet registrerer som ord og antallet af gange de optræder, kan en computer bedre forstå, hvad et datasæt handler om.',
    positionalTextGeneration: "Positionstekstgenerering",
    nGramsGeneration: "N-grams Tekstgenerering",
    windowSize: "N-gram størrelse",
    startToken: "[START]",
    endToken: "[SLUT]",
    maxSentenceLength: "Maksimal tilladt længde",
    doNoStemming: "Udfør ingen stamning",
    doNoStopwords: "Filtrer ingen stopord",
    stemming: "Stamning",
    stemmingExample:
      "<b>elsk<span style='color: red'>er</span><br/>elsk<span style='color: red'>ede</span><br/>elsk<span style='color: red'>et</span><hr/>elsk-",
    stopwords: "Stopord",
    stopwordsExample:
      "<b>Danmark <span style='color: red'>er et</span> land <span style='color: red'>i</span> Skandinavien. <span style='color: red'>Det er den</span> sydligste <span style='color: red'>af de</span> skandinaviske nationer, sydvest <span style='color: red'>for</span> Sverige <span style='color: red'>og</span> syd <span style='color: red'>for</span> Norge, <span style='color: red'>og det</span> grænser <span style='color: red'>op til</span> Tyskland <span style='color: red'>mod</span> syd.</b>",
    english: "Engelsk",
    danish: "Dansk",
    french: "Fransk",
    german: "Tysk",
    spanish: "Spansk",
    italian: "Italiensk",
    dutch: "Hollandsk",
    portuguese: "Portugisisk",
    swedish: "Svensk",
    norwegian: "Norsk",
    selectMethod: "Vælg metode",
    randomness: "Tilfældighed",
    randomnessExplained:
      "Grådig, vægtet tilfældigt og tilfældig er tre muligheder for, hvordan vi kan gøre vores valg af ord mere eller mindre tilfældigt.",
    greedyExplained:
      "Når vi foretager et grådigt valg, vælger vi det, der har den højeste sandsynlighed/skive i cirkeldiagrammet, og derfor er valget ikke tilfældigt (dvs hvis vi gør det flere gange, vil det resultere i det samme valg).",
    weightedRandomExplained:
      "Ved at bruge vægtet tilfældighed vælger vi baseret på sandsynlighederne (forestil dig, at du drejer cirkeldiagrammet for hvert valg).",
    randomExplained:
      "I tilfældig vælger vi tilfældigt ud fra alle mulighederne og ignorerer sandsynlighederne.",
    whatIsTemperature:
      "I store sprogmodeller bruger de ikke helt disse måder at vælge ord på, men mængden af tilfældighed, som modellen bruger, kaldes: temperatur",
    chooseWord: "Vælg ord",
    clear: "Slet",
    ngrams: "N-grams",
    leastLikely: "Mindre sandsynligt",
    mostLikely: "Mere sandsynligt",
    greedy: "Grådig",
    random: "Tilfældig",
    weightedRandom: "Vægtet tilfældigt",
    datasetBias: "Datasæt Bias",
    randomWords: "Tilfældige ord",
    mostCommonWords: "Mest almindelige ord",
    generateRandomWords: "Generer tilfældige ord",
    either: "Enten",
    sentences: "Sætninger",
    wordFrequency: "Ordfrekvens",
    bagOfWords: "Ordpose",
    originalText: "Dette er en ny sætning, der ikke findes i datasættet",
    unoriginalText: "Dette er en sætning, der allerede findes i datasættet",
    noSearchResults: "Ingen resultater",
    emptyDropdown: "Ingen valgmuligheder",
    datasetBiasExplained:
      "Datasæt bias er, når et datasæt er partisk mod visse emner, ord eller sætninger, hvilket kan føre til uretfærdige valg eller forkerte resultater fra en AI trænet på datasættet.",
    singularActivitiesHeading: "Værktøjer",
    minWordCloudOccurences:
      "Minimum antal gange et ord skal optræde i teksten for at vises i vores ordsky (brug dette til store, langsom datasæt)",
    customFilterWords:
      "Ord, der skal udelukkes fra at blive vist i vores ordsky",
    printOrSave: "Print eller gem som PDF",
    fontSize: "Skriftstørrelse",
    numColumns: "Antal kolonner",
    numRows: "Antal rækker i tabellen",
    minOccurences:
      "Minimum antal gange et ord skal optræde for at blive inkluderet",
    singularActivities: {
      wordCloud: {
        title: "Ordsky",
      },
      ngramTextGen: {
        title: "N-gram Tekstgenerering",
      },
      positionalTextGen: {
        title: "Positionstekstgenerering",
      },
      bagOfWordsPrintout: {
        title: "Print Ordpose",
        custom: {
          printForCutting: "Print til nem klipning",
          printAsPage: "Print som handout",
          cuttingGuide:
            "<h1>Vejledning til klipning af ordposen:</h1><h3>Foldning:</h3><ul><li><strong>Rød linje:</strong> Fold papiret langs den røde linje markeret (1). Jo mere nøjagtig denne fold er, desto bedre bliver resultatet, når du klipper til sidst.</li><li><strong>Blå linje:</strong> Fold derefter langs den blå linje markeret (2).</li><li><strong>Grøn linje:</strong> Fold langs den grønne linje markeret (3), så du kan se den farvede tabel til næste trinet.</li></ul><h3>Klipning:</h3><ul><li><strong>Lilla linjer:</strong> Klip langs de lilla linjer <em>hele vejen til kanterne</em> af papiret for at fjerne marginerne fra bunden og venstre kant.</li><li><strong>Orange linjer:</strong> Klip langs de orange linjer, men <em>klip ikke helt igennem til kanten</em>. Stop lige ved margin for at gøre det næste trin nemmere.</li><li><strong>Gule linjer:</strong> Klip langs de gule linjer, du behøver ikke at klippe de blank bokse ud - de er tomme. Du burde ende med pæne ord i samme størrelse til din ordpose :)</li></ul>",
        },
      },
    },
    activities: {
      textCleaning: {
        title: "Hvordan kan en tekst laves om til ord?",
        description:
          'I denne lektion udforsker vi, hvordan tekster kan "renses" til ord for at blive behandlet i tekst-AI.',
        whatYouNeed: "Intet :)",
        learningGoals:
          '<ul><li>Forstå hvordan computere "ser" tekst</li><li>Forstå hvordan tekst kan renses til ord for bearbejdning</li><li>Få en introduktion til tokenisering</li></ul>',
        intro:
          'Hvordan bearbejder vi et stykke tekst? Det er et sværere spørgsmål, end det ser ud til at være ved første øjekast, da tekst er repræsenteret i computere som "strings" af tegn, som altså er repræsenteret som tal. Derfor, mens vi kan se at ordene "hej", "HEJ", og "Hej!" betyder det samme, ser de meget forskellige ud for en computer.<br><br>Til at starte med, lad os fokusere på at forsøge at opdele et stykke tekst i ord.',
        learningOutcomes:
          'Forhåbentlig forstår du efter at have gennemført denne lektion: <ul><li>Hvad tokenisering er og hvordan det kan bruges i tekstbearbejdning</li><li>Hvordan computere behandler tekst som "strings" af tegn</li><li>Hvordan dette gør at tekstens "betydning", som er åbenlys for os mennesker, kan være meget vanskeligere for en computer</li></ul>',
        readMore:
          'Du kan se præcis, hvordan ChatGPT og OpenAIs GPT-modeller ville tokenisere tekst her: <a href="https://platform.openai.com/tokenizer" target="_blank">https://platform.openai.com/tokenizer</a><br><br>Hvis du er interesseret i at lære mere om tokenisering, kan du læse mere her: <a href="https://www.datacamp.com/blog/what-is-tokenization" target="_blank">https://www.datacamp.com/blog/what-is-tokenization</a>',
        custom: {
          howComputersSee:
            "Nedenfor kan du se, hvordan din computer ser din sætning. Du kan holde musen over tegnene/koderne eller bruge knapperne til at afsløre den originale tekst.",
          characterCodesExplained:
            'Hvert tegn (dette inkluderer bogstaver, tal og tegnsætning) en computer ser, er repræsenteret med et nummer som kaldes en tegnkode. For eksempel er bogstavet "a" repræsenteret af nummeret 97, "b" = 98, "c" = 99, osv.',
          splitSentenceUsingSpaceBelow:
            'Så, hvis vi vil have ord ud af vores tekst, skal vi først forstå, hvilke tegnkoder der er dele af ord, og hvilke der ikke er. En almindelig måde er at starte med at splitte "strings" af tegn ved hjælp af mellemrum, repræsenteret ved tegnkoden 32. Klik her for at fjerne dem fra din sætning.',
          lowercaseSentenceBelow:
            'Nu har vi noget, der begynder at ligne individuelle ord. Men hvis nogen indsendte ordet "HEJ" og en anden indsendte "hej", ville computeren se disse som to helt forskellige sæt tal, når vi, som mennesker, sandsynligvis ville bearbejde dem som det samme ord. En måde at løse dette på er ved at lave alle tegn om til små bogstaver. Klik på de store bogstaver nedenfor for at gøre dette.',
          removePuncBelow:
            'Nu ser vores ord rigtige ud, men tegnsætning kan stadig forårsage problemer. For eksempel er "hej" og "hej!" stadig forskellige ord for en computer. Nogle gange kan det være fint at fjerne tegnsætningen, men vi kan også have brug for tegnsætningen for at forstå sætningerne. For eksempel er sætningen "Lad os spise, bedstemor!" meget forskellig fra "Lad os spise bedstemor!". Derfor, for at håndtere dette, vil vi beholde tegnsætningen, men markere det som ikke værende en del af de individuelle ord. Klik nedenfor for at markere tegnsætningen og afslut rensningen af din "string".',
          introToTokenisation:
            'Godt gået! Du har nu renset din tekst til ord og tegnsætning. Denne proces kaldes "tokenisering", hvor vi omdanner tekster til lister af "tokens", som bidrager til tekstens betydning. Dette er en vigtig del, og normalt det første skridt, i tekstbearbejdning i AI. Mens vores var rimeligt effektiv, var der nogle forenklinger for at gøre tingene lettere. For eksempel ville ordet "ikk\'å" blive delt i ordene "Ikk" og "å", på grund af tegnsætningen, når vi sandsynligvis ville behandle det som ét ord eller "ikke" og "også". Derfor er den sædvanlige måde at lave tokenisering på en tekst at bruge "maskinlæring" på et stort datasæt for at lade tekstbearbejdsnings-AI\'er automatisk lære mønstrene af, hvordan ord deles op.',
        },
      },
      embodiedSentenceGeneration: {
        title: "[Legemliggjort] Hvordan kan jeg generere tekst?",
        description:
          "I denne lektion spiller du rollen som AI, der genererer sætninger fra de mest almindelige ord i et datasæt, for at få indsigt i, hvordan tekstgenerering fungerer på egen hånd.",
        whatYouNeed: "Intet :)",
        learningGoals:
          "<ul><li>Forstå gennem legemliggørelse forskellen mellem tilfældig og sandsynlighedsdrevet generering</li><li>Oplev begrænsningerne og bias i et datasæt på egen hånd</li><li>Få en introduktion til ordskyer og stopord</li></ul>",
        intro:
          "Her bruger vi et datasæt til at opleve lidt af, hvordan computere genererer tekst. Du kan også vælge at følge med praktisk - skriv blot nogle sætninger på papir og klip dem op i ord.<br><br>Det kan være interessant at prøve dette to gange med datasæt med forskellige bias for at se, hvor forskellig oplevelsen er.<br><br>For at starte, vælg et datasæt nedenfor (du kan bruge det som et eksempel, hvis du følger med praktisk).",
        learningOutcomes:
          "Forhåbentlig har du efter at have gennemført denne lektion: <ul><li>Set effekterne af datasættet på genereringsoutput</li><li>Set virkningen af et tilfældigt valg og et grådigt valg fra et datasæt</li><li>Lært, hvad et stopord er, og hvorfor de er nyttige</li></ul>",
        readMore:
          'En video fra Google, der forklarer bias i maskinlæring, er tilgængelig her: <a href="https://www.youtube.com/watch?v=59bMh59JQDo" target="_blank">https://www.youtube.com/watch?v=59bMh59JQDo</a><br><br>Og et eksempel, der kigger på tekst-til-billede-generering, kan findes her: <a href="https://www.microsoft.com/en-us/research/blog/understanding-social-biases-through-the-text-to-image-generation-lens/" target="_blank">https://www.microsoft.com/en-us/research/blog/understanding-social-biases-through-the-text-to-image-generation-lens/</a>',
        custom: {
          randomWordGen:
            'Nedenfor vil vi tilfældigt vælge 5 ord fra det valgte datasæt. Hvis du forestiller dig datasættet skåret op i ord foran dig, svarer dette til at vælge 5 tilfældige ord. Når du har de 5 ord, skal du skrive den første sætning, der falder dig ind, som bruger alle ordene. For eksempel [æble] [læge] [Simon] [en] [glad] => "Simon er en læge og er glad for at spise et æble". For at få en større udfordring, prøv at holde ordene i den rækkefølge, de blev valgt!',
          repeat:
            "Du kan gentage dette så mange gange, du vil, og se, hvor forskellige sætningerne bliver hver gang.",
          stopwordsExplained:
            'Vi ved, at de mest populære ord i teksten sandsynligvis er "den", "og", "er", "i", osv. Disse ord kaldes "stopord", og de fortæller os ikke meget om tekstens betydning og fylder virkelig meget i vores ordsky. Derfor kan vi filtrere dem ud fra vores ordsky for at få en bedre idé om, hvad datasættet handler om. I den fysiske bunke af ord svarer dette til at fjerne de uinteressante ord. Du kan vælge en liste over stopord til at bruge på vores ordsky ved hjælp af dropdown-menuen nedenfor, hvorefter vores ordsky og de mest almindelige ord ovenfor opdateres.',
          wordCloud:
            "Nedenfor har vi repræsenteret datasættet som en ordsky. Med en bunke af udklippede ord svarer dette til at arrangere dem alle med forsiden opad på bordet foran dig.",
          topWords:
            'Nedenfor er de 5 mest almindelige ord i det valgte datasæt. Dette kunne opnås ved at tælle ordene i bunken foran dig og derefter vælge de mest almindelige. Dette ville være tidskrævende selv med 10 sætninger, men computere kan bearbejde tusindvis af sætninger på et sekund. Da vi tager de 5 største ord, kaldes dette typisk en "grådig" tilgang. Mens ordene ændrede sig hver gang, vi tilfældigt valgte dem, vil de her være de samme hver gang. Prøv at gentage processen med at skabe en sætning ved hjælp af disse ord fra før. Forhåbentlig er det en mere præcis repræsentation af datasættet, men vi kan kun gøre dette én gang.',
          bias: "Nu hvor du har skrevet et par sætninger ned, er det værd at tænke over, hvordan det valgte datasæt påvirkede de sætninger, du lavede. Mens din forståelse af sprog var ansvarlig for at sætte disse sætninger sammen, ligesom en AI har en generel forståelse af sprog, kom sandsynlighederne for de ord, vi valgte, fra datasættet og påvirkede sandsynligvis, hvad du ville sige. Hvis du ikke er sikker, så prøv at gentage processen, men brug et nyt datasæt med et andet tema. Dette svarer til, hvordan AI'er kan være partisk af de datasæt, de er trænet på, og utilsigtet hælder mod datasættets meninger eller temaer.",
        },
      },
      textGeneration: {
        title: "Hvordan kan en computer forstå og generere tekst?",
        description:
          "I denne lektion udforsker vi, hvordan datasæt kan opsummeres med ordskyer, hvordan en computer kan generere tekst ved hjælp af et datasæt, og hvordan sprogmodeller balancerer kreativitet og sandhed.",
        whatYouNeed: "Intet :)",
        learningGoals:
          "<ul><li>Lær, hvad stamning og stopord er, og hvordan vi kan forstå tekst ved hjælp af ordskyer.</li><li>Udforsk hvordan tekst kan genereres af computere med forskellige metoder.</li><li>Få en fornemmelse af, hvordan tilfældighed spiller ind i god (og upålidelig) tekstgenerering.</li></ul>",
        intro:
          "Hvordan genererer computere tekst? Hvordan kan de forstå tekstens mening? I denne lektion bruger vi ordskyer til at visualisere et datasæt og derefter generere tekst ved hjælp af det. Vi vil se, hvordan computere kan generere tekst, der er kreativ, men også hvordan de kan tage fejl.<br><br> For at komme i gang, skal du vælge eller oprette et datasæt at arbejde med.",
        learningOutcomes:
          "Forhåbentlig efter at have gennemført denne lektion, kan du forstå:<ul><li>Hvad stamning og stop ord er, og hvordan de kan bruges i tekstbearbejdning</li><li> Hvordan computere kan generere tekst, og hvordan de kan være kreative, men også upålidelige</li><li> Hvordan tilfældighed kan påvirke tekstgenerering og medføre interessante og nogle gange uforudsigelige resultater.</li><li>Have en bedre forståelse af, hvordan tilfældighed spiller ind i tekst generering, og hvordan det kan bruges til at gøre tekstgenerering mere kreativ.</li></ul>",
        readMore:
          'Du kan prøve en stemmer direkte her: <a href="http://text-processing.com/demo/stem/" target="_blank">http://text-processing.com/demo/stem/</a><br><br>En god forklarende video om N-grams er tilfængelig her: <a href="https://www.youtube.com/watch?v=E_mN90TYnlg" target="_blank">https://www.youtube.com/watch?v=E_mN90TYnlg</a>',
        custom: {
          wordCloudBelow:
            "Nedenfor kan du se en ordsky genereret fra det valgte datasæt",
          stemmingExplained:
            'I en ordsky vil vi sandsynligvis have, at ordene "elske", "elskede" og "elsker" tælles som "elsk-". Heldigvis kan vi gennem et sæt regler kaldet "stamning", som skærer et ord ned til dets rod, gøre dette. Dette forbedrer nøjagtigheden af vores ordsky, og du kan vælge en Stamning-metode til at bruge på vores ordsky ved hjælp af dropdown-menuen, hvis du ønsker det.',
          stopwordsExplained:
            'Vi ved, at de mest populære ord i teksten sandsynligvis er "den", "og", "er", "i", osv. Disse kaldes "stopord", og de fortæller os ikke meget om tekstens betydning og fylder virkelig meget i ordskyen. Derfor kan vi filtrere dem ud fra vores ordsky for at få en bedre idé om, hvad datasættet handler om. Du kan vælge en liste over stopord til at bruge på vores ordsky ved hjælp af dropdown-menuen nedenfor.',
          positionalGeneration:
            'En af de enkleste måder at begynde at generere tekst på er at tage det mest almindelige første ord i hele datasættet, derefter det mest almindelige andet ord, derefter det tredje, og så videre. Du kan klikke på "generer" nedenfor for at se, hvordan det ser ud for dette datasæt, og knappen "hvordan" viser de ord, der var på position 1, 2, 3 osv.',
          positionalTextGenBreakdown:
            "Mens positionsgenerering fungerer godt i starten, vil du måske bemærke, at når vi kommer længere ind i sætningen, bliver sandsynlighederne og positionerne mere rodede. Derfor kan det give mening at se på, hvilke ord der optræder sammen, i stedet for hvornår de optræder. En måde at gøre dette på er N-grammer: grupper af ord, der optræder i teksten. Nedenfor kan du se dine datasæts N-grammer i en ordsky:",
          topX: "Hvor mange af de mest almindelige N-grammer, der skal vises",
          introToSankey:
            'Som et eksempel på, hvordan N-grammer hjælper os med at generere tekst, hvis vi ser 2-grammet "Klar, parat" i en tekst, ved vi, at "start" sandsynligvis kommer bagefter, uanset om det er position 1, 2, 3 eller 5, 6, 7 eller endda 112, 113, 114. Nedenfor kan du se de mest almindelige N-grammer fra dit datasæt og ordet, der kom efter dem.',
          nGramGeneration:
            "Nedenfor bruger vi N-grammer til tekstgenerering på dit datasæt, og du kan eksperimentere med forskellige N'er og tilfældigheder for at se, hvordan det ændrer resultatet.",
        },
      },
      bagOfWordsPractical: {
        title: "Hvad er tekstbearbejdning?",
        description:
          "I denne lektion bruger vi papir og saks til at udforske, hvordan tekst kan opdeles i ord, behandles af en computer og bruges til at generere ny tekst.",
        whatYouNeed:
          'Til denne lektion har du brug for en måde at skrive sætninger ned og klippe dem op i ord (f.eks. papir, saks, kuglepen). Det kan være almindeligt papir, men vi tilbyder også følgende skabeloner: <ul><li>Farve - 12 sætninger pr. side, 10 ord pr. sætning, op til 6 sider (71 sætninger) [<a href="/sentence-template.pdf" target="_blank">pdf</a>] [<a href="/sentence-template.docx" target="_blank">docx</a>]</li><li>Blækbesparende - 12 sætninger pr. side, 10 ord pr. sætning, op til 2 sider (23 sætninger) [<a href="/sentence-template-inksaver.pdf" target="_blank">pdf</a>] [<a href="/sentence-template-inksaver.docx" target="_blank">docx</a>]</li></ul>',
        learningGoals:
          "I denne lektion vil vi forsøge at: <ul><li>Forstå hvordan tekst kan bearbejdes</li><li>Få en introduktion til tokenisering</li><li>Få en introduktion til ordposen som en teknik til at forstå, hvad en tekst handler om</li><li>Begynd at tænke på at generere tekst</li></ul>",
        intro:
          'I denne lektion lærer vi, hvordan computere kan forstå tekst og generere ny tekst. For at gøre det, har vi brug for et sæt sætninger (5 er nok minimum, men flere er bedre og der er ingen maksimum). Før du starter, overvej at have et tema for sætningerne f.eks. "folk introducerer sig selv" eller "meninger om en bog, du har læst for nylig". Det er ikke strengt nødvendigt, men det gør de ideer, vi underviser i, mere tydelige.',
        learningOutcomes:
          "Forhåbentlig har du efter at have gennemført denne lektion: <ul><li>En forståelse for, hvordan tekstbearbejdning kan se ud</li><li>Evnen til at genkende ordet tokenisering</li><li>Har set og forstået ordposen og dets formål.</li><li>Har nogle ideer til hvad der giver god (og dårlig) tekst generering</li></ul>",
        readMore:
          'Du kan se præcis hvordan ChatGPT og OpenAIs GPT-modeller vil tokenisere tekst her: <a href="https://platform.openai.com/tokenizer" target="_blank">https://platform.openai.com/tokenizer</a><br><br>Denne hjemmeside vil automatisk oprette en ordpose med sandsynligheder baseret på enhver tekst, du giver den: <a href="https://www.online-utility.org/text/analyzer.jsp" target="_blank">https://www.online-utility.org/text/analyzer.jsp</a>',
        custom: {
          createSentences:
            "For at starte aktiviteten skal du skrive hver sætning på en separat linje og derefter skære hver sætning op i ord",
          cuttingAlt:
            "Billede-eksempel af en person, der klipper deres sætning over",
          whatIsAWord:
            'På dette tidspunkt er det interessant at overveje, hvad der udgør et ord. For eksempel, er "ikk\'å" ét ord eller to? Er New York et ord? Hvad med "!"? Det er et svært spørgsmål at besvare med regler, og derfor opdeler AI\'er typisk sætninger ved at se mange eksempler, som du lige har gjort, og bemærke mønstrene. Navnet for at opdele en tekst er: tokenisering.',
          wordFreqChart:
            "Nu skal du tage alle dine ord fra alle sætningerne og arrangere dem alfabetisk på bordet foran dig, som vist nedenfor",
          freqAlt: "Billede-eksempel af et ordfrekvensdiagram",
          whatFrequencySays:
            'Dette hjælper os med at se nogle ting. For det første ved vi nu, hvilke ord der er mest almindelige. Dette kan hjælpe os med at forstå, hvad teksten handler om. For eksempel, hvis vi ser ordene "papegøje" og "kanin" meget, kan vi gætte på, at teksten handler om dyr. Men udover dette kan de unikke ord fortælle os noget. Hvis vi kan se, at ordet "indhegning" kun bruges én gang, kan vi gætte på, at teksten handler om en zoologisk have i stedet for at handle om kæledyr. Så ved blot at se på ordene uden deres sætninger, kan vi stadig se hints til, hvad sætningerne oprindeligt handlede om. En begrænsning er, at hvis vi sagde, at vi IKKE var glade i en sætning, ville "glad" være i vores diagram, og vi ville ikke have nogen måde at vide, at det skulle betyde det modsatte.',
          createBagOfWords:
            "En ordpose er en tekstbearbejdningsteknik, der går helt tilbage til 1950'erne. Ideen er, at ved at tælle antallet af gange hvert ord optræder, kan vi begynde at forstå, hvad teksten handler om. For at skabe din egen ordpose, samler du dit frekvensdiagram sammen til en bunke, eller en pose, hvis du har en",
          bagOfWordsAlt: "Billede-eksempel af en ordpose",
          whatBagOfWordsDoes:
            'Når en computer tokeniserer (splitter) en tekst, er det dette, den ender med. Hvad kan du tænke dig, at dette kunne bruges til? En anvendelse var i e-mail sikkerhed, hvor Gmail i årevis brugte det til at opdage spam - fordi spammere ville bruge ord som "penge", "nu" og "fare" meget mere end en almindelig e-mail ville. Det er også værd at tænke på, at selvom disse er individuelle ord som "hold", "mål", "leder", hvis disse individuelle ord optræder med ordet "bold", kan vi antage, at det handler om fodbold. Men "kontor" kan få os til at tænke, at det handler om arbejde. Så ord, der optræder sammen, er også vigtige, selvom vi mister den nøjagtige rækkefølge ved at klippe ordene over.',
          generateText:
            'Vi kan allerede generere tekst nu! Vælg et antal ord at trække, og træk dem tilfældigt ud fra posen eller bunken. Selvom vores "sætning" måske ikke giver mening, har vi stadig genereret ny tekst. Du kan fortsætte, indtil du løber tør for ord, eller tilføje ordet tilbage hver gang for at generere for evigt.',
          textGenerationAlt:
            "Billede-eksempel af en person, der genererer tekst fra ordpose",
          probabilities:
            "Det kan også være nyttigt at overveje, at der faktisk er en meget lille chance for, at du ville trække en sætning, der gik ind i posen, i sin nøjagtige rækkefølge, og dermed generere en perfekt (men uoriginal) sætning. Der er også en lidt større, men stadig lille chance for, at du trækker noget nyt, der giver mening. Vi kan tænke på målet med tekstgenerering som at øge den sandsynlighed, at noget nyt og meningsfuldt genereres baseret på vores inputdata.",
        },
      },
    },
  },
};

export const langs = [
  { name: "English", value: "en" },
  { name: "Dansk", value: "da" },
];

export const DEFAULT_LOCALE = "da";

export const LOCALES = langs.map((lang) => lang.value);

const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: "en",
  messages,
});

export default i18n;
