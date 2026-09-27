"use client";
import type { MaterialMember } from "../../../data/materialMembers";
import { MemberProfile } from "../../../components/MemberProfile";
import { useLocale } from "../../../lib/useLocale";
import { localizedMember, localizedMemberSections, memberGraduation } from "../../../lib/localizedMember";
import { hasContent } from "../../../lib/memberContent";

export function MaterialProfileClient({member}:{member:MaterialMember}) {
  const [locale,setLocale] = useLocale();
  const copy=localizedMember(member,locale);
  const t=(zh:string,en:string)=>locale === "zh" ? zh : en;
  const sections=localizedMemberSections(member,locale);
  const profile={name:copy.name,enName:copy.enName,photo:copy.photo,facts:[
    {label:t(member.group === "faculty" ? "职务" : "年级",member.group === "faculty" ? "Appointment" : "Year"),value:copy.role},
    {label:t("毕业去向","Placement"),value:hasContent(copy.destination) ? copy.destination : ""},
    {label:t("研究兴趣","Research Interests"),value:copy.interest},
    {label:t("毕业时间","Graduation"),value:memberGraduation(member,locale)},
    {label:t("邮箱","Email"),value:copy.email},
    {label:t("一句话介绍","In a Few Words"),value:copy.quote},
  ],sections:sections.length ? sections : [{title:t("研究兴趣","Research Interests"),items:[copy.interest]}]};
  return <MemberProfile profile={profile} locale={locale} setLocale={setLocale}/>;
}
