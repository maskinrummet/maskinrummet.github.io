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
    <p class="text-center">{{ $t("helpUs") }}</p>
  </div>
</template>
