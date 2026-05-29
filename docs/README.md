# Vault Name – Obsidian Plugin

Shows a meaningful vault name in the status bar. No more five identical "docs" entries stacked on top of each other!

![Status bar](screenshots/status-bar.png)

## Problem

If you have several projects that each use a `docs` folder as an Obsidian vault, the vault switcher looks like this:

```
docs
docs
docs
docs
docs
```

Not helpful.

## Solution

This plugin shows a descriptive name in the **status bar** at the bottom:

- **Manually configured** → e.g. `📂 My Project`
- **Automatic fallback** → parent folder name, e.g. `📂 my-cool-app / docs`

## Installation

### Manual (recommended for development)

1. Build the plugin:

```bash
npm install
npm run build
```

2. Create a plugin folder inside your vault:

```bash
mkdir -p /path/to/your/vault/.obsidian/plugins/vault-name
```

3. Copy the build artifacts:

```bash
cp main.js manifest.json styles.css /path/to/your/vault/.obsidian/plugins/vault-name/
```

4. Restart Obsidian → Settings → Community Plugins → enable "Vault Name".

## Configuration

Under **Settings → Vault Name**:

- **Custom vault name**: set your own display name (e.g. "API Gateway Docs")
- Leave the field empty → `parent-folder / docs` is shown automatically

## Development

The source code lives in `src/` and is bundled with esbuild into `main.js` at the repository root.

```bash
npm install
npm run dev      # watch mode – rebuilds on every change
npm run build    # typecheck (tsc) + production build
```

| Path                | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `src/main.ts`       | plugin entry point                         |
| `src/settings.ts`   | settings interface & settings tab          |
| `src/statusBar.ts`  | name resolution & status bar wrapper       |

## Release

A git tag that matches the `version` in `manifest.json` exactly (without a `v` prefix) triggers the workflow in `.github/workflows/release.yml`. It builds the plugin and attaches `main.js`, `manifest.json` and `styles.css` as release assets.

```bash
git tag 1.0.0
git push origin 1.0.0
```
