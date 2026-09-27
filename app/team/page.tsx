"use client";
import Image from "next/image";
import Link from "next/link";
import { LanguageFrame } from "../../components/LanguageFrame";
import { useLocale } from "../../lib/useLocale";
import { assetPath } from "../../lib/assetPath";
import { ponyMembers } from "../../data/siteContent";
import { materialMembers } from "../../data/materialMembers";
import { localizedMember } from "../../lib/localizedMember";
import { hasContent } from "../../lib/memberContent";

export default function TeamPage() {
  const [locale,setLocale]=useLocale();
  const t=(zh:string,en:string)=>locale === "zh" ? zh : en;
  const original=ponyMembers[locale].filter(m=>["lu-mingyue","chen-yan","lu-zhihui","yang-junchao"].includes(m.slug)).map(m=>({...m,quote:m.intro,destination:"destination" in m ? String(m.destination) : ""}));
  const imported=materialMembers.map(m=>localizedMember(m,locale));
  const groups=[
    {id:"assistant",title:t("实验室助理","Lab Assistant"),members:original.filter(m=>m.slug === "lu-mingyue")},
    {id:"faculty",title:t("教师与科研人员","Faculty and Research Staff"),members:imported.filter(m=>m.group === "faculty")},
    {id:"phd",title:t("在读博士生","Doctoral Students"),members:[...original.filter(m=>["chen-yan","lu-zhihui"].includes(m.slug)),...imported.filter(m=>m.group === "currentPhd")]},
    {id:"masters",title:t("在读硕士生","Master's Students"),members:imported.filter(m=>m.group === "currentMaster")},
    {id:"phd-alumni",title:t("毕业博士生","Doctoral Alumni"),members:[...original.filter(m=>m.slug === "yang-junchao"),...imported.filter(m=>m.group === "graduatedPhd")]},
    {id:"masters-alumni",title:t("毕业硕士生","Master's Alumni"),members:imported.filter(m=>m.group === "graduatedMaster")},
    {id:"undergraduate-alumni",title:t("毕业本科生","Undergraduate Alumni"),members:imported.filter(m=>m.group === "graduatedUndergraduate")},
  ].filter(g=>g.members.length);
  return <LanguageFrame active="team" locale={locale} onLocaleChange={setLocale}>
    <div className="page-wrap">
      <header className="page-heading"><p className="eyebrow">{t("Team","Our People")}</p><h1>{t("团队成员","Team")}</h1></header>
      <nav className="section-nav" aria-label={t("成员分类","Member groups")}>{groups.map(g=><a key={g.id} href={`#${g.id}`}>{g.title}</a>)}</nav>
      {groups.map(group=><section className="team-section" id={group.id} key={group.id}><h2>{group.title}</h2><div className="team-grid">{group.members.map(m=><article className="member-card" key={m.slug}>
        <div className={`member-photo${m.photo ? "" : " no-photo"}`}>{m.photo ? <Image src={assetPath(m.photo)} alt={m.name} fill sizes="(max-width: 600px) 45vw, (max-width: 900px) 46vw, 340px"/> : <span aria-hidden="true">{locale === "zh" ? m.name.slice(-2) : m.name.split(" ").map(n=>n[0]).join("")}</span>}</div>
        <h3><Link href={`/team/${m.slug}/?lang=${locale}`}>{m.name}</Link></h3><p className="english-name">{m.enName}</p>
        <dl className="member-facts"><div><dt>{group.id === "faculty" ? t("职务","Appointment") : group.id === "assistant" ? t("身份","Role") : t("年级","Year")}</dt><dd>{m.role}</dd></div>
          {hasContent(m.destination) && <div><dt>{t("毕业去向","Placement")}</dt><dd>{m.destination}</dd></div>}
          <div><dt>{t("研究兴趣","Research Interests")}</dt><dd>{m.interest}</dd></div>
          {m.email && <div><dt>{t("邮箱","Email")}</dt><dd><a href={`mailto:${m.email}`}>{m.email}</a></dd></div>}
        </dl>
        {hasContent(m.quote) && <p className="member-quote">{m.quote}</p>}
      </article>)}</div></section>)}
    </div>
  </LanguageFrame>;
}
