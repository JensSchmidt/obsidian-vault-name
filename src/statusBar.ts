import { App } from "obsidian";
import * as path from "path";
import { VaultNameSettings } from "./settings";

/**
 * Resolves the display name for the vault in priority order:
 *   1. Manually configured custom name.
 *   2. "parent-folder / vault-folder" derived from the filesystem path.
 *   3. Obsidian's own vault name as a last resort.
 */
export function resolveVaultDisplayName(
	app: App,
	settings: VaultNameSettings
): string {
	// Priority 1: manual custom name.
	if (settings.customName.trim()) {
		return settings.customName.trim();
	}

	// Priority 2: derive from the path. `basePath` is NOT part of Obsidian's
	// public API and only exists on the desktop FileSystemAdapter — guard for
	// mobile where it is undefined and fall through to getName().
	const vaultPath = (app.vault.adapter as any).basePath as string | undefined;
	if (vaultPath) {
		const parentDir = path.basename(path.dirname(vaultPath));
		const vaultDir = path.basename(vaultPath);

		if (parentDir && parentDir !== "." && parentDir !== "/") {
			return `${parentDir} / ${vaultDir}`;
		}
	}

	// Fallback.
	return app.vault.getName();
}

/** Thin wrapper around the status bar element. */
export class VaultNameStatusBar {
	private readonly el: HTMLElement;

	constructor(el: HTMLElement) {
		this.el = el;
		this.el.addClass("vault-name-status");
	}

	update(displayName: string): void {
		this.el.setText(`📂 ${displayName}`);
		this.el.setAttr("title", `Vault: ${displayName}`);
	}
}
