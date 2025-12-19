export type LocaleCode = "rw" | "en" | "fr" | "ar" | "am" | "hi" | "zh" | "sw";

export type LanguageOption = {
  code: LocaleCode;
  label: string;
  nativeName: string;
  dir?: "ltr" | "rtl";
};

export const LANGUAGES: LanguageOption[] = [
  { code: "rw", label: "Kinya", nativeName: "Ikinyarwanda" },
  { code: "en", label: "English", nativeName: "English" },
  { code: "fr", label: "French", nativeName: "Français" },
  { code: "ar", label: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "am", label: "Amharic", nativeName: "አማርኛ" },
  { code: "hi", label: "Indian (Hindi)", nativeName: "हिन्दी" },
  { code: "zh", label: "Chinese", nativeName: "中文" },
  { code: "sw", label: "Swahili", nativeName: "Kiswahili" },
];

export const DEFAULT_LANGUAGE: LocaleCode = "en";
