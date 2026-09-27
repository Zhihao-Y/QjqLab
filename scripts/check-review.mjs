import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { materialMembers } from "../data/materialMembers.ts";
import { professorText } from "../data/professorText.ts";
import { contactText } from "../data/contactText.ts";
import { fullPublicationContent } from "../data/fullPublicationContent.ts";
import { splitProfessorParagraph } from "../lib/professorContent.ts";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.REVIEW_URL || "http://127.0.0.1:4174";
const output = process.env.REVIEW_SCREENSHOTS || "/tmp/qjqlab-review-qa";
mkdirSync(output,{recursive:true});
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH});
const page = await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];
page.on("pageerror", e=>errors.push(e.message));
const compact=s=>s.replace(/\s/g,"");
assert.equal(compact(splitProfessorParagraph(professorText[70]).join("")),compact(professorText[70]));
const results=[];
try {
  const routes=["/","/research/","/professor/","/team/","/publications/","/contact/","/gallery/",...materialMembers.map(m=>`/team/${m.slug}/`),...['chen-yan','lu-zhihui','lu-mingyue','yang-junchao'].map(s=>`/team/${s}/`)];
  for(const route of routes) {
    for(const lang of ['zh','en']) {
      const response=await page.goto(`${base}${route}?lang=${lang}`,{waitUntil:"networkidle",timeout:60000});
      assert.equal(response.status(),200,route);
      await page.waitForFunction(l=>document.documentElement.lang === (l === "zh" ? "zh-CN" : "en"),lang);
      const body=await page.locator('main').innerText();
      assert(!/【填空】|【简答】|资料来源|原始资料|教师\+博士信息收集|后续如需微调|XX级什么生/.test(body),route+' template leak');
      assert.equal(await page.locator('h1').count(),1,route+' heading');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow');
      if(route==='/professor/' && lang==='zh') {
        for(const text of professorText.flatMap((text,index)=>index===2 ? text.split("｜") : [text])) assert(compact(body).includes(compact(text)),`Missing professor text: ${text.slice(0,35)}`);
      }
      if(route==='/contact/' && lang==='zh') for(const text of contactText) assert(compact(body).includes(compact(text)),`Missing contact text: ${text.slice(0,35)}`);
      if(route==='/publications/') assert.equal(await page.locator('.paper-list li').count(),fullPublicationContent[lang].categories.reduce((n,c)=>n+c.items.length,0));
      if(route==='/research/') assert.equal(await page.locator('.paper-list a').count(),9);
      if(['/','/professor/','/team/','/team/peng-tianhang/','/contact/','/research/'].includes(route)) await page.screenshot({path:`${output}/${route.replaceAll('/','_')}-${lang}-desktop.png`});
      results.push(`${route} ${lang}: OK`);
    }
  }
  await page.setViewportSize({width:390,height:844});
  for(const route of ['/','/professor/','/team/','/team/peng-tianhang/','/publications/','/research/','/contact/','/gallery/']) {
    for(const lang of ['zh','en']) {
      await page.goto(`${base}${route}?lang=${lang}`,{waitUntil:'networkidle'});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' mobile overflow');
      await page.screenshot({path:`${output}/${route.replaceAll('/','_')}-${lang}-mobile.png`});
    }
  }
  await page.goto(`${base}/?lang=zh`,{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Switch to English'}).click();
  await page.locator('.site-nav').getByRole('link',{name:'Team',exact:true}).click();
  await page.waitForURL(/team\/\?lang=en/);
  assert.equal(await page.locator('h1').innerText(),'Team');
  await page.getByRole('link',{name:'Philip Peng',exact:true}).click();
  await page.waitForURL(/peng-tianhang\/\?lang=en/);
  assert.equal(await page.locator('h1').innerText(),'Philip Peng');
  assert.deepEqual(errors,[],'Browser runtime errors');
  writeFileSync(`${output}/results.json`,JSON.stringify({routes:results,errors},null,2));
  console.log(`${results.length} route/language checks passed; 16 mobile checks; locale navigation passed.`);
} finally { await browser.close(); }
