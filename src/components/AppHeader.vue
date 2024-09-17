<template>
  <Menubar :model="items">
    <template #start>
      <router-link :to="'/' + $i18n.locale">
        <Button class="p-button-link p-0 px-2 mr-1">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="h-8"
            width="35"
            height="40"
          />
          <h3 class="ml-2 text-purple-900">{{ $t("maskinrummet") }}</h3>
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
      <a
        v-else
        :href="item.link"
        target="_blank"
        v-bind="props.action"
        @click="navigate"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
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
import { langs } from "@/i18n";

export default {
  name: "AppHeader",
  components: {
    Menubar,
  },
  computed: {
    items() {
      return [
        {
          label: this.$t("howToUseTheSite"),
          route: `/${this.$i18n.locale}/how-to`,
        },
        { label: this.$t("about"), route: `/${this.$i18n.locale}/about` },
        { label: this.$t("contact"), route: `/${this.$i18n.locale}/contact` },
        {
          label: "GitHub",
          icon: "pi pi-github",
          link: "https://github.com/maskinrummet/maskinrummet.github.io",
        },
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
      this.$router.push({
        name: this.$route.name,
        params: { lang: this.$i18n.locale },
      });
    },
  },
  watch: {
    "$i18n.locale": function (newVal) {
      this.selectedLang = {
        name: this.$t("currLanguage"),
        value: newVal,
      };
    },
  },
};
</script>
