<template>
  <div id="app" class="container-fluid">
    <AppHeader />
    <div class="main-content">
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

<style scoped>
.main-content {
  padding: 20px;
  min-height: 80vh;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
