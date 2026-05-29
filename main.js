var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => VaultNamePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  customName: ""
};
var VaultNameSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Vault Name Settings" });
    const vaultPath = this.app.vault.adapter.basePath || "unknown";
    containerEl.createEl("p", {
      text: `Vault path: ${vaultPath}`,
      cls: "setting-item-description"
    });
    containerEl.createEl("p", {
      text: `Currently displayed as: ${this.plugin.getDisplayName()}`,
      cls: "setting-item-description"
    });
    new import_obsidian.Setting(containerEl).setName("Custom vault name").setDesc(
      "Set a custom display name for this vault. Leave empty to use the parent folder name as fallback (e.g. 'my-project / docs')."
    ).addText(
      (text) => text.setPlaceholder("e.g. My Project").setValue(this.plugin.settings.customName).onChange(async (value) => {
        this.plugin.settings.customName = value;
        await this.plugin.saveSettings();
      })
    );
  }
};

// src/statusBar.ts
var path = __toESM(require("path"));
function resolveVaultDisplayName(app, settings) {
  if (settings.customName.trim()) {
    return settings.customName.trim();
  }
  const vaultPath = app.vault.adapter.basePath;
  if (vaultPath) {
    const parentDir = path.basename(path.dirname(vaultPath));
    const vaultDir = path.basename(vaultPath);
    if (parentDir && parentDir !== "." && parentDir !== "/") {
      return `${parentDir} / ${vaultDir}`;
    }
  }
  return app.vault.getName();
}
var VaultNameStatusBar = class {
  constructor(el) {
    this.el = el;
    this.el.addClass("vault-name-status");
  }
  update(displayName) {
    this.el.setText(`\u{1F4C2} ${displayName}`);
    this.el.setAttr("title", `Vault: ${displayName}`);
  }
};

// src/main.ts
var VaultNamePlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    this.statusBar = new VaultNameStatusBar(this.addStatusBarItem());
    this.updateStatusBar();
    this.addSettingTab(new VaultNameSettingTab(this.app, this));
  }
  onunload() {
  }
  getDisplayName() {
    return resolveVaultDisplayName(this.app, this.settings);
  }
  updateStatusBar() {
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
    this.updateStatusBar();
  }
};
