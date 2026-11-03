import { reactive } from 'vue';

export const visibleTermsState = reactive({
    terms: new Map(),
    add(term, label) {
        this.terms.set(term, label);
    },
    remove(term) {
        this.terms.delete(term);
    }
});