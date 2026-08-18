# Project Structure

This repository is organized as a static Next.js site for GitHub Pages. The current site is content-heavy, so source code and content data are intentionally separated.

## Top-Level Folders

- `app/`: Next.js routes, layouts, client components, and page-level rendering logic.
- `data/`: structured content consumed by pages. Edit text here before touching page components.
- `public/`: static files served by the site, including lab logo, homepage images, gallery images, and member photos.
- `materials/`: source materials and extracted text used to build the current demo.
- `docs/`: project maintenance notes.
- `scripts/`: small build utilities.
- `.github/workflows/`: GitHub Actions deployment workflow.

## Content Data

- `data/siteContent.ts`: shared site copy, navigation labels, homepage/research/team starter content.
- `data/professorText.ts`: Professor page long-form text.
- `data/fullPublicationContent.ts`: Publications page content.
- `data/materialMembers.ts`: profiles generated from `new_materials`.

## Pages

- `app/page.tsx`: homepage.
- `app/research/page.tsx`: research page.
- `app/professor/page.tsx`: professor page.
- `app/team/page.tsx`: team index page.
- `app/team/[slug]/page.tsx`: generated member profile pages from collected materials.
- `app/publications/page.tsx`: publication page.
- `app/gallery/page.tsx`: gallery page.
- `app/contact/page.tsx`: contact page.

## Assets

- `public/home/`: homepage background and group photos.
- `public/students/`: member photos.
- `public/gallery/`: gallery images.
- `public/pony/`: legacy placeholder images retained for reference/demo pages.

## Materials

- `materials/raw/new-materials/`: preserved copy of the submitted source materials.
- `materials/extracted/`: plain-text extractions from Word documents.
- `materials/INVENTORY.md`: human-readable index of imported members.

The original `new_materials/` folder is still present as an untouched incoming folder for auditability. Once the team confirms the import, it can be archived or removed from the repository before public release.
