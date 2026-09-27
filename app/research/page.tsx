"use client";
import { LanguageFrame } from "../../components/LanguageFrame";
import { useLocale } from "../../lib/useLocale";
import { researchAreas } from "../../data/siteContent";
import { researchIntro, researchLinks } from "../../data/researchLinks";

export default function ResearchPage() {
  const [locale, setLocale] = useLocale();
  return <LanguageFrame active="research" locale={locale} onLocaleChange={setLocale}>
    <div className="page-wrap reading-wrap">
      <header className="page-heading"><p className="eyebrow">{locale === "zh" ? "Research" : "Our Work"}</p><h1>{locale === "zh" ? "研究方向" : "Research"}</h1><p className="page-deck">{researchIntro[locale]}</p></header>
      {researchAreas[locale].map((area,i) => <section className="research-area" id={`area-${i+1}`} key={i}>
        <p className="kicker">{String(i+1).padStart(2,"0")} / {area.kicker}</p><h2>{area.title}</h2>
        <p>{area.text}</p><p className="questions">{area.problems}</p>
        <h3>{locale === "zh" ? "代表论文与成果" : "Selected Publications and Outputs"}</h3>
        <ol className="paper-list">{researchAreas.zh[i].papers.map((paper,j) => <li key={paper}><span className="marker">{j+1}.</span><a href={researchLinks[i][j].url} target="_blank" rel="noreferrer">{locale === "en" && researchLinks[i][j].en ? researchLinks[i][j].en : paper}</a></li>)}</ol>
      </section>)}
    </div>
  </LanguageFrame>;
}
