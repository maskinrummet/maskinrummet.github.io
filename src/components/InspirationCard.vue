<template>
  <Card :class="cardShadow ? 'shadow-2' : 'shadow-none'">
    <template #header><slot name="header"></slot></template>
    <template #title>{{ title }}</template>
    <template #content>
      <div class="grid m-0">
        <div class="col min-w-15" v-if="description">
          {{ description }}
        </div>
        <div class="col min-w-15" v-if="$slots.description">
          <slot name="description"></slot>
        </div>
        <div class="col min-w-15" v-if="$slots.example">
          <slot name="example"></slot>
        </div>
      </div>
    </template>
    <template #footer><slot name="footer"></slot></template>
  </Card>
</template>

<script>
export default {
  name: "InspirationCard",
  props: {
    title: { type: String, required: true },
    description: { type: String, required: false },
    cardShadow: { type: Boolean, default: false },
  },
};
</script>

<style>
.min-w-15 {
  min-width: 15rem;
}
</style>
