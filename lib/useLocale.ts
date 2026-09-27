"use client";
import { useSyncExternalStore } from "react";
import type { Locale } from "../data/siteContent";
const subscribe = (callback: () => void) => {
  window.addEventListener("lab-locale", callback);
  window.addEventListener("storage", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("lab-locale", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener("popstate", callback);
  };
};
function getLocale(): Locale {
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "en" || query === "zh") return query;
  try { return localStorage.getItem("lab-locale") === "en" ? "en" : "zh"; }
  catch { return "zh"; }
}
export function useLocale(): [Locale, (locale: Locale) => void] {
  const locale = useSyncExternalStore(subscribe, getLocale, () => "zh" as Locale);
  const setLocale = (next: Locale) => {
    try { localStorage.setItem("lab-locale", next); } catch { /* Storage may be disabled. */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event("lab-locale"));
  };
  return [locale, setLocale];
}
