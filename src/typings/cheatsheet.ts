export interface Shortcut {
  name: string;
  keys: string[];
  description: string;
}

export interface Category {
  name: string;
  shortcuts: Shortcut[];
}

export interface Cheatsheet {
  name: string;
  description: string;
  path: string;
  shortcutCategories: Category[];
}

export interface YAMLCheatsheet {
  name: string;
  description: string;
  path: string;
  shortcut_categories: Category[];
}