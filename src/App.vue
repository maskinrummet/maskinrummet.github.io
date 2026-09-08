<template>
  <div id="app">
    <AppHeader />
    <div class="px-5 content-container">
      <router-view />
    </div>
  </div>
</template>

<style>
.content-container {
  --content-container-y-padding: 0.5rem;
  --content-container-height: calc(100vh - 80px - 16px);
  /* Header height (80px) + padding (16px) */

  --inner-content-height: calc(var(--content-container-height) - var(--content-container-y-padding) * 2);

  padding-top: var(--content-container-y-padding);
  padding-bottom: var(--content-container-y-padding);
  min-height: var(--content-container-height);
}
</style>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>
