import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {
    getLanguage
} from '@/utils/common'

import ElementEnLocale from 'element-ui/lib/locale/lang/en';
import ElementZhLocale from 'element-ui/lib/locale/lang/zh-CN';

import enLocale from './en'
import zhLocale from './zh'


const messages = {
    en: {
        ...enLocale,
        ...ElementEnLocale
    },
    zh: {
        ...zhLocale,
        ...ElementZhLocale
    }
}

Vue.use(VueI18n)

export const getLocale = () => {
    const cookieLanguage = getLanguage()
    if (cookieLanguage) {
        return cookieLanguage
    }

    const language = navigator.language.toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'en'
}

export default new VueI18n({
    locale: getLocale(),
    messages
})