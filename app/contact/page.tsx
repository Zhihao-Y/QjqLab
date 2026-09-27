"use client";
import { LanguageFrame } from "../../components/LanguageFrame";
import { LinkedText } from "../../components/LinkedText";
import { useLocale } from "../../lib/useLocale";
import { contactText } from "../../data/contactText";
import { contactEnglish } from "../../data/contactEnglish";

const headings = new Set([3,16,20,24,28,31,34]);
const directions = [6,8,10,12,14];
export default function ContactPage() {
  const [locale,setLocale]=useLocale();
  const text=locale === "zh" ? contactText : contactEnglish;
  return <LanguageFrame active="contact" locale={locale} onLocaleChange={setLocale}><article className="page-wrap reading-wrap">
    <header className="page-heading"><p className="eyebrow">{locale === "zh" ? "Contact" : "Join Us & Collaborate"}</p><h1>{text[0]}</h1></header>
    <div className="reading-content">{text.slice(1).map((paragraph,i)=>{
      const index=i+1;
      if(headings.has(index)) return <h2 key={index}>{paragraph}</h2>;
      if(directions.includes(index)) return <h3 key={index}><span className="text-primary-2">{directions.indexOf(index)+1}. </span>{paragraph}</h3>;
      return <p key={index}><LinkedText text={paragraph}/></p>;
    })}</div>
  </article></LanguageFrame>;
}
