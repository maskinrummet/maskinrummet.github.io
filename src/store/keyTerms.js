import { reactive } from 'vue';

export const visibleTermsState = reactive({
    terms: new Map(),
    add(term, text) {
        this.terms.set(term, text);
    },
    remove(term) {
        this.terms.delete(term);
    }
});