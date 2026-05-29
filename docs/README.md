# Vault Name – Obsidian Plugin

Zeigt einen aussagekräftigen Vault-Namen in der Statusleiste an. Schluss mit fünfmal "docs" untereinander!

![Status bar](screenshots/status-bar.png)

## Problem

Wenn du mehrere Projekte hast, die jeweils einen `docs`-Ordner als Obsidian-Vault nutzen, sieht die Vault-Auswahl so aus:

```
docs
docs
docs
docs
docs
```

Nicht hilfreich.

## Lösung

Dieses Plugin zeigt in der **Statusleiste** unten einen sprechenden Namen an:

- **Manuell konfiguriert** → z.B. `📂 Mein Projekt`
- **Automatischer Fallback** → Parent-Ordnername, z.B. `📂 my-cool-app / docs`

## Installation

### Manuell (empfohlen für Entwicklung)

1. Plugin bauen:

```bash
npm install
npm run build
```

2. Im Vault-Ordner einen Plugin-Ordner erstellen:

```bash
mkdir -p /path/to/your/vault/.obsidian/plugins/vault-name
```

3. Build-Artefakte kopieren:

```bash
cp main.js manifest.json styles.css /path/to/your/vault/.obsidian/plugins/vault-name/
```

4. Obsidian neustarten → Einstellungen → Community Plugins → "Vault Name" aktivieren.

## Konfiguration

Unter **Einstellungen → Vault Name**:

- **Custom vault name**: Eigenen Namen vergeben (z.B. "API Gateway Docs")
- Feld leer lassen → es wird automatisch `parent-folder / docs` angezeigt

## Entwicklung

Der Quellcode liegt in `src/` und wird mit esbuild zu `main.js` im Wurzelverzeichnis gebündelt.

```bash
npm install
npm run dev      # Watch mode – baut bei jeder Änderung neu
npm run build    # Typecheck (tsc) + Produktions-Build
```

| Pfad                | Zweck                                      |
| ------------------- | ------------------------------------------ |
| `src/main.ts`       | Plugin Entry Point                         |
| `src/settings.ts`   | Settings-Interface & Settings-Tab          |
| `src/statusBar.ts`  | Namens-Auflösung & Status-Bar-Wrapper      |

## Release

Ein Git-Tag, der exakt der `version` in `manifest.json` entspricht (ohne `v`-Präfix), löst den Workflow in `.github/workflows/release.yml` aus. Dieser baut das Plugin und hängt `main.js`, `manifest.json` und `styles.css` als Assets an das GitHub-Release.

```bash
git tag 1.0.0
git push origin 1.0.0
```
