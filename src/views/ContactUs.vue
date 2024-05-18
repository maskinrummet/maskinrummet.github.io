<template>
  <h1>{{ $t("contact") }}</h1>
  <Card class="p-5 max-w-30rem">
    <template #content>
      <div class="w-auto">
        <img
          class="w-full border-round-3xl"
          src="@/assets/luke.jpg"
          alt="Luke"
        />
      </div>
      <div>
        <h1>{{ $t("luke") }}</h1>
        <h3>{{ $t("student") }}</h3>
        <p>{{ $t("aboutLuke") }}</p>
        <div class="mt-3">
          <i class="pi pi-phone mr-2"></i>
          {{ $t("phoneNumber") }}
        </div>
        <div class="mt-3">
          <i class="pi pi-envelope mr-2"></i>
          {{ $t("email") }}
        </div>
      </div>
    </template>
  </Card>
  <p>{{ $t("thanks") }}</p>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>
