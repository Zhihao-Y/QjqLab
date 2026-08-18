# Deployment

The site is designed to be deployed as static files through GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Local Static Build

```bash
npm run build:github
```

This creates `out/` with a `/QjqLab` base path suitable for a GitHub repository named `QjqLab`.

To preview the static output locally, one convenient option is:

```bash
npm run preview:static
```

Then open <http://127.0.0.1:4173/QjqLab/>.

## GitHub Pages

1. Create a GitHub repository, preferably named `QjqLab`.
2. Push the project to the `main` branch.
3. In GitHub, open Settings -> Pages.
4. Set Source to GitHub Actions.
5. The workflow at `.github/workflows/deploy-pages.yml` builds and deploys the static site.

## Notes

- `next.config.mjs` uses `output: "export"`.
- `build:github` sets `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/QjqLab`.
- `scripts/fix-static-export.mjs` copies `.next/static` into `out/_next/static` after build so static CSS/JS load correctly under GitHub Pages.
- `public/.nojekyll` prevents GitHub Pages from ignoring `_next` assets.
