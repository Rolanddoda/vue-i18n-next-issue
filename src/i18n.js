import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const SUPPORTED_LOCALES = new Map();
SUPPORTED_LOCALES.set("en", { value: "en", label: "English" });
SUPPORTED_LOCALES.set("de", { value: "de", label: "Dutch" });

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {},
});

export function setI18nLanguage(locale) {
  if (i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale;
    document.querySelector("html").setAttribute("lang", locale);
  }
}

export function addMessages(locale, messages) {
  i18n.global.setLocaleMessage(locale, messages);

  return nextTick();
}
