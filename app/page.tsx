"use client";
import Image from "next/image";
import Link from "next/link";
import { assetPath } from "../lib/assetPath";
import { useLocale } from "../lib/useLocale";
import { LanguageFrame } from "../components/LanguageFrame";
import { entryCards, researchAreas, site } from "../data/siteContent";

export default function Home() {
  const [locale, setLocale] = useLocale();
  const copy = site[locale];
  return <LanguageFrame active="home" locale={locale} onLocaleChange={setLocale}>
    <div className="page-wrap">
      <section className="home-heading">
        <p className="eyebrow">{locale === "zh" ? "Sports Nutrition & Health Laboratory" : "Beijing Sport University"}</p>
        <h1>{copy.labName}</h1>
        <p className="intro">{copy.positioning}</p>
        <figure className="home-photo"><Image src={assetPath("/home/lab-home-group.jpg")} alt={locale === "zh" ? "运动营养与健康实验室团队合照" : "The Sports Nutrition and Health Laboratory team"} fill sizes="(max-width: 1120px) 95vw, 1056px" priority /></figure>
        <p className="home-note">{copy.intro}</p>
        <p className="home-cta"><Link className="text-link" href={`/contact/?lang=${locale}`}>{copy.cta}</Link></p>
      </section>
    </div>
    <section className="page-wrap home-focus">
      <h2>{locale === "zh" ? "搭建科研与实践的桥梁" : "Bridging Research and Practice"}</h2>
      <div className="focus-grid">{researchAreas[locale].map((area, i) => <Link key={area.title} href={`/research/?lang=${locale}#area-${i + 1}`}><p className="eyebrow">{area.kicker}</p><h3>{area.title}</h3><p>{area.text}</p></Link>)}</div>
    </section>
    <section className="location-band"><div className="location-inner">
      <div className="location-heading"><div><h2>{locale === "zh" ? "实验室位置" : "Find Us"}</h2><p>{copy.address}</p></div><a href="https://maps.app.goo.gl/SwpJcxNYWsyBGGJv8" target="_blank" rel="noreferrer">{locale === "zh" ? "在 Google Maps 中查看" : "View on Google Maps"} ↗</a></div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2961.221280306098!2d116.31494125035881!3d40.022596168405194!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDAxJzIwLjgiTiAxMTbCsDE5JzAyLjAiRQ!5e0!3m2!1sen!2suk!4v1782621287011!5m2!1sen!2suk" title={locale === "zh" ? "实验室地图" : "Lab location map"} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      <nav className="home-directory" aria-label={locale === "zh" ? "网站目录" : "Site directory"}>{entryCards[locale].map(card => <Link key={card.href} href={`${card.href}/?lang=${locale}`}>{locale === "zh" ? card.title : card.subtitle}</Link>)}</nav>
    </div></section>
  </LanguageFrame>;
}
