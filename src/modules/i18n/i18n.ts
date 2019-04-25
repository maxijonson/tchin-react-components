import i18n from "i18next";
import markdownJsx from "i18next-markdown-jsx-plugin";
import * as _ from "lodash";
import { initReactI18next } from "react-i18next";

import { SESSION_KEYS } from "src/config";
import enLong from "src/i18n/en/en-long.json";
import en from "src/i18n/en/en.json";
import frLong from "src/i18n/fr/fr-long.json";
import fr from "src/i18n/fr/fr.json";

const DEFAULT_LNG = "en";

i18n.languages = [DEFAULT_LNG, "fr"];
i18n.use(markdownJsx)
    .use(initReactI18next)
    .init({
        load: "languageOnly",
        resources: {
            en: {
                translation: {
                    ...{ long: enLong },
                    ...en,
                },
            },
            fr: {
                translation: {
                    ...en,
                    ...{ long: enLong },
                    ...{ long: frLong },
                    ...fr,
                },
            },
        },
        lng: (() => {
            const savedLng = window.sessionStorage.getItem(SESSION_KEYS.i18n);
            if (
                savedLng &&
                _.includes(
                    i18n.languages,
                    window.sessionStorage.getItem(SESSION_KEYS.i18n),
                )
            ) {
                return savedLng;
            }
            for (const lng of i18n.languages) {
                if (_.includes(navigator.language, lng)) {
                    return lng;
                }
            }
            return DEFAULT_LNG;
        })(),
        fallbackLng: DEFAULT_LNG,
    });

export const t = (
    key: string | string[],
    options?: i18n.TOptions<i18n.StringMap> | undefined,
) => i18n.t(key, options);

export default i18n;
