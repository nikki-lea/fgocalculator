import i18n from 'i18next';
import en from './en/translation.json';
import jp  from './jp/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en,
    jp
} as const;

i18n.use(initReactI18next)
  .init({
    resources,
    defaultNS: "common",
    fallbackLng: "en",
  });