<template>
  <div class="flex justify-content-center align-items-center flex-column">
    <h1>{{ $t("error404") }}</h1>
    <router-link to="/">
      <Button :label="$t('home')" />
    </router-link>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "NotFound",
  components: {
    Button,
  },
};
</script>
