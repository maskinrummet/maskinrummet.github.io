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
        <template #body="slotProps">
          <TruncatedText :text="slotProps.data.text"></TruncatedText> </template
      ></Column>
    </DataTable>
    <form @submit="verify">
      <div class="flex justify-content-between">
        <InputGroup>
          <FloatLabel>
            <Password v-model="password" :feedback="false" toggleMask />
            <label for="password-input">{{ $t("datasetPassword") }}</label>
          </FloatLabel>
          <Button :label="$t('editDataset')" type="submit" severity="success" />
        </InputGroup>
        <Button
          :label="$t('refreshDataset')"
          @click="$emit('refresh')"
          class="ml-2"
        ></Button>
      </div>
      <transition-group name="p-message" tag="div">
        <Message severity="error" v-if="error" :closable="false">
          <template #container
            ><div class="p-2">{{ error }}</div></template
          >
        </Message>
      </transition-group>
    </form>
  </div>
  <div v-else>{{ $t("loading") }}</div>
</template>

<script>
import { verifyPassword } from "@/api";
import TruncatedText from "./TruncatedText.vue";

export default {
  name: "ShowDataset",
  components: { TruncatedText },
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
    return {
      password: "",
      error: "",
    };
  },
  methods: {
    verify(e) {
      e.preventDefault();
      verifyPassword(this.dataset.id, this.password)
        .then(() => {
          this.$emit("edit", this.password);
          this.error = "";
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
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
