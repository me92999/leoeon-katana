import { getRequestConfig } from "next-intl/server";

export const locales = [
  "en",
  "zh",
  "zh-Hant",
  "ru",
  "es",
  "ja",
  "ko",
  "it",
  "de",
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
    timeZone: "UTC",
  };
});
