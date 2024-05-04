<template>
  <Menubar :model="items">
    <template #start>
      <router-link to="/">
        <Button class="p-button-link p-0 px-2 mr-2">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="h-8"
            width="35"
            height="40"
          />
          <h3 class="ml-2">{{ $t("maskinrummet") }}</h3>
        </Button>
      </router-link>
    </template>

    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
    </template>

    <template #end>
      <Dropdown
        v-model="selectedLang"
        :options="langs"
        optionLabel="name"
        @change="changeLang"
      />
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import Dropdown from "primevue/dropdown";
import { langs } from "@/i18n";
import Button from "primevue/button";

export default {
  name: "AppHeader",
  components: {
    Menubar,
    Dropdown,
    Button,
  },
  computed: {
    items() {
      return [
        { label: this.$t("howTo"), route: "/how-to" },
        { label: this.$t("about"), route: "/about" },
        { label: this.$t("contact"), route: "/contact" },
      ];
    },
  },
  data() {
    return {
      langs: langs,
      selectedLang: { name: this.$t("currLanguage"), value: this.$i18n.locale },
    };
  },
  methods: {
    changeLang() {
      this.$i18n.locale = this.selectedLang.value;
    },
  },
};
</script>
