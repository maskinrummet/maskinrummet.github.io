<template>
  <div v-html="$t('createANewDatasetIntro')" class="m-2"></div>
  <form @submit="checkDataset">
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <label> {{ $t("datasetName") }} </label>
        <InputText v-model="datasetName" />
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <Password v-model="password" :feedback="false" toggleMask />
        <label>{{ $t("datasetPassword") }}</label>
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5">
      <FloatLabel>
        <Password v-model="passwordConfirm" :feedback="false" toggleMask />
        <label>{{ $t("confirmDatasetPassword") }}</label>
      </FloatLabel>
    </div>
    <div class="flex justify-content-center mb-5 align-items-center">
      <label class="mr-3">{{ $t("openDataset") }}</label>
      <ToggleButton
        v-model="open"
        :onLabel="$t('open')"
        :offLabel="$t('closed')"
        onIcon="pi pi-lock-open"
        offIcon="pi pi-lock"
        :aria-label="$t('openDataset')"
      />
    </div>
    <div class="flex justify-content-center">
      <label class="mr-2">{{ $t("startEmptyDataset") }}</label>
      <Checkbox v-model="startEmpty" :binary="true" />
    </div>
    <div v-if="!startEmpty">
      <div class="flex justify-content-center my-4">
        <h3>{{ $t("startingSentences") }}</h3>
      </div>
      <DataTable :value="displaySentences" size="small" paginator :rows="10">
        <template #empty
          ><div class="text-center">{{ $t("useModalBelow") }}</div></template
        >
        <Column field="text" :header="$t('text')"></Column>
        <Column :header="$t('action')">
          <template #body="{ index }">
            <Button
              severity="danger"
              :label="$t('delete')"
              @click="startingSentencesList.splice(index, 1)"
            ></Button>
          </template>
        </Column>
      </DataTable>
      <div class="flex justify-content-center">
        <Textarea v-model="startingSentences" rows="5" cols="30" class="w-10" />
      </div>
      <div class="flex mt-3">
        <InputGroup>
          <Dropdown
            v-model="splitBy"
            :options="splitByOptions"
            optionLabel="name"
            :placeholder="$t('selectSplitter')"
          ></Dropdown>
          <Button
            :label="$t('add')"
            :disabled="!splitBy"
            @click="splitStartingSentences"
          />
        </InputGroup>
      </div>
    </div>
    <transition-group name="p-message" tag="div">
      <Message severity="error" v-if="error" :closable="false">
        <template #container
          ><div class="p-2">{{ error }}</div></template
        >
      </Message>
    </transition-group>
    <div class="flex justify-content-end mt-3">
      <Button
        :label="$t('createDataset')"
        severity="success"
        type="submit"
      ></Button>
    </div>
  </form>
</template>

<script>
export default {
  name: "CreateDataset",
  data() {
    return {
      datasetName: "",
      password: "",
      passwordConfirm: "",
      open: true,
      startEmpty: true,
      startingSentences: "",
      startingSentencesList: [],
      splitBy: "",
      error: "",
      splitByOptions: [
        { name: "Don't split", value: null },
        { name: "Newline", value: "\n" },
        { name: "Period", value: "." },
        { name: "Comma", value: "," },
      ],
    };
  },
  methods: {
    truncateText(text, maxChars = 100) {
      return text.length > maxChars
        ? text.slice(0, maxChars - 3) + "..."
        : text;
    },
    splitStartingSentences() {
      this.startingSentencesList = [
        ...this.startingSentences
          .split(this.splitBy.value)
          .map((sentence) => sentence.trim())
          .filter((sentence) => sentence)
          .map((x) => {
            return { text: x };
          }),
        ...this.startingSentencesList,
      ];
    },
    checkDataset(e) {
      e.preventDefault();
      if (this.datasetName === "") {
        this.error = this.$t("emptyDatasetName");
        return;
      }
      if (this.datasetName.length > 150) {
        this.error = this.$t("longDatasetName");
        return;
      }
      if (this.password === "") {
        this.error = this.$t("emptyPassword");
        return;
      }
      if (this.password.length > 50) {
        this.error = this.$t("longPassword");
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.error = this.$t("passwordMismatch");
        return;
      }
      if (!this.startEmpty && this.startingSentencesList.length === 0) {
        this.error = this.$t("emptyStartingSentences");
        return;
      }
      this.$emit("datasetReady", {
        name: this.datasetName,
        password: this.password,
        is_open: this.open,
        json_string: JSON.stringify(
          this.startingSentencesList.map((x) => x.text)
        ),
      });
      this.error = "";
    },
  },
  computed: {
    displaySentences() {
      return this.startingSentencesList.map(({ text }) => ({
        text: this.truncateText(text),
      }));
    },
  },
};
</script>
