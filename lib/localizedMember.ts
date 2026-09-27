import type { MaterialMember } from "../data/materialMembers";
import type { Locale } from "../data/siteContent";
import { memberCommonEnglish, memberEnglish, memberSectionTitles } from "../data/memberEnglish";
import { hasContent, parseMemberSections } from "./memberContent";

export function localizedMember(member:MaterialMember,locale:Locale) {
  if(locale === "zh") return member;
  const en = memberEnglish[member.slug];
  const matched = member.role.match(/(?:20)?\d{2}/)?.[0];
  const year = matched?.length === 2 ? `20${matched}` : matched;
  const degree = member.group.includes("Phd") ? "PhD" : member.group.includes("Undergraduate") ? "Undergraduate" : "Master's";
  return {...member,name:member.enName,enName:member.name,role:en.role ?? `${degree}, entering class of ${year}`,interest:en.interest,quote:en.quote ?? "",destination:en.destination ?? ""};
}
export function localizedMemberSections(member:MaterialMember,locale:Locale) {
  return parseMemberSections(member).map(section=>({
    title:locale === "zh" ? section.title : memberSectionTitles[section.title] ?? section.title,
    items:locale === "zh" ? section.items : memberEnglish[member.slug].sections?.[section.title] ?? section.items.map(s=>memberCommonEnglish[s] ?? s),
    numbered:["发表","主持科研项目","参加科研项目","专利","教材及获奖"].includes(section.title),
  }));
}
export function memberGraduation(member:MaterialMember,locale:Locale) {
  const value = member.rawText.match(/(?:（预计）|预计)?毕业时间\s*[:：]?\s*([^\n]*)/)?.[1]?.trim() ?? "";
  if(!hasContent(value)) return "";
  return locale === "zh" ? value : value.replace(/年/g,"/").replace(/月/g,"").replace(/博士研究生毕业/g," (PhD)").replace(/\/$/,"");
}
