"use client";
import Image from "next/image";
import { LanguageFrame } from "../../components/LanguageFrame";
import { LinkedText } from "../../components/LinkedText";
import { useLocale } from "../../lib/useLocale";
import { assetPath } from "../../lib/assetPath";
import { professorText } from "../../data/professorText";
import { professorEnglish, professorInlineEnglish } from "../../data/professorEnglish";
import { majorProfessorSections, minorProfessorSections, inlineProfessorHeadings, splitProfessorParagraph } from "../../lib/professorContent";

export default function ProfessorPage() {
  const [locale,setLocale]=useLocale();
  const line=(index:number)=>locale === "zh" ? professorText[index] : professorEnglish[index] ?? professorText[index];
  const item=(text:string,key:string)=>{
    const matched=text.match(/^(\d+[)）])\s*(.*)$/);
    const body=matched ? matched[2] : text;
    return <div className="numbered-line" key={key}><span className="marker">{matched ? matched[1] : "-"}</span><span><LinkedText text={locale === "en" ? professorInlineEnglish[body] ?? body : body}/></span></div>;
  };
  return <LanguageFrame active="professor" locale={locale} onLocaleChange={setLocale}>
    <article className="page-wrap reading-wrap">
      <header className="professor-identity"><Image src={assetPath("/qiu-junqiang-current.png")} alt={line(0)} width={126} height={126} priority/><h1>{line(0)}</h1><p className="english-name">{line(1)}</p>{line(2).split("｜").map(title=><p className="appointment" key={title}>{title.trim()}</p>)}</header>
      <nav className="section-nav" aria-label={locale === "zh" ? "导师简介目录" : "Profile sections"}>{[3,16,18,100,119,140].map(i=><a href={`#professor-${i}`} key={i}>{line(i)}</a>)}</nav>
      <div className="reading-content">{professorText.slice(3).map((original,j)=>{
        const i=j+3;
        if(majorProfessorSections.has(i)) return <h2 id={`professor-${i}`} key={i}>{line(i)}</h2>;
        if(minorProfessorSections.has(i)) return [27,33,74,83].includes(i) ? <h4 key={i}>{line(i)}</h4> : <h3 key={i}>{line(i)}</h3>;
        if(i===17) return <p key={i}>{line(i)}</p>;
        if(i===70) return <div key={i}>{splitProfessorParagraph(original).map((part,k)=>inlineProfessorHeadings.includes(part) ? <h3 key={k}>{locale === "en" ? professorInlineEnglish[part] : part}</h3> : item(part,`${i}-${k}`))}</div>;
        return item(line(i),String(i));
      })}</div>
    </article>
  </LanguageFrame>;
}
