import i18n from "i18next";
import { windowLocalStorage } from "core/misc/window-storage";
import settings from "settings";

import english from "translation/english";
import arabic from "translation/arabic";

import uedaEnglish from "ueda/translation/english";
import uedaArabic from "ueda/translation/english";

i18n.init({
    lng: windowLocalStorage.get("locale") || settings.default_culture,
    resources: {
        en: {
            translations: {
                ...english.translations,
                ...uedaEnglish.translations
            }
        },
        ar: {
            translations: {
                ...arabic.translations,
                ...uedaArabic.translations
            }
        },
    },
    fallbackLng: "en",
    debug: __localhost,

    ns: ["translations"],
    defaultNS: "translations",

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
