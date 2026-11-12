<template>
  <div v-if="inputTexts">
    <DataTable :value="inputTexts" size="small" paginator :rows="10">
      <template #empty
        ><div class="text-center">{{ $t("emptyDataset") }}</div></template
      >
      <Column field="text"
        ><template #header>
          <div class="flex justify-content-between w-full">
            <div class="flex">{{ $t("inputTexts") }}</div>
            <div class="flex">
              <Tag :severity="open ? 'success' : 'danger'">{{
                open ? $t("openForInput") : $t("closedForInput")
              }}</Tag>
            </div>
          </div>
        </template>
        ></Column
      >
    </DataTable>
  </div>
  <div v-else>{{ $t("loading") }}</div>
</template>

<script>

export default {
  name: "ShowDataset",
  props: {
    dataset: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        name: "",
        json_string: "",
        is_open: false,
      }),
    },
  },
  data() {
    return { };
  },
  computed: {
    inputTexts() {
      if (!this.dataset) {
        return null;
      }
      return this.dataset.sentences.map((x) => ({
        text: x.text,
      }));
    },
    open() {
      return this.dataset.is_open;
    },
  },
};
</script>
