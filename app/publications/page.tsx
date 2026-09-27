"use client";
import { LanguageFrame } from "../../components/LanguageFrame";
import { LinkedText } from "../../components/LinkedText";
import { useLocale } from "../../lib/useLocale";
import { fullPublicationContent } from "../../data/fullPublicationContent";

export default function PublicationsPage() {
  const [locale,setLocale]=useLocale();
  const copy=fullPublicationContent[locale];
  return <LanguageFrame active="publications" locale={locale} onLocaleChange={setLocale}>
    <article className="page-wrap"><header className="page-heading"><p className="eyebrow">{locale === "zh" ? "Publications" : "Research Outputs"}</p><h1>{copy.heading}</h1></header>
      <nav className="section-nav" aria-label={locale === "zh" ? "论文分类" : "Publication categories"}>{copy.categories.map((c,i)=><a key={i} href={`#publications-${i}`}>{c.title}</a>)}</nav>
      {copy.categories.map((category,i)=><section className="publication-section" id={`publications-${i}`} key={i}><h2>{category.title}</h2><ol className="paper-list" reversed start={category.items.length}>{category.items.map((item,j)=><li key={j}><span className="marker">{category.items.length-j}.</span><span><LinkedText text={item}/></span></li>)}</ol></section>)}
    </article>
  </LanguageFrame>;
}
