<template>
  <div>
    <div class="flex flex-column md:flex-row justify-content-between">
      <div class="p-5">
        <h1>{{ $t("ourProject") }}</h1>
        <p>{{ $t("aboutOurProject") }}</p>
      </div>
      <div class="w-auto max-w-30rem">
        <img
          class="w-full border-round-3xl"
          src="@/assets/project.jpeg"
          alt="Our Project"
        />
      </div>
    </div>
    <div class="flex flex-column md:flex-row justify-content-between mt-2">
      <div class="p-5">
        <h1>{{ $t("compEmpowerment") }}</h1>
        <p>{{ $t("aboutCompEmpowerment") }}</p>
      </div>
      <div class="w-auto max-w-30rem">
        <img
          class="w-full border-round-3xl"
          src="@/assets/ce.jpeg"
          alt="Computational Empowerment"
        />
      </div>
    </div>
    <div class="flex flex-column md:flex-row justify-content-between mt-2">
      <div class="p-5">
        <h1>{{ $t("futureWork") }}</h1>
        <p>{{ $t("aboutFutureWork") }}</p>
      </div>
      <div class="w-auto max-w-30rem align-items-end">
        <img
          class="w-full border-round-3xl"
          src="@/assets/future.jpeg"
          alt="Future Work"
        />
      </div>
    </div>
    <p class="text-center">{{ $t("helpUs") }}</p>
  </div>
</template>
