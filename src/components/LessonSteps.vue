<template>
  <ul class="lesson-steps">
    <li
      v-for="(step, index) in steps"
      :key="index"
      :class="{ 'active-step': index === currentStep, 'passed-step': index < currentStep }"
    >
      <span class="step-label">{{ step }}</span>
    </li>
  </ul>
</template>

<style>
.lesson-steps {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  --marker-size: 24px;

  &::before {
    content: "";
    position: absolute;
    inset-block: 1rem;
    left: calc(var(--marker-size) / 2 + 1px);
    width: 2px;
    background-image: linear-gradient(transparent 50%, var(--bluegray-100) 50%);
    background-size: 2px 6px;
    background-repeat: repeat-y;
    z-index: -1;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-weight: 500;
    font-size: 1rem;
    color: var(--bluegray-700);

    &::before {
      content: "";
      width: var(--marker-size);
      height: var(--marker-size);
      border-radius: 50%;
      display: inline-block;
      background-color: white;
      border: 2px solid var(--bluegray-300);
    }

    &.passed-step {
      color: var(--bluegray-200);

      &::before {
        border-color: var(--bluegray-100);
      }
    }
    
    &.active-step {
      color: var(--purple-500);

      &::before {
        background-color: var(--purple-100);
        border-color: var(--purple-500);
      }
    }
  }

  @media (max-width: 1600px) {
    gap: 0.75rem;
    --marker-size: 20px;

    li {
      font-size: 0.875rem;
    }
  }
}
</style>

<script>
export default {
  name: "LessonStepper",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    }
  }
}
</script>