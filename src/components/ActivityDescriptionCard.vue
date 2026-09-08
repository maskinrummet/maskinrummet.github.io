<template>
    <Card class="mb-2 bg-purple-600 text-white activity-card">
        <template #header>
            <div>
                <h1 class="p-card-title">{{ $t(`activities.${activity.id}.title`) }}</h1>
                <span class="modality">{{ $t("modality") }}: {{ $t(activity.modality) }}</span>
            </div>
            <div class="flex flex-col justify-content-between gap-2 info">
                <div>
                    {{ $t("age") }} {{ activity.age }}+
                    <i class="pi pi-user"></i>
                </div>
                <div class="text-right">
                    {{ activity.duration + $t("mins").slice(0, 1) }}
                    <i class="pi pi-stopwatch"></i>
                </div>
            </div>
        </template>
        <template #content>
            <p>{{ $t(`activities.${activity.id}.description`) }}</p>
            <!-- <div class="pt-3">
                {{ $t("subject") }}:
                <Tag :value="$t(activity.subject)"></Tag>
            </div>
            <div class="pt-1">
                {{ $t("topics") }}:
                <Tag v-for="(t, i) in activity.topics" :value="$t(t)" :key="i" severity="secondary" class="mr-1"></Tag>
            </div> -->
        </template>
    </Card>
    <span ref="scrollReset"></span>
    <Card v-if="hasRequirements">
        <template #title>{{ $t("whatYouNeed") }}</template>
        <template #content>
            <div v-html="$t(`activities.${activity.id}.whatYouNeed`)"></div>
        </template>
    </Card>
    <!-- <Fieldset class="mt-2" :legend="$t('learningGoals')" :toggleable="true" collapsed>
        <div v-html="$t(`activities.${activity.id}.learningGoals`)"></div>
    </Fieldset> -->
    <Card class="my-2">
        <template #title>{{ $t("intro") }}</template>
        <template #content>
            <div v-html="$t(`activities.${activity.id}.intro`)"></div>
        </template>
    </Card>
</template>

<style>
.activity-card {
    .p-card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1.25rem 1.25rem 0 1.25rem;

        .p-card-title {
            margin: 0;
        }

        .flex-col {
            flex-direction: column;
        }

        .modality {
            font-size: 0.9rem;
            font-weight: 200;
        }

        .info {
            white-space: nowrap;
        }
    }

    .p-card-content {
        padding: 0;
    }
}
</style>

<script>
export default {
  name: "ActivityDetail",
  props:{
    activity: {
      type: Object,
      required: true,
    },
    hasRequirements: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>