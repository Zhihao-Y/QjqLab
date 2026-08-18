# QjqLab Static Demo

北京体育大学运动营养与健康实验室网站静态 demo。项目使用 Next.js + TypeScript + Tailwind CSS，当前目标是支持本地预览、静态导出和 GitHub Pages 临时部署。

## 快速开始

```bash
npm install
npm run dev
```

本地开发地址：<http://localhost:3000>

## 静态导出

普通静态导出：

```bash
npm run build
```

按 GitHub Pages 仓库路径导出：

```bash
npm run build:github
```

导出结果在 `out/`。

## 静态预览

```bash
npm run preview:static
```

打开 <http://127.0.0.1:4173/QjqLab/>。

## 项目结构

```text
QjqLab/
├─ app/                 # Next.js App Router 页面、布局和组件
├─ data/                # 网站文字、成员、论文、导师等结构化内容
├─ public/              # 网站公开静态资源：logo、照片、gallery、学生照片
├─ materials/           # 原始材料、Word 提取文本和整理清单
├─ docs/                # 给维护者看的结构和部署说明
├─ scripts/             # 构建后修复 GitHub Pages 静态资源路径的脚本
├─ .github/workflows/   # GitHub Pages 自动部署工作流
└─ out/                 # 构建产物，不提交到 Git
```

更详细说明见：

- `docs/PROJECT_STRUCTURE.md`
- `docs/DEPLOYMENT.md`

## 常用修改位置

- 首页、研究方向、学生占位与站点文字：`data/siteContent.ts`
- 导师页正文：`data/professorText.ts`
- 论文成果：`data/fullPublicationContent.ts`
- 新材料成员：`data/materialMembers.ts`
- 页面样式：`app/globals.css`
- 图片资源：`public/`
- 原始收集材料：`materials/raw/new-materials/`

## GitHub Pages

1. 在 GitHub 新建仓库，建议仓库名 `QjqLab`。
2. 把本项目推送到 `main` 分支。
3. 在 GitHub 仓库 Settings -> Pages 中，Source 选择 GitHub Actions。
4. 等 Actions 跑完后，访问 Pages 给出的临时网址。

如果仓库名不是 `QjqLab`，工作流会自动读取仓库名并设置正确的路径前缀。
