import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/translations/en.json";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
  },
});
