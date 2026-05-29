import { App, PluginSettingTab, Setting } from "obsidian";
import type VaultNamePlugin from "./main";

export interface VaultNameSettings {
	customName: string;
}

export const DEFAULT_SETTINGS: VaultNameSettings = {
	customName: "",
};

export class VaultNameSettingTab extends PluginSettingTab {
	plugin: VaultNamePlugin;

	constructor(app: App, plugin: VaultNamePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Vault Name Settings" });

		// Show current resolved path for context.
		const vaultPath =
			(this.app.vault.adapter as any).basePath || "unknown";
		containerEl.createEl("p", {
			text: `Vault path: ${vaultPath}`,
			cls: "setting-item-description",
		});

		containerEl.createEl("p", {
			text: `Currently displayed as: ${this.plugin.getDisplayName()}`,
			cls: "setting-item-description",
		});

		new Setting(containerEl)
			.setName("Custom vault name")
			.setDesc(
				"Set a custom display name for this vault. " +
					"Leave empty to use the parent folder name as fallback " +
					"(e.g. 'my-project / docs')."
			)
			.addText((text) =>
				text
					.setPlaceholder("e.g. My Project")
					.setValue(this.plugin.settings.customName)
					.onChange(async (value) => {
						this.plugin.settings.customName = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
