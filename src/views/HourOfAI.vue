<template>
    
    <div class="flex justify-content-center flex-wrap pt-5 gap-4">
        <img class="flex align-items-center justify-content-center h-3rem" src="@/assets/Hour of AI Logo - Horizontal Black.png" alt="Hour of AI logo"/>
        <p class="flex align-items-center justify-content-center h-3rem text-4xl font-bold m-1"> X </p>
        <img class="flex align-items-center justify-content-center h-3rem" src="@/assets/aulogo_uk_var2_blue.png" alt="Aarhus University Logo"/>

    </div>

    <div class="flex justify-content-center p-5 text-4xl"> {{ $t("hourOfAI.hourOfAITitle") }} </div>


    <div class="grid border-round surface-100 p-3 mb-5">
        <div class="col">
            <img
            class="w-full max-w-19rem border-round-2xl align-self-center"
            src="@/assets/ce.jpeg"
            alt="TEMPLATE IMAGE"
            />
        </div>
        <div class="col">
            <img
            class="w-full max-w-19rem border-round-2xl align-self-center"
            src="@/assets/ce.jpeg"
            alt="TEMPLATE IMAGE"
            />
        </div>
        <div class="col">
            <img
            class="w-full max-w-19rem border-round-2xl align-self-center"
            src="@/assets/ce.jpeg"
            alt="TEMPLATE IMAGE"
            />
        </div>
        <div class="col">
            <img
            class="w-full max-w-19rem border-round-2xl align-self-center"
            src="@/assets/ce.jpeg"
            alt="TEMPLATE IMAGE"
            />
        </div>
    </div>


    <div class="flex justify-content-center flex-wrap p-3">
        <div class="flex align-items-center justify-content-center w-11rem h-rem surface-100 border-round m-2">{{ $t("hourOfAI.ages") }}</div>
        <div class="flex align-items-center justify-content-center w-11rem h-4rem surface-100 border-round m-2">Language models</div>
        <div class="flex align-items-center justify-content-center w-11rem h-4rem surface-100 border-round m-2">Bag of words</div>
    </div>

    <Card class="my-2">
          <template #title>{{ $t("intro") }}</template>
          <template #content>
            <div v-html="$t(`hourOfAI.intro`)"></div>
          </template>
    </Card>

    <Card class="my-3">
          <template #title>{{ $t("whatYouNeed") }}</template>
          <template #content>
            <div v-html="$t(`hourOfAI.whatYouNeed`)"></div>
          </template>
    </Card>

    <Fieldset legend="Steps" :toggleable="true" class="mb-3 surface-100">
        <div class="flex flex-row flex-wrap w-full h-full" >
            <!-- Step 1 -->
            <div class="flex flex-row flex-wrap w-full h-full bg-white border-solid border-gray-200 border-round p-3 mb-3">
                <!-- Left side -->
                <div class="flex flex-column align-items-center justify-content-start flex-1">
                    <div class="text-lg underline p-3">Step 1</div>
                    <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>
                    <img
                        class="w-full max-w-full max-w-19rem border-round-2xl align-self-center m-3"
                        src="@/assets/ce.jpeg"
                        alt="TEMPLATE IMAGE"
                    />
                </div>

                <Divider layout="vertical"/>
                <!-- Right side -->
                <div class="flex flex-column align-items-center justify-content-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center">
                        <div class="text-lg underline p-3">{{ $t("hourOfAI.teachingPoint") }}</div> 
                        <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>
   
                    </div>
                     <Divider layout="horizontal"/>
                    <div class="flex flex-column align-items-center">
                        <div class="text-lg underline p-3 pt-0">{{ $t("hourOfAI.questions") }}</div> 
                        <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>

                    </div>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-row flex-wrap w-full h-full bg-white border-solid border-gray-200 border-round p-3 mb-3">
                <!-- Left side -->
                <div class="flex flex-column align-items-center justify-content-start flex-1">
                    <div class="text-lg underline p-3">Step 2</div>
                    <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>
                    <img
                        class="w-full max-w-full max-w-19rem border-round-2xl align-self-center m-3"
                        src="@/assets/ce.jpeg"
                        alt="TEMPLATE IMAGE"
                    />
                </div>

                <Divider layout="vertical"/>
                <!-- Right side -->
                <div class="flex flex-column align-items-center justify-content-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center">
                        <div class="text-lg underline p-3">{{ $t("hourOfAI.teachingPoint") }}</div> 
                        <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>
   
                    </div>
                     <Divider layout="horizontal"/>
                    <div class="flex flex-column align-items-center">
                        <div class="text-lg underline p-3 pt-0">{{ $t("hourOfAI.questions") }}</div> 
                        <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>

                    </div>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-row flex-wrap w-full h-full bg-white border-solid border-gray-200 border-round p-3 mb-3">
                <!-- Left side -->
                <div class="flex flex-column align-items-center justify-content-start flex-1">
                    <div class="text-lg underline p-3">Step 4</div>
                    <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>
                    <img
                        class="w-full max-w-full max-w-19rem border-round-2xl align-self-center m-3"
                        src="@/assets/ce.jpeg"
                        alt="TEMPLATE IMAGE"
                    />
                </div>

                <Divider layout="vertical"/>
                <!-- Right side -->
                <div class="flex flex-column align-items-center justify-content-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center">
                        <div class="text-lg underline p-3">{{ $t("hourOfAI.teachingPoint") }}</div> 
                        <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>
   
                    </div>
                     <Divider layout="horizontal"/>
                    <div class="flex flex-column align-items-center">
                        <div class="text-lg underline p-3 pt-0">{{ $t("hourOfAI.questions") }}</div> 
                        <div class="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo cum placeat sunt officiis debitis quo corrupti quaerat maxime, earum necessitatibus. Debitis libero fugiat amet repellendus rerum quidem cum at?</div>

                    </div>
                </div>
            </div>
        </div>
    </Fieldset>

    <Card class="my-1">
          <template #title>{{ $t("learningOutcomes") }}</template>
          <template #content>
            <div v-html="$t(`hourOfAI.learningOutcomes`)"></div>
          </template>
    </Card>






</template>
