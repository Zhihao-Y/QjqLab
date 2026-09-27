export const majorProfessorSections = new Set([3,13,16,18,25,68,71,100,119,140]);
export const minorProfessorSections = new Set([19,26,27,33,45,54,69,72,73,74,83,90,96]);
export const inlineProfessorHeadings = ["（2）著作、专利与训练监控成果","（3）学术报告与实践服务成果","SCI论文","中文核心"];

export function splitProfessorParagraph(paragraph:string) {
  // Isolate complete section labels before splitting numbered entries, so (2)/(3) stay intact.
  const headingPattern = new RegExp(`(${inlineProfessorHeadings.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})`,"g");
  return paragraph.split(headingPattern).flatMap(part=>inlineProfessorHeadings.includes(part) ? [part] : part.split(/(?<![\d（(])(?=\d{1,2}[)）])/)).map(s=>s.trim()).filter(Boolean);
}
