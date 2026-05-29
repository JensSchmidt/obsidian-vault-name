import { Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	VaultNameSettings,
	VaultNameSettingTab,
} from "./settings";
import { resolveVaultDisplayName, VaultNameStatusBar } from "./statusBar";

export default class VaultNamePlugin extends Plugin {
	settings: VaultNameSettings;
	private statusBar: VaultNameStatusBar;

	async onload() {
		await this.loadSettings();

		this.statusBar = new VaultNameStatusBar(this.addStatusBarItem());
		this.updateStatusBar();

		this.addSettingTab(new VaultNameSettingTab(this.app, this));
	}

	onunload() {}

	getDisplayName(): string {
		return resolveVaultDisplayName(this.app, this.settings);
	}

	updateStatusBar(): void {
		this.statusBar.update(this.getDisplayName());
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
		// Re-render the status bar so name changes take effect live.
		this.updateStatusBar();
	}
}
