"use client";

import { useState } from "react";
import { LanguageFrame } from "../../components/LanguageFrame";
import { Locale } from "../../data/siteContent";
import { fullPublicationContent } from "../../data/fullPublicationContent";

export default function PublicationsPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const copy = fullPublicationContent[locale];

  return (
    <LanguageFrame active="publications" locale={locale} onLocaleChange={setLocale}>
      <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
        <p className="text-sm font-normal uppercase tracking-[0.24em] text-primary-2">
          Publications
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
          {copy.heading}
        </h1>

        <div className="mt-10 space-y-12">
          {copy.categories.map((category) => (
            <section key={category.title} className="border-t border-accent-2 pt-8">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-ink-1">{category.title}</h2>
              </div>

              <ol className="space-y-0">
                {category.items.map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-3 border-b border-paper-2 py-3 text-sm font-light leading-6 text-ink-1 sm:grid-cols-[3.5rem_1fr]"
                  >
                    <span className="font-bold text-primary-2">
                      {String(category.items.length - index).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>
    </LanguageFrame>
  );
}
