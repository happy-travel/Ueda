import i18n from 'i18next';
import { windowLocalStorage } from 'matsumoto/src/core/misc/window-storage';
import matsumotoEnglish from 'matsumoto/src/translation/english';
import matsumotoArabic from 'matsumoto/src/translation/arabic';
import settings from 'settings';

i18n.init({
    lng: windowLocalStorage.get('locale') || settings.defaultCulture,
    resources: {
        en: matsumotoEnglish,
        ar: matsumotoArabic,
    },
    fallbackLng: 'en',
    // eslint-disable-next-line no-undef
    debug: __localhost,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: true,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;
