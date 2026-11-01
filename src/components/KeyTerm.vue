<!-- KeyTerm.vue -->
<template>
    <button
        ref="el"
        class="inline-key-term"
        command="show-modal"
        :commandfor="`key-term-${props.term}`"
    >
        <slot></slot>
    </button>
</template>

<style>
.inline-key-term {
    display: inline-block;
    font-weight: 600;
    color: var(--purple-500);
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1em;
    padding: 0;
    margin: 0;

    &::after {
        content: "?";
        font-size: 0.75em;
        vertical-align: super;
        margin-left: 0.125rem;
    }

    &:hover {
        text-decoration: underline;
    }
}
</style>

<script setup>
import { visibleTermsState } from '@/store/keyTerms';
import { ref, onMounted, onBeforeUnmount, defineProps, useSlots, computed } from 'vue';

const props = defineProps({
    term: { type: String, required: true }
});

const slots = useSlots();
const slotText = computed(() => {
  const defaultSlot = slots.default?.();
  return defaultSlot ? defaultSlot[0].children : '';
});

const el = ref(null);
let observer = null;

onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            visibleTermsState.add(props.term, slotText.value);
        } else {
            visibleTermsState.remove(props.term);
        }
    });

    if (el.value) {
        // Traverse up the DOM tree to find the PrimeVue stepper content wrapper
        const target = el.value.closest('.p-stepper-content') || el.value;
        observer.observe(target);
    }
});

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
    visibleTermsState.remove(props.term);
});
</script>