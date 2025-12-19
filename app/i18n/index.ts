import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE, LANGUAGES, LocaleCode } from "./languages";
import am from "./resources/am.json";
import ar from "./resources/ar.json";
import en from "./resources/en.json";
import fr from "./resources/fr.json";
import hi from "./resources/hi.json";
import rw from "./resources/rw.json";
import sw from "./resources/sw.json";
import zh from "./resources/zh.json";

type ResourceBundle = typeof en;

type ResourceMap = Record<LocaleCode, ResourceBundle>;

const resources: ResourceMap = {
  en,
  rw,
  fr,
  ar,
  am,
  hi,
  zh,
  sw,
};

const supportedCodes = LANGUAGES.map((language) => language.code);

const resolveInitialLanguage = (): LocaleCode => {
  const locales = Localization.getLocales();

  if (Array.isArray(locales) && locales.length > 0) {
    for (const locale of locales) {
      const languageCode = locale.languageCode?.toLowerCase();
      if (languageCode && supportedCodes.includes(languageCode as LocaleCode)) {
        return languageCode as LocaleCode;
      }
    }
  }

  return DEFAULT_LANGUAGE;
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: resolveInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: supportedCodes,
    compatibilityJSON: "v4",
    defaultNS: "common",
    fallbackNS: "common",
    ns: ["common", "home", "settings"],
    interpolation: {
      escapeValue: false,
    },
  });
}

export const changeLanguage = async (code: LocaleCode) => {
  if (!supportedCodes.includes(code)) {
    return;
  }

  await i18n.changeLanguage(code);
};

export { i18n };
export type { LocaleCode };
