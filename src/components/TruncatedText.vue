<template>
  <span v-if="text.slice(100, 1000)" class="clickable">
    <span v-if="showTruncated" @click="showTruncated = false"
      >{{ text.slice(0, 100) }}<b class="text-primary">...</b></span
    >
    <span v-else @click="showTruncated = true">{{ text }}</span>
  </span>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  name: "TruncatedText",
  props: {
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
