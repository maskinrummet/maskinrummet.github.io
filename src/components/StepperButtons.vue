<template>
  <div class="flex">
    <div class="flex w-4 justify-content-start">
      <Button
        v-if="prevCallback"
        :label="$t('back')"
        severity="secondary"
        icon="pi pi-arrow-left"
        @click="prevCallback"
        :disabled="prevDisabled"
      />
    </div>
    <div class="flex w-4 justify-content-center">
      <Button
        v-if="centerButtonCallback"
        :label="centerButtonText"
        severity="help"
        @click="centerButtonCallback"
        :disabled="centerButtonDisabled"
      />
    </div>
    <div class="flex w-4 justify-content-end">
      <Button
        v-if="nextCallback"
        :label="$t('next')"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="nextCallback"
        :disabled="nextDisabled"
      />
      <Button
        v-if="finishCallback && !nextCallback"
        :label="$t('finishLesson')"
        severity="success"
        @click="finishCallback"
        :disabled="finishDisabled"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "StepperButtons",
  props: {
    prevCallback: {
      type: Function,
      default: null,
    },
    nextCallback: {
      type: Function,
      default: null,
    },
    finishCallback: {
      type: Function,
      default: null,
    },
    centerButtonText: {
      type: String,
      default: "",
    },
    centerButtonCallback: {
      type: Function,
      default: null,
    },
    prevDisabled: {
      type: Boolean,
      default: false,
    },
    nextDisabled: {
      type: Boolean,
      default: false,
    },
    finishDisabled: {
      type: Boolean,
      default: false,
    },
    centerButtonDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
