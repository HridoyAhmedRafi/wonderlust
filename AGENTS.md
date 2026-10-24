<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Single-route travel landing page built on Next.js 16 App Router (`src/app/page.tsx`), React 19, Turbopack, React Compiler, shadcn-style components on Base UI.

## Commands

- `npm run dev` / `npm run build` — both use Turbopack (the default bundler; no Webpack fallback configured).
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`), no file args needed.
- No test script exists; for types run `npx tsc --noEmit` (there is no `typecheck` script). Full check: lint → `tsc --noEmit` → build.

## Toolchain quirks

- **Tailwind v4 is wired through Turbopack, not PostCSS**: `next.config.ts` maps `*.css` to the `@tailwindcss/turbopack` loader. Do not add `postcss.config.mjs` or a `tailwind.config`; design tokens (shadcn CSS variables + `@theme inline`) live in `src/app/globals.css`.
- **React Compiler is on** (`reactCompiler: true` + `babel-plugin-react-compiler`): don't add manual `useMemo`/`useCallback`/`React.memo` for performance.
- **shadcn uses the `base-nova` style = Base UI primitives, not Radix.** Components in `src/components/ui/` wrap `@base-ui/react/*` (see `button.tsx`: cva variants + `data-slot`). Scaffold new ones via the shadcn CLI (reads `components.json`); don't paste Radix-era shadcn snippets.
- `cn` is the npm package `cn` re-exported at `@/lib/utils` — import `cn` from `@/lib/utils`; don't hand-roll a clsx/tailwind-merge helper.
- Icons: `lucide-react`.
- Route props use the globally available typed helpers (`LayoutProps<'/'>` in `layout.tsx`, `PageProps` for pages) — don't hand-write `{ params: Promise<...> }` types.
- Path alias: `@/*` → `src/*`.

## Assets

- Travel imagery (PNGs) lives in `src/app/assets/` and is statically imported from app files (app-dir files are not served as URLs); `public/` contains only create-next-app placeholder SVGs.
