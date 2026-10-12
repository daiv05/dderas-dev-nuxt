// i18n.d.ts
import type en from './app/locales/en.json';

type MessageSchema = typeof en;

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
