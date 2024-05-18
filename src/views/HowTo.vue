<template>
  <div class="text-center p-3">
    <iframe
      class="w-8 h-screen max-h-30rem"
      src="https://www.youtube.com/embed/m2D-_AAj_4A?si=zSzb5-utplpuWc7w"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <p>{{ $t("videoOnHowTo") }}</p>
  </div>
</template>
