import AsyncStorage from "@react-native-async-storage/async-storage";
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

type ResourceMap = Record<LocaleCode, Partial<ResourceBundle>>;

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
const LANGUAGE_STORAGE_KEY = "@doc-app/language";

const isSupportedLanguage = (code: string): code is LocaleCode =>
  supportedCodes.includes(code as LocaleCode);

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
    ns: [
      "common",
      "home",
      "settings",
      "settingsMenu",
      "shared",
      "folders",
      "scan",
      "preview",
      "auth",
      "folderDetail",
      "stack",
      "security",
      "planDetails",
    ],
    interpolation: {
      escapeValue: false,
    },
  });

  void (async () => {
    try {
      const persistedCode = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (persistedCode && isSupportedLanguage(persistedCode)) {
        if (i18n.language !== persistedCode) {
          await i18n.changeLanguage(persistedCode);
        }
      }
    } catch (error) {
      console.warn("i18n: failed to load persisted language", error);
    }
  })();
}

export const changeLanguage = async (code: LocaleCode) => {
  if (!supportedCodes.includes(code)) {
    return;
  }

  if (i18n.language !== code) {
    await i18n.changeLanguage(code);
  }

  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch (error) {
    console.warn("i18n: failed to persist language", error);
  }
};

export { i18n };
export type { LocaleCode };
