import type { MaterialMember } from "../data/materialMembers";

export type MemberSection = { title: string; items: string[] };
const fields = ["google scholar", "知乎", "家乡", "母校", "毕业去向", "兼职/实习", "实习", "学术格言", "兴趣爱好", "研究经历", "奖项荣誉", "发表文章", "教育经历", "工作经历", "讲授课程", "主持科研项目", "参加科研项目", "教材及获奖", "专利", "学术兼职"];
const titleMap: Record<string,string> = {"google scholar":"学术链接","知乎":"个人链接","母校":"教育背景","实习":"兼职与实习","兼职/实习":"兼职与实习","发表文章":"发表","教育经历":"教育背景"};
const empty = /^(?:无|暂无|待定|待补充|在读中[。.]*)$/;
export function hasContent(value: string | undefined): value is string { return Boolean(value?.trim() && !empty.test(value.trim())); }

export function parseMemberSections(member: MaterialMember): MemberSection[] {
  const sections: MemberSection[] = [];
  let current: MemberSection | undefined;
  let active = false;
  for (const raw of member.rawText.split("\n")) {
    const line = raw.trim().replace(/^[-－]\s*/, "");
    if (line.startsWith("【简答】")) { active = true; continue; }
    if (line.startsWith("家乡")) active = true;
    if (!active || !line || line.startsWith("【")) continue;
    const field = fields.find(f=>line.toLowerCase().startsWith(f));
    if (field) {
      const title = titleMap[field] || field;
      let value = line.slice(field.length).replace(/^（[^）]*）/, "").replace(/^\([^)]*\)/, "").replace(/^[:：\s]+/, "");
      if (field === "google scholar" || field === "知乎") {
        const colon = line.search(/[:：]/);
        value = colon >= 0 ? line.slice(colon+1).trim() : "";
      }
      current = {title, items:[]}; sections.push(current);
      if (hasContent(value)) current.items.push(value);
    } else if (current && hasContent(line)) {
      current.items.push(line);
    }
  }
  return sections.filter(s=>s.items.length).map(s=>({ ...s, items:s.items.flatMap(line=>s.title === "发表" ? line.split(/\s(?=\d{1,3}\.\s+[A-Z][a-z]+)/) : [line]).map(line=>line.replace(/(https:\/\/orcid\.org\/)\s+/g,"$1")).map(line=>s.title === "学术链接" && /^\d{4}-\d{4}-\d{4}-[\dX]{4}$/.test(line) ? `https://orcid.org/${line}` : line) }));
}
