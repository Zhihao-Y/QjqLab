"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { assetPath } from "../lib/assetPath";
import { LanguageFrame } from "../components/LanguageFrame";
import { entryCards, Locale, researchAreas, site } from "../data/siteContent";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const copy = site[locale];
  const cards = entryCards[locale];
  const areas = researchAreas[locale];

  return (
    <LanguageFrame active="home" locale={locale} onLocaleChange={setLocale}>
          <>
            <div
              className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-5"
              style={{ backgroundImage: `url('${assetPath("/home/beijing-sport-university.jpg")}')` }}
              aria-hidden="true"
            />
            <section
              id="home"
              className="relative z-10"
            >
              <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center sm:px-10 lg:px-14 lg:pb-24 lg:pt-24">
                <div className="w-full">
                  <p className="mb-8 text-xs font-normal uppercase tracking-[0.32em] text-primary-2">
                    {copy.eyebrow}
                  </p>
                  <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight text-ink-1 sm:text-5xl lg:text-6xl">
                    {copy.labName}
                  </h1>
                  <p className="mx-auto mt-8 max-w-4xl text-sm font-thin leading-7 text-ink-2 sm:text-base sm:leading-8">
                    {copy.positioning}
                  </p>
                </div>

                <aside className="mt-12 w-full max-w-4xl">
                  <div className="relative mb-10 aspect-[16/7] w-full overflow-hidden border border-accent-2 bg-paper-2">
                    <Image
                      src={assetPath("/home/lab-home-group.jpg")}
                      alt={locale === "zh" ? "实验室合照" : "Lab group photo"}
                      fill
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mx-auto max-w-3xl space-y-5 text-lg font-light leading-9 text-ink-2">
                    {copy.intro.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="mx-auto mt-10 block max-w-2xl bg-accent-1 px-6 py-3 text-center text-base font-light text-paper-1 transition hover:bg-primary-1"
                  >
                    {copy.cta}
                  </Link>
                  <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3" aria-hidden="true">
                    <span className="h-2 bg-primary-1" />
                    <span className="h-2 bg-primary-2" />
                    <span className="h-2 bg-primary-3" />
                  </div>
                </aside>
              </div>
            </section>

            <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
              <div className="max-w-3xl">
                <p className="text-sm font-normal uppercase tracking-[0.24em] text-primary-2">
                  Research Focus
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-ink-1 sm:text-4xl">
                  {locale === "zh"
                    ? "搭建科研与实践的桥梁"
                    : "A translational platform from performance to public health"}
                </h2>
              </div>
              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {areas.map((area, index) => (
                  <Link
                    key={area.title}
                    href="/research"
                    className="border-t border-accent-2 pt-8"
                  >
                    <p className="text-sm font-normal text-primary-2">
                      {String(index + 1).padStart(2, "0")} / {area.kicker}
                    </p>
                    <h3 className="mt-5 text-2xl font-bold text-ink-1">{area.title}</h3>
                    <p className="mt-5 text-base font-light leading-8 text-ink-2">
                      {area.text}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="relative z-10 border-t border-accent-2 bg-accent-1 text-paper-1">
              <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center sm:px-10 lg:px-14">
                <div className="max-w-3xl">
                  <p className="text-sm font-normal uppercase tracking-[0.24em] text-accent-2">
                    Location
                  </p>
                  <h2 className="mt-5 text-3xl font-bold leading-tight text-paper-1">
                    {locale === "zh" ? "实验室位置" : "Lab Location"}
                  </h2>
                  <p className="mt-6 text-base font-light leading-8 text-paper-1/85">
                    {copy.address}
                  </p>
                  {locale === "zh" && (
                    <p className="mt-3 text-base font-light leading-8 text-paper-1/85">
                      北京市海淀区，信息路48号，北京体育大学，运动人体科学学院，教学实验楼208。邮政编码100084。
                    </p>
                  )}
                  <a
                    href="https://maps.app.goo.gl/SwpJcxNYWsyBGGJv8"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block bg-primary-2 px-5 py-3 text-sm font-normal text-paper-1 transition hover:bg-primary-3"
                  >
                    {locale === "zh" ? "打开 Google Maps" : "Open in Google Maps"}
                  </a>
                </div>
                <div className="w-full overflow-hidden border border-accent-2 bg-paper-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2961.221280306098!2d116.31494125035881!3d40.022596168405194!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDAxJzIwLjgiTiAxMTbCsDE5JzAyLjAiRQ!5e0!3m2!1sen!2suk!4v1782621287011!5m2!1sen!2suk"
                    title="Google Maps location"
                    className="h-[360px] w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </section>

            <section className="relative z-10 bg-accent-1">
              <div className="mx-auto grid w-full max-w-7xl gap-2 px-6 pb-10 sm:grid-cols-3 sm:px-10 lg:grid-cols-6 lg:px-14">
                {cards.map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="border border-accent-2/30 px-3 py-3 text-center text-paper-1 transition hover:border-primary-3 hover:bg-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-2/30"
                  >
                    <span className="block text-sm font-bold">{card.title}</span>
                    <span className="mt-0.5 block text-xs font-light text-paper-1/80">{card.subtitle}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
    </LanguageFrame>
  );
}
