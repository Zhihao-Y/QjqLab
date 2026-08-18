"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "../../lib/assetPath";
import { LanguageFrame } from "../../components/LanguageFrame";
import { Locale } from "../../data/siteContent";

const galleryImages = [
  "/gallery/22114128848f43088109ac50bc6b3acc.jpg",
  "/gallery/251618b77405b4b295936cf575fc34ff.jpg",
  "/gallery/3196aae941e8134807cc57cfec8db510.jpg",
  "/gallery/dd094c7f1d4b4ce21f23acdffc606e03.jpg",
  "/gallery/fe7722ee0c4b8617f2326eeba1eb93f4.jpg",
] as const;

export default function GalleryPage() {
  const [locale, setLocale] = useState<Locale>("zh");

  return (
    <LanguageFrame active="gallery" locale={locale} onLocaleChange={setLocale}>
      <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
        <p className="text-sm font-normal uppercase tracking-[0.24em] text-primary-2">
          Gallery
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
          {locale === "zh" ? "照片墙" : "Gallery"}
        </h1>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((src, index) => (
            <div
              key={src}
              className={
                index === 0
                  ? "relative aspect-[16/9] overflow-hidden border border-accent-2 bg-paper-2 sm:col-span-2"
                  : "relative aspect-[4/3] overflow-hidden border border-accent-2 bg-paper-2"
              }
            >
              <Image
                src={assetPath(src)}
                alt={locale === "zh" ? `照片墙 ${index + 1}` : `Gallery ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </LanguageFrame>
  );
}
