<template>
    <div class="lesson-stepper">
        <Stepper class="p-stepper" v-model:active-step="step" :linear="linear">
            <slot />
        </Stepper>
        <div class="seperator"></div>
        <div class="sidebar">
            <LessonSteps :steps="steps" :current-step="step" />
            <hr>

            <div class="buttons">
                <Button icon="pi pi-arrow-left" severity="secondary" outlined @click="() => step--" :disabled="step === 0 || step === steps.length - 1" />
                <Button class="next" :label="$t('next')" icon="pi pi-arrow-right" iconPos="right"
                    @click="() => step++" :disabled="!canProgress" />
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

    .p-stepper {
        overflow-y: auto;
        padding: 2px;
        padding-right: 2rem;
        scrollbar-width: thin;
        flex-grow: 1;
    }

    .seperator {
        width: 0px;
        border-left: 1.5px solid var(--bluegray-100);
        padding-right: 2rem;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
        anchor-name: --lesson-sidebar;

        hr {
            width: 100%;
            border: none;
            border-top: 1.5px solid var(--bluegray-100);
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
            }
        }
    }
}
</style>

<script>
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
        steps: {
            type: Array,
            required: true
        },
        canProgress: {
            type: Boolean,
            default: true
        }
    },
    emits: ["update:activeStep"],
    computed: {
        step: {
            get() {
                return this.activeStep;
            },
            set(value) {
                this.$emit("update:activeStep", value);
            }
        }
    }
}
</script>