import { createContext, useContext, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SettingsContext = createContext(null);

function initialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // storage unavailable
  }
  return "dark";
}

export function SettingsProvider({ children }) {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(initialTheme);
  const lang = i18n.language;

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = i18n.t("meta.title");
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore
    }
  }, [lang, i18n]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => i18n.changeLanguage(lang === "ar" ? "en" : "ar");

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
