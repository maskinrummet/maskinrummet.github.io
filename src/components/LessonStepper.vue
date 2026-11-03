<template>
    <div class="lesson-stepper">
        <Stepper class="p-stepper" v-model:active-step="step" :linear="linear">
            <slot />
        </Stepper>
        <div class="seperator"></div>
        <div class="sidebar">
            <LessonSteps :steps="normalizedSteps" :current-step="step" :allowNavigation="canProgress && !linear"
                @stepClicked="handleStepClick" />

            <hr>

            <div class="key-terms" v-if="visibleTerms.length > 0">
                <h2>Nøglebegreber</h2>

                <button v-for="term in visibleTerms" :key="term.term" class="key-term"
                    command="show-modal" :commandfor="`key-term-${term.term}`">
                    <i class="pi pi-search"></i> {{ term.label }}?
                </button>
            </div>

            <div class="buttons">
                <Button icon="pi pi-arrow-left" severity="secondary" outlined @click="previous"
                    :disabled="step === 0" />
                <Button class="next" :label="!loading && currentStepConfig.nextButtonLabel"
                    :icon="'pi' + (loading ? ' pi-spin pi-spinner' : ' pi-arrow-right')" iconPos="right" @click="next"
                    :disabled="!canProgress" :severity="currentStepConfig.nextButtonSeverity" />
            </div>
        </div>
    </div>
</template>

<style>
.lesson-stepper {
    display: flex;
    /* gap: 2rem; */
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
    --sidebar-padding: 1.5rem;

    @media (min-width: 1600px) {
        --sidebar-padding: 2rem;
    }

    .p-stepper {
        overflow-y: auto;
        padding: 2px;
        padding-right: var(--sidebar-padding);
        scrollbar-width: thin;
        flex-grow: 1;
        position: relative;
        max-width: 1400px;
        margin: 0 auto;
    }

    .seperator {
        width: 0px;
        border-left: 1.5px solid var(--bluegray-100);
        padding-right: var(--sidebar-padding);
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
        anchor-name: --lesson-sidebar;
        min-width: 220px;

        hr {
            width: 100%;
            border: none;
            border-top: 1.5px solid var(--bluegray-100);
        }

        .key-terms {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            h2 {
                margin-top: 0;
                font-size: 1.175em;
                font-weight: 600;
                color: var(--bluegray-700);
            }

            .key-term {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875em;
                color: var(--bluegray-700);
                font-weight: 600;
                cursor: pointer;
                border: none;
                background: none;
                text-transform: capitalize;

                &:hover {
                    color: var(--purple-500);
                }
            }
        }

        .buttons {
            display: flex;
            justify-content: space-between;
            gap: 0.25rem;
            position: fixed;
            position-anchor: --lesson-sidebar;
            bottom: 0;
            left: anchor(left);
            right: anchor(right);
            padding-bottom: 1rem;
            padding-top: 0.5rem;
            background-color: white;

            .next {
                flex: 1;
                white-space: nowrap;
            }
        }
    }

}
</style>

<script>
import { visibleTermsState } from '@/store/keyTerms.js';
import LessonSteps from './LessonSteps.vue';

export default {
    name: "LessonStepper",
    components: {
        LessonSteps
    },
    props: {
        linear: {
            type: Boolean,
            required: false,
            default: true
        },
        activeStep: {
            type: Number,
            required: true
        },
        steps: { // Either a string or an object with a name and optional configuration
            type: Array,
            required: true
        },
        canProgress: {
            type: Boolean,
            default: true
        }
    },
    emits: ["update:activeStep"],
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async next() {
            const stepConfig = this.currentStepConfig;
            this.loading = !!stepConfig.beforeNext; // Only show loading if there is a beforeNext function to run
            await stepConfig.beforeNext?.();
            this.loading = false;
            this.step++;
        },
        previous() {
            this.step--;
        },
        handleStepClick(index) {
            this.step = index;
        }
    },
    computed: {
        step: {
            get() {
                return this.activeStep;
            },
            set(value) {
                this.$emit("update:activeStep", value);
            }
        },
        currentStepConfig() {
            const currentStep = this.steps[this.step];
            const stepConfig = typeof currentStep === 'string' ? { name: currentStep } : currentStep;

            return {
                // Base config
                nextButtonLabel: this.$t('next'),
                beforeNext: undefined,
                nextButtonSeverity: 'primary',
                additionalKeyTerms: [],

                // Override with step-specific config
                ...stepConfig,
            }
        },
        normalizedSteps() {
            return this.steps.map(step => {
                return typeof step === 'string' ? step : step.name;
            })
        },
        visibleTerms() {
            const dynamicTerms = Array.from(visibleTermsState?.terms.entries()).map(([term, label]) => ({ term, label }));
            const additionalTerms = this.currentStepConfig.additionalKeyTerms || [];
            console.log(dynamicTerms, additionalTerms);
            return [
                ...dynamicTerms,
                ...additionalTerms
            ].filter((term, index, self) => self.findIndex(t => t.term === term.term) === index); // Remove duplicates
        }
    }
}
</script>