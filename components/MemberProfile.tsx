"use client";
import Image from "next/image";
import Link from "next/link";
import { LanguageFrame } from "./LanguageFrame";
import { LinkedText } from "./LinkedText";
import { assetPath } from "../lib/assetPath";
import type { Locale } from "../data/siteContent";

export type ProfileSection = { title: string; items: readonly string[]; numbered?: boolean };
export type ProfileData = {
  name: string; enName: string; photo?: string;
  facts: { label: string; value: string }[];
  sections: ProfileSection[];
};
export function MemberProfile({ profile, locale, setLocale }: { profile: ProfileData; locale: Locale; setLocale: (locale: Locale) => void }) {
  return <LanguageFrame active="team" locale={locale} onLocaleChange={setLocale}>
    <article className="page-wrap">
      <Link className="text-link" href={`/team/?lang=${locale}`}>{locale === "zh" ? "返回团队成员" : "Back to Team"}</Link>
      <div className="profile-grid">
        <aside className="profile-sidebar">
          {profile.photo && <Image className="portrait" src={assetPath(profile.photo)} alt={profile.name} width={150} height={150} priority />}
          <h1>{profile.name}</h1><p className="english-name">{profile.enName}</p>
          <dl className="member-facts">{profile.facts.filter(f=>f.value).map((f,i)=><div key={i}><dt>{f.label}</dt><dd><LinkedText text={f.value}/></dd></div>)}</dl>
        </aside>
        <div className="profile-body">{profile.sections.filter(s=>s.items.length).map((section,i)=><section key={i}>
          <h2>{section.title}</h2>
          {section.numbered ? <ol className="paper-list">{section.items.map((item,j)=><li key={j}><span className="marker">{j+1}.</span><span><LinkedText text={item.replace(/^\s*(?:\[\d+\]|\d+[.、)）])\s*/,"")}/></span></li>)}</ol> : section.items.map((item,j)=><p key={j}><LinkedText text={item}/></p>)}
        </section>)}</div>
      </div>
    </article>
  </LanguageFrame>;
}
