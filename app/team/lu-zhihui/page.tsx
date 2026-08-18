"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { assetPath } from "../../../lib/assetPath";
import { LanguageFrame } from "../../../components/LanguageFrame";
import { Locale, studentProfiles } from "../../../data/siteContent";

export default function LuZhihuiPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const profile = studentProfiles["lu-zhihui"][locale];
  const member = profile.member;
  const publications =
    profile.publications.length > 0 ? profile.publications : studentProfiles["lu-zhihui"].zh.publications;

  return (
    <LanguageFrame active="team" locale={locale} onLocaleChange={setLocale}>
      <section className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-14">
        <Link href="/team" className="text-sm font-light text-primary-2 underline underline-offset-4">
          {locale === "zh" ? "返回团队成员" : "Back to Team"}
        </Link>

        <div className="mt-6 grid gap-10 border-t border-accent-2 pt-8 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="border-b border-accent-2 pb-8 lg:border-b-0 lg:border-r lg:pr-8">
            <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full bg-paper-2 ring-1 ring-accent-2">
              <Image src={assetPath(member.photo)} alt={`${member.name} photo`} fill sizes="224px" className="object-cover" priority />
            </div>
            <p className="mt-8 text-xs font-normal uppercase tracking-[0.28em] text-primary-2">
              Student Profile
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink-1">{member.name}</h1>
            <p className="mt-2 text-lg font-light text-ink-2">{member.enName}</p>
            <dl className="mt-6 space-y-3 text-sm font-light leading-6 text-ink-2">
              <div><dt className="font-normal text-accent-1">{locale === "zh" ? "年级" : "Year"}</dt><dd>{member.role}</dd></div>
              <div><dt className="font-normal text-accent-1">{locale === "zh" ? "研究兴趣" : "Research Interest"}</dt><dd>{member.interest}</dd></div>
              <div><dt className="font-normal text-accent-1">{locale === "zh" ? "毕业时间" : "Graduation"}</dt><dd>{member.graduation}</dd></div>
              <div><dt className="font-normal text-accent-1">{locale === "zh" ? "邮箱" : "Email"}</dt><dd className="break-words">{member.email}</dd></div>
              <div><dt className="font-normal text-accent-1">{locale === "zh" ? "一句话介绍" : "One-line Bio"}</dt><dd>{member.intro}</dd></div>
            </dl>
          </aside>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-ink-1">{locale === "zh" ? "自我介绍" : "Self Introduction"}</h2>
              <div className="mt-4 space-y-3 text-sm font-light leading-7 text-ink-2">
                {profile.selfIntro.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
            <section className="border-t border-accent-2 pt-6">
              <h2 className="text-2xl font-bold text-ink-1">{locale === "zh" ? "奖项荣誉" : "Awards and Honors"}</h2>
              <ul className="mt-4 space-y-2 text-sm font-light leading-6 text-ink-2">
                {profile.awards.map((item) => <li key={item}>- {item}</li>)}
              </ul>
            </section>
            <section className="border-t border-accent-2 pt-6">
              <h2 className="text-2xl font-bold text-ink-1">{locale === "zh" ? "发表" : "Publications"}</h2>
              <ol className="mt-4 space-y-2 text-sm font-light leading-6 text-ink-2">
                {publications.map((item, index) => (
                  <li key={item}><span className="font-bold text-primary-2">{String(index + 1).padStart(2, "0")}</span> {item}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>
    </LanguageFrame>
  );
}
