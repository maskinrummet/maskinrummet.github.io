<template>
  <div class="flex justify-content-center align-items-center flex-column">
    <h1>{{ $t("error404") }}</h1>
    <router-link :to="'/' + $i18n.locale">
      <Button :label="$t('home')" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
