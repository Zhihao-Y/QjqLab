"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "../../lib/assetPath";
import { LanguageFrame } from "../../components/LanguageFrame";
import { Locale } from "../../data/siteContent";
import { professorText } from "../../data/professorText";

const sectionTitles = new Set([
  "教育与职业经历",
  "任职经历",
  "个人简介",
  "学术活动与成就",
  "主持或参与的重点项目",
  "代表性论文与成果(运动促进健康领域)",
  "一、运动促进健康领域",
  "二、运动营养与运动表现领域",
  "三、运动营养品研发与成果转化领域",
  "（1）代表性论文",
  "代表性论文",
  "SCI论文",
  "中文核心",
  "中文核心期刊论文",
  "（2）标准、指南、咨政、平台与专利成果",
  "（3）著作、教材、学术报告与推广成果",
  "代表性论文与成果（运动营养与运动表现领域）",
  "代表性论文与成果（运动营养品研发与成果转化领域）",
  "（1）代表性论文成果",
  "（2）著作、专利与训练监控成果",
  "（3）学术报告与实践服务成果",
  "（2）标准、报告与产业应用成果",
  "（3）著作与知识传播成果",
  "荣誉与奖项",
  "学术兼职",
  "联系方式",
]);

const majorTitles = new Set([
  "教育与职业经历",
  "任职经历",
  "个人简介",
  "学术活动与成就",
  "代表性论文与成果(运动促进健康领域)",
  "一、运动促进健康领域",
  "二、运动营养与运动表现领域",
  "三、运动营养品研发与成果转化领域",
  "代表性论文与成果（运动营养与运动表现领域）",
  "代表性论文与成果（运动营养品研发与成果转化领域）",
  "荣誉与奖项",
  "学术兼职",
  "联系方式",
]);

const inlineHeadings = [
  "SCI论文",
  "中文核心",
  "中文核心期刊论文",
  "（2）著作、专利与训练监控成果",
  "（3）学术报告与实践服务成果",
];

function splitInlineProfessorList(paragraph: string) {
  if (!paragraph.startsWith("SCI论文1) ") && !paragraph.startsWith("SCI论文1）")) {
    return null;
  }

  const normalized = inlineHeadings.reduce(
    (text, heading) => text.replaceAll(heading, `\n${heading}\n`),
    paragraph,
  );

  return normalized
    .replace(/(^|[^0-9（])((?:10|[1-9])[)）]\s*)/g, "$1\n$2")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseNumberedLine(line: string) {
  const match = line.match(/^(\d+[)）])\s*(.*)$/);
  if (!match) {
    return null;
  }

  return { number: match[1], text: match[2] };
}

function ProfessorListItem({ text }: { text: string }) {
  const numbered = parseNumberedLine(text);

  if (numbered) {
    return (
      <p className="mt-3 flex gap-3 text-base font-light leading-8 text-ink-2">
        <span className="min-w-7 font-bold text-primary-2">{numbered.number} </span>
        <span>{numbered.text}</span>
      </p>
    );
  }

  return (
    <p className="mt-3 flex gap-3 text-base font-light leading-8 text-ink-2">
      <span className="text-primary-2">- </span>
      <span>{text}</span>
    </p>
  );
}

export default function ProfessorPage() {
  const [locale, setLocale] = useState<Locale>("zh");

  return (
    <LanguageFrame active="professor" locale={locale} onLocaleChange={setLocale}>
          <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 lg:px-14">
            <div className="flex flex-col items-center gap-12">
              <aside className="w-full py-10 text-center">
                <Image
                  src={assetPath("/qiu-junqiang-current.png")}
                  alt="邱俊强教授照片"
                  width={280}
                  height={280}
                  className="mx-auto h-64 w-64 rounded-full object-cover ring-1 ring-accent-2"
                  priority
                />
                <h1 className="mt-7 text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
                  {professorText[0]}
                </h1>
                <p className="mt-4 text-2xl font-light leading-tight text-ink-2 sm:text-3xl">
                  {professorText[1]}
                </p>
                <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-8 text-accent-1">
                  {professorText[2]}
                </p>
              </aside>

              <div className="w-full border-t border-accent-2 pt-8 text-base font-light leading-8 text-ink-2">
                {professorText.slice(3).map((paragraph, index) => {
                  const splitLines = splitInlineProfessorList(paragraph);
                  const currentSection =
                    professorText
                      .slice(3, index + 3)
                      .findLast((item) => sectionTitles.has(item)) ?? "";

                  if (splitLines) {
                    return (
                      <div key={`${index}-${paragraph}`} className="space-y-3">
                        {splitLines.map((line, lineIndex) =>
                          inlineHeadings.includes(line) ? (
                            <h3
                              key={`${lineIndex}-${line}`}
                              className="pt-4 text-xl font-bold leading-tight text-ink-1"
                            >
                              {line}
                            </h3>
                          ) : (
                            <div
                              key={`${lineIndex}-${line}`}
                              className="border-l border-accent-2 pl-4"
                            >
                              <ProfessorListItem text={line} />
                            </div>
                          ),
                        )}
                      </div>
                    );
                  }

                  if (sectionTitles.has(paragraph)) {
                    return (
                      <h2
                        key={`${index}-${paragraph}`}
                        className={
                          majorTitles.has(paragraph)
                            ? "mt-12 border-t border-accent-2 pt-8 text-3xl font-bold leading-tight text-ink-1"
                            : "mt-7 text-xl font-bold leading-tight text-ink-1"
                        }
                      >
                        {paragraph}
                      </h2>
                    );
                  }

                  if (currentSection === "个人简介") {
                    return (
                      <p
                        key={`${index}-${paragraph}`}
                        className="mt-4 text-base font-light leading-8 text-ink-2"
                      >
                        {paragraph}
                      </p>
                    );
                  }

                  return <ProfessorListItem key={`${index}-${paragraph}`} text={paragraph} />;
                })}
              </div>
            </div>
          </section>
    </LanguageFrame>
  );
}
