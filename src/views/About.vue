<template>
  <div class="about">
    <h1>This is an about page {{ $t("page") }}</h1>
    <p>{{ t("localMsg") }}</p>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n({
      locale: "en",
      messages: {
        en: {
          localMsg: "This is a local message",
        },
      },
    });

    return { t };
  },
};
</script>
