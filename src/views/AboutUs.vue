<template>
  <div>
    <div class="flex flex-column md:flex-row justify-content-between">
      <div class="p-5">
        <h1>{{ $t("ourProject") }}</h1>
        <p>{{ $t("aboutOurProject") }}</p>
      </div>
      <img
        class="w-full max-w-full max-w-30rem border-round-3xl align-self-center"
        src="@/assets/project.jpeg"
        alt="Our Project"
      />
    </div>
    <div class="flex flex-column md:flex-row justify-content-between mt-2">
      <div class="p-5">
        <h1>{{ $t("compEmpowerment") }}</h1>
        <p>{{ $t("aboutCompEmpowerment") }}</p>
      </div>
      <img
        class="w-full max-w-full max-w-30rem border-round-3xl align-self-center"
        src="@/assets/ce.jpeg"
        alt="Computational Empowerment"
      />
    </div>
    <div class="flex flex-column md:flex-row justify-content-between mt-2">
      <div class="p-5">
        <h1>{{ $t("futureWork") }}</h1>
        <p>{{ $t("aboutFutureWork") }}</p>
      </div>
      <img
        class="w-full max-w-full max-w-30rem border-round-3xl align-self-center"
        src="@/assets/future.jpeg"
        alt="Future Work"
      />
    </div>
    <div class="flex flex-column md:flex-row justify-content-between mt-2">
      <div class="p-5">
        <h1>{{ $t("contact") }}</h1>
        <h2 class="mt-2">{{ $t("luke") }}</h2>
        <h3>{{ $t("student") }}</h3>
        <p class="mt-2">{{ $t("aboutLuke") }}</p>
        <div class="mt-3">
          <i class="pi pi-envelope mr-2"></i>
          {{ $t("email") }}
        </div>
        <p class="mt-3">{{ $t("thanks") }}</p>
      </div>
      <img
        class="w-full max-w-full max-w-30rem border-round-3xl align-self-center"
        src="@/assets/luke.jpg"
        alt="Luke"
      />
    </div>

    <p class="text-center">{{ $t("helpUs") }}</p>
  </div>
</template>
