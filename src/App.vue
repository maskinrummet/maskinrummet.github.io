<template>
  <div id="app">
    <AppHeader />
    <div class="p-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>
