"use client";

import Image from "next/image";
import Link from "next/link";
import { assetPath } from "../lib/assetPath";
import { Locale, site } from "../data/siteContent";

type LanguageFrameProps = {
  active: "home" | "research" | "professor" | "team" | "publications" | "gallery" | "contact";
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  children: React.ReactNode;
};

const navItems = [
  { key: "home", href: "/" },
  { key: "research", href: "/research" },
  { key: "professor", href: "/professor" },
  { key: "team", href: "/team" },
  { key: "publications", href: "/publications" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export function LanguageFrame({
  active,
  locale,
  onLocaleChange,
  children,
}: LanguageFrameProps) {
  const copy = site[locale] ?? site.zh;
  const nextLocale: Locale = locale === "zh" ? "en" : "zh";

  return (
    <main className="min-h-screen bg-paper-1 text-ink-1">
      <header className="border-b border-accent-2 bg-paper-1">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={assetPath("/运动营养与健康实验室logo.png")}
              alt="运动营养与健康实验室 logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-contain"
              priority
            />
            <span className="text-lg font-bold tracking-normal text-ink-1">
              {copy.shortName}
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 sm:gap-7">
            <nav className="flex flex-wrap items-center gap-4 text-base font-light text-ink-2 sm:gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={
                    active === item.key
                      ? "text-ink-1 underline decoration-primary-2 decoration-1 underline-offset-8"
                      : "transition hover:text-primary-1"
                  }
                >
                  {copy[item.key]}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => onLocaleChange(nextLocale)}
              className="border border-primary-2 bg-primary-2 px-4 py-2 text-sm font-bold text-paper-1 transition hover:border-primary-1 hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-2/30"
              aria-label={copy.switchLabel}
            >
              {copy.language}
            </button>
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
