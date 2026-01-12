// i18n.d.ts
import en from './app/locales/en.json';

type MessageSchema = typeof en;

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
