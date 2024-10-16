<template>
  <span v-if="text.slice(maxSize, 1000)" class="clickable">
    <span v-if="showTruncated" @click="showTruncated = false"
      >{{ text.slice(0, maxSize) }}<b class="text-primary">...</b></span
    >
    <span v-else @click="showTruncated = true">{{ text }}</span>
  </span>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  name: "TruncatedText",
  props: {
    maxSize: { type: Number, default: 100 },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showTruncated: true,
    };
  },
};
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
