"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { assetPath } from "../../lib/assetPath";
import { LanguageFrame } from "../../components/LanguageFrame";
import { Locale, ponyMembers } from "../../data/siteContent";
import { materialMembers, type MaterialMember } from "../../data/materialMembers";

export default function TeamPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const existingMembers = ponyMembers[locale].filter((member) =>
    ["lu-mingyue", "chen-yan", "lu-zhihui", "yang-junchao"].includes(member.slug),
  );
  const existingLinkedProfiles = new Set(["lu-mingyue", "chen-yan", "lu-zhihui", "yang-junchao"]);
  const materialLinkedProfiles = new Set(materialMembers.map((member) => member.slug));
  const normalizeExisting = (member: (typeof existingMembers)[number]): TeamCard => ({
    slug: member.slug,
    name: member.name,
    enName: member.enName,
    role: member.role,
    email: member.email,
    interest: member.interest,
    destination: "destination" in member ? member.destination : "",
    intro: member.intro,
    photo: member.photo,
    linked: existingLinkedProfiles.has(member.slug),
  });
  const normalizeMaterial = (member: MaterialMember): TeamCard => ({
    slug: member.slug,
    name: locale === "zh" ? member.name : member.enName || member.name,
    enName: locale === "zh" ? member.enName : member.name,
    role: member.role,
    email: member.email,
    interest: member.interest,
    destination: member.destination,
    intro: member.quote || member.interest,
    photo: member.photo,
    linked: materialLinkedProfiles.has(member.slug),
  });
  const groups = [
    {
      title: locale === "zh" ? "实验室助理" : "Lab Assistant",
      members: existingMembers
        .filter((member) => member.slug === "lu-mingyue")
        .map(normalizeExisting),
    },
    {
      title: locale === "zh" ? "教师与科研人员" : "Faculty and Research Staff",
      members: materialMembers
        .filter((member) => member.group === "faculty")
        .map(normalizeMaterial),
    },
    {
      title: locale === "zh" ? "在读博士生" : "Current PhD Students",
      members: [
        ...existingMembers
          .filter((member) => ["chen-yan", "lu-zhihui"].includes(member.slug))
          .map(normalizeExisting),
        ...materialMembers
          .filter((member) => member.group === "currentPhd")
          .map(normalizeMaterial),
      ],
    },
    {
      title: locale === "zh" ? "在读硕士生" : "Current Master Students",
      members: materialMembers
        .filter((member) => member.group === "currentMaster")
        .map(normalizeMaterial),
    },
    {
      title: locale === "zh" ? "毕业博士生" : "Graduated PhD Students",
      members: [
        ...existingMembers
          .filter((member) => member.slug === "yang-junchao")
          .map(normalizeExisting),
        ...materialMembers
          .filter((member) => member.group === "graduatedPhd")
          .map(normalizeMaterial),
      ],
    },
    {
      title: locale === "zh" ? "毕业硕士生" : "Graduated Master Students",
      members: materialMembers
        .filter((member) => member.group === "graduatedMaster")
        .map(normalizeMaterial),
    },
    {
      title: locale === "zh" ? "毕业本科生" : "Graduated Undergraduate Students",
      members: materialMembers
        .filter((member) => member.group === "graduatedUndergraduate")
        .map(normalizeMaterial),
    },
  ].filter((group) => group.members.length > 0);

  return (
    <LanguageFrame active="team" locale={locale} onLocaleChange={setLocale}>
          <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-normal uppercase tracking-[0.32em] text-primary-2">
                Team
              </p>
              <h1 className="mt-7 text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
                {locale === "zh" ? "团队成员" : "Team Members"}
              </h1>
              <p className="mt-5 text-base font-light leading-7 text-ink-2">
                {locale === "zh"
                  ? "以下内容来自已收集的成员材料；后续如需微调排序、头衔或展示密度，可以继续逐项修订。"
                  : "The profiles below are built from collected member materials and can be refined further for order, titles, and display density."}
              </p>
            </div>

            <div className="mt-12 space-y-14">
              {groups.map((group) => (
                <section key={group.title}>
                  <h2 className="border-b border-accent-2 pb-3 text-2xl font-bold text-ink-1">
                    {group.title}
                  </h2>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.members.length === 0 ? (
                      <p className="text-sm font-light text-ink-2">
                        {locale === "zh" ? "待补充" : "To be added"}
                      </p>
                    ) : null}
                    {group.members.map((member) => (
                <article key={member.slug} className="border border-accent-2 bg-paper-1">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                    {member.photo ? (
                      <Image
                        src={assetPath(member.photo)}
                        alt={`${member.name} photo`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-paper-2 px-8 text-center text-3xl font-bold text-accent-1">
                        {member.name}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {member.linked ? (
                      <Link
                        href={`/team/${member.slug}`}
                        className="text-2xl font-bold text-ink-1 underline decoration-primary-2 decoration-1 underline-offset-8 transition hover:text-primary-1"
                      >
                        {member.name}
                      </Link>
                    ) : (
                      <h2 className="text-2xl font-bold text-ink-1">{member.name}</h2>
                    )}
                    <p className="mt-2 text-base font-light text-ink-2">{member.enName}</p>

                  <dl className="mt-6 space-y-3 text-sm font-light leading-6 text-ink-2">
                    <div>
                      <dt className="text-sm font-normal text-accent-1">
                        {locale === "zh" ? "年级" : "Year"}
                      </dt>
                      <dd>{member.role}</dd>
                    </div>
                    {"destination" in member ? (
                      <div>
                        <dt className="text-sm font-normal text-accent-1">
                          {locale === "zh" ? "毕业去向" : "Placement"}
                        </dt>
                        <dd>{member.destination}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="text-sm font-normal text-accent-1">
                        {locale === "zh" ? "研究兴趣" : "Research Interest"}
                      </dt>
                      <dd>{member.interest}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-normal text-accent-1">
                        {locale === "zh" ? "邮箱" : "Email"}
                      </dt>
                      <dd>{member.email}</dd>
                    </div>
                  </dl>
                  <p className="mt-5 border-t border-accent-2 pt-4 text-sm font-light leading-6 text-ink-2">
                    {member.intro}
                  </p>
                  </div>
                </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
    </LanguageFrame>
  );
}

type TeamCard = {
  slug: string;
  name: string;
  enName: string;
  role: string;
  email: string;
  interest: string;
  destination?: string;
  intro: string;
  photo?: string;
  linked: boolean;
};
