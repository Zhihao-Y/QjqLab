import { Fragment } from "react";

export function LinkedText({ text }: { text: string }) {
  const normalized = text.replace(/(https:\/\/orcid\.org\/)\s+/g, "$1");
  const parts = normalized.split(/(https?:\/\/[^\s<>（）)]+|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/g);
  return <>{parts.map((part, i) => {
    const url = part.startsWith("http") ? part.replace(/[.,;，。；]+$/, "") : null;
    if (url) return <Fragment key={i}><a className="text-link" href={url} target="_blank" rel="noreferrer">{url}</a>{part.slice(url.length)}</Fragment>;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part)) return <a className="text-link" key={i} href={`mailto:${part}`}>{part}</a>;
    return <Fragment key={i}>{part}</Fragment>;
  })}</>;
}
