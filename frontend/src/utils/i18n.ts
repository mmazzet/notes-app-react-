
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import React, { Suspense } from "react";



i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:["en", "it"],
    fallbackLng: "en",
    detection: {
        order: ['cookie','htmlTag', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json'
    },
  });

export default i18n;
