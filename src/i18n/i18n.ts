import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enLocale } from './locales/en.locale';
import { frLocale } from './locales/fr.locale';

const resources = {
  en: { translation: enLocale },
  fr: { translation: frLocale },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
