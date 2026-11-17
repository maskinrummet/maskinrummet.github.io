<template>
    <dialog :id="dialogKey" class="key-term-dialog" @click.self="closeDialog">
        <button class="dialog-close pi pi-times" command="close" :commandfor="dialogKey"></button>
        <slot></slot>
    </dialog>
</template>

<style>
.key-term-dialog {
    border: none;
    border-radius: 1rem;
    padding: 0;
    position: relative;
    width: min(90%, 900px);

    .dialog-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        border: none;
        background: none;
        font-size: 1.25rem;
        color: var(--bluegray-700);
        cursor: pointer;

        &:hover {
            color: var(--purple-500);
        }
    }
}
</style>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    id: { type: String, required: true }
});

const dialogKey = computed(() => `key-term-${props.id}`);

function closeDialog(event) {
    event.currentTarget.close();
}
</script>