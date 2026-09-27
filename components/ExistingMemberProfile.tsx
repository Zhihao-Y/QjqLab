"use client";
import { studentProfiles, twilightProfile } from "../data/siteContent";
import { useLocale } from "../lib/useLocale";
import { MemberProfile } from "./MemberProfile";
import { existingMemberEnglish } from "../data/existingMemberEnglish";

export function ExistingMemberProfile({ slug }: { slug: keyof typeof studentProfiles | "twilight-sparkle" }) {
  const [locale,setLocale] = useLocale();
  const source = slug === "twilight-sparkle" ? twilightProfile : studentProfiles[slug];
  const profile = source[locale];
  const member = profile.member;
  const translated = locale === "en" ? existingMemberEnglish[slug] : undefined;
  const t = (zh:string,en:string)=>locale === "zh" ? zh : en;
  const facts = [
    {label:t(slug === "lu-mingyue" ? "身份" : "年级",slug === "lu-mingyue" ? "Role" : "Year"),value:member.role},
    {label:t("毕业去向","Placement"),value:"destination" in member ? String(member.destination) : ""},
    {label:t("研究兴趣","Research Interests"),value:member.interest},
    {label:t("毕业时间","Graduation"),value:member.graduation},
    {label:t("邮箱","Email"),value:member.email},
    {label:t("一句话介绍","In a Few Words"),value:member.intro},
  ];
  if(slug === "chen-yan") facts.push({label:"ORCID",value:"https://orcid.org/0000-0002-1809-4186"});
  if(slug === "yang-junchao") facts.push({label:t("小红书","Xiaohongshu"),value:t("运动科学家杨阳阳；小红书号：117469188","运动科学家杨阳阳 · ID: 117469188")});
  return <MemberProfile locale={locale} setLocale={setLocale} profile={{name:member.name,enName:member.enName,photo:member.photo,facts,sections:[
    {title:t("自我介绍","About"),items:translated?.selfIntro ?? ("selfIntro" in profile ? profile.selfIntro : profile.shortAnswers)},
    {title:t("奖项荣誉","Awards and Honors"),items:translated?.awards ?? profile.awards},
    {title:t("发表","Publications"),items:profile.publications.length ? profile.publications : source.zh.publications,numbered:true},
  ]}}/>;
}
