<template>
    <Card class="mb-2 bg-purple-900 text-white">
        <template #header>
            <div class="flex justify-content-between pt-3 px-5">
                <div>
                    <i class="pi pi-user"></i>
                    {{ $t("age") }} {{ activity.age }}+
                </div>
                <div class="text-right">
                    {{ activity.duration + $t("mins").slice(0, 1) }}
                    <i class="pi pi-stopwatch"></i>
                </div>
            </div>
        </template>
        <template #title>{{ $t(`activities.${activity.id}.title`) }}</template>
        <template #subtitle>{{ $t("modality") }}: {{ $t(activity.modality) }}</template>
        <template #content>
            <p>{{ $t(`activities.${activity.id}.description`) }}</p>
            <div class="pt-3">
                {{ $t("subject") }}:
                <Tag :value="$t(activity.subject)"></Tag>
            </div>
            <div class="pt-1">
                {{ $t("topics") }}:
                <Tag v-for="(t, i) in activity.topics" :value="$t(t)" :key="i" severity="secondary" class="mr-1"></Tag>
            </div>
        </template>
    </Card>
    <span ref="scrollReset"></span>
    <Card>
        <template #title>{{ $t("whatYouNeed") }}</template>
        <template #content>
            <div v-html="$t(`activities.${activity.id}.whatYouNeed`)"></div>
        </template>
    </Card>
    <Fieldset class="mt-2" :legend="$t('learningGoals')" :toggleable="true" collapsed>
        <div v-html="$t(`activities.${activity.id}.learningGoals`)"></div>
    </Fieldset>
    <Card class="my-2">
        <template #title>{{ $t("intro") }}</template>
        <template #content>
            <div v-html="$t(`activities.${activity.id}.intro`)"></div>
        </template>
    </Card>
</template>

<script>
export default {
  name: "ActivityDetail",
  props:{
    activity: {
      type: Object,
      required: true,
    },
  }
};
</script>