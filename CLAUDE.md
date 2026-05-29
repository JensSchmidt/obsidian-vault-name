# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Obsidian community plugin ("Vault Name") that shows a meaningful vault name in
the status bar, so multiple vaults all named `docs` are distinguishable. The display
name resolves in priority order (see `resolveVaultDisplayName()` in `src/statusBar.ts`):

1. A manually configured `customName` from settings.
2. `parent-folder / vault-folder` derived from the vault's filesystem path.
3. `app.vault.getName()` as a last fallback.

## Layout

- `src/main.ts` — plugin entry point (`VaultNamePlugin`); wires settings + status bar.
- `src/settings.ts` — `VaultNameSettings` interface, `DEFAULT_SETTINGS`, and the
  `VaultNameSettingTab`. Imports the plugin **type-only** (`import type`) to avoid a
  runtime circular import with `main.ts`.
- `src/statusBar.ts` — name-resolution logic + the `VaultNameStatusBar` element wrapper.
- `main.js` — the esbuild bundle. **Committed on purpose** (Obsidian loads it directly
  from the repo / release asset), so it is NOT in `.gitignore`. Regenerate with a build;
  don't hand-edit it.
- `docs/` — `README.md` (canonical), `CHANGELOG.md`, `screenshots/`. Root `README.md`
  is a symlink to `docs/README.md`.

There is no test suite and no linter configured.

## Commands

```bash
npm install
npm run dev     # esbuild watch -> main.js (inline sourcemap)
npm run build   # tsc -noEmit typecheck + production esbuild bundle (no sourcemap)
```

Build config lives in `esbuild.config.mjs` (entry `src/main.ts`, outfile `main.js`).
`npm run build` is the only path that type-checks (via `tsc -noEmit`); `dev` does not.

## Deploying / testing in Obsidian

Obsidian loads the built `main.js`, not the `src/` TypeScript. After building, the three
runtime artifacts — `main.js`, `manifest.json`, `styles.css` — must live in a vault at
`.obsidian/plugins/vault-name/`, then the plugin enabled under Community Plugins
(reload Obsidian to pick up changes). The plugin id is `vault-name` (from `manifest.json`)
and the folder name must match it.

## Releasing

`.github/workflows/release.yml` triggers on any pushed git tag. The tag must equal the
`version` in `manifest.json` **without** a `v` prefix (e.g. `1.0.0`). The workflow builds
and attaches `main.js`, `manifest.json`, `styles.css` as release assets. When bumping the
version, update `manifest.json`, `package.json`, and add the new version → minAppVersion
entry to `versions.json`.

## Things to know

- **`basePath` is not in Obsidian's public API.** The path-based fallback reads
  `(app.vault.adapter as any).basePath`, cast through `any` deliberately. On mobile
  (non-FileSystemAdapter) this is undefined; the code guards for it and falls through to
  `getName()`. Keep `isDesktopOnly: false` working — don't assume `basePath` exists.
- The status bar is the only UI surface. `updateStatusBar()` runs on load and after every
  settings save (`saveSettings()` calls it), which is how name changes take effect live.
- `manifest.json` `author` and the `LICENSE` copyright holder are still the placeholder
  `Your Name` — replace before publishing.
- README is in German; the plugin/settings UI strings are in English.
