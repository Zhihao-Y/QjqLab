"use client";

import { useState } from "react";
import { LanguageFrame } from "../../components/LanguageFrame";
import { Locale, researchAreas } from "../../data/siteContent";

export default function ResearchPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const areas = researchAreas[locale];

  return (
    <LanguageFrame active="research" locale={locale} onLocaleChange={setLocale}>
          <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
            <div className="max-w-4xl">
              <p className="text-xs font-normal uppercase tracking-[0.32em] text-primary-2">
                Research
              </p>
              <h1 className="mt-7 text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
                {locale === "zh" ? "研究方向" : "Research Areas"}
              </h1>
              <p className="mt-8 text-xl font-light leading-9 text-ink-2">
                {locale === "zh"
                  ? "我们的研究围绕运动营养与健康促进中的关键科学问题，面向大众健康、竞技体育和运动健康产业的真实需求，开展从基础机制、评价方法到干预策略和成果转化的系统研究。实验室长期关注身体活动与能量代谢、运动营养与运动表现、补液与体液调节、营养教育、运动营养产品功效验证及可穿戴设备应用等方向，致力于为健康中国、全民健身、竞技体育备战和运动健康产品研发提供科学依据与技术支持。"
                  : "This page presents the main research areas, concise descriptions, selected papers, and the problems each area is suited to address."}
              </p>
            </div>

            <div className="mt-16 space-y-16">
              {areas.map((area, index) => (
                <article
                  key={area.title}
                  className="grid gap-8 border-t border-accent-2 pt-10 lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="min-h-72 border border-accent-2 bg-paper-2 p-6">
                    <p className="text-sm font-normal text-primary-2">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="mt-14 grid h-36 grid-cols-5 gap-2" aria-hidden="true">
                      <span className="bg-primary-1" />
                      <span className="mt-8 bg-primary-2" />
                      <span className="mt-4 bg-primary-3" />
                      <span className="mt-12 bg-accent-1" />
                      <span className="mt-2 bg-accent-2" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-normal uppercase tracking-[0.22em] text-primary-2">
                      {area.kicker}
                    </p>
                    <h2 className="mt-5 text-3xl font-bold text-ink-1">{area.title}</h2>
                    <p className="mt-6 text-lg font-light leading-9 text-ink-2">{area.text}</p>
                    <p className="mt-6 border-l-2 border-primary-2 pl-5 text-base font-light leading-8 text-ink-2">
                      {area.problems}
                    </p>
                    <div className="mt-8">
                      <p className="text-sm font-normal uppercase tracking-[0.18em] text-accent-1">
                        {locale === "zh" ? "代表论文 / 成果" : "Selected Work"}
                      </p>
                      <ul className="mt-4 space-y-3 text-base font-light leading-7 text-ink-2">
                        {area.papers.map((paper) => (
                          <li key={paper}>- {paper}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
    </LanguageFrame>
  );
}
