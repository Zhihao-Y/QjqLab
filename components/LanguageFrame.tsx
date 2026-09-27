"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { assetPath } from "../lib/assetPath";
import { Locale, site } from "../data/siteContent";
const navItems = [
  { key: "home", href: "/" }, { key: "research", href: "/research/" },
  { key: "professor", href: "/professor/" }, { key: "team", href: "/team/" },
  { key: "publications", href: "/publications/" }, { key: "gallery", href: "/gallery/" },
  { key: "contact", href: "/contact/" },
] as const;
type Props = {
  active: typeof navItems[number]["key"];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  children: React.ReactNode;
};
export function LanguageFrame({ active, locale, onLocaleChange, children }: Props) {
  const copy = site[locale];
  useEffect(() => { document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"; }, [locale]);
  return (
    <div className="site-shell">
      <div className="site-backdrop" style={{ backgroundImage: `url('${assetPath("/home/beijing-sport-university.jpg")}')` }} aria-hidden="true" />
      <a className="skip-link" href="#content">{locale === "zh" ? "跳转到正文" : "Skip to content"}</a>
      <header className="site-header">
        <div className="header-inner">
          <Link href={`/?lang=${locale}`} className="brand">
            <Image src={assetPath("/brand/lab-logo.jpg")} alt="" width={60} height={60} priority />
            <span>{locale === "zh" ? copy.shortName : <>Sports Nutrition<br />&amp; Health Laboratory</>}</span>
          </Link>
          <nav className="site-nav" aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
            {navItems.map(item => <Link key={item.key} href={`${item.href}?lang=${locale}`} aria-current={active === item.key ? "page" : undefined}>{copy[item.key]}</Link>)}
          </nav>
          <button className="language-toggle" type="button" onClick={() => onLocaleChange(locale === "zh" ? "en" : "zh")} aria-label={copy.switchLabel}>{locale === "zh" ? "EN" : "中文"}</button>
        </div>
      </header>
      <main id="content">{children}</main>
      <footer className="site-footer"><div className="footer-inner"><span>{copy.shortName}</span><span>{locale === "zh" ? "北京体育大学" : "Beijing Sport University"}</span><Link href={`/contact/?lang=${locale}`}>{copy.contact}</Link></div></footer>
    </div>
  );
}
