"use client";
import Image from "next/image";
import { LanguageFrame } from "../../components/LanguageFrame";
import { useLocale } from "../../lib/useLocale";
import { assetPath } from "../../lib/assetPath";
const images=["22114128848f43088109ac50bc6b3acc.jpg","251618b77405b4b295936cf575fc34ff.jpg","3196aae941e8134807cc57cfec8db510.jpg","dd094c7f1d4b4ce21f23acdffc606e03.jpg","fe7722ee0c4b8617f2326eeba1eb93f4.jpg"];
export default function GalleryPage() {
  const [locale,setLocale]=useLocale();
  return <LanguageFrame active="gallery" locale={locale} onLocaleChange={setLocale}>
    <section className="page-wrap"><header className="page-heading"><p className="eyebrow">{locale === "zh" ? "Gallery" : "Life in the Lab"}</p><h1>{locale === "zh" ? "照片墙" : "Gallery"}</h1></header>
      <div className="gallery-grid">{images.map((name,i)=><figure key={name}><a href={assetPath(`/gallery/${name}`)} target="_blank" rel="noreferrer" aria-label={locale === "zh" ? `查看照片 ${i+1}` : `View photograph ${i+1}`}><Image src={assetPath(`/gallery/${name}`)} alt={locale === "zh" ? `实验室照片 ${i+1}` : `Lab photograph ${i+1}`} fill sizes={i===0 ? "(max-width: 1120px) 94vw, 1056px" : "(max-width: 600px) 90vw, 520px"}/></a></figure>)}</div>
    </section>
  </LanguageFrame>;
}
