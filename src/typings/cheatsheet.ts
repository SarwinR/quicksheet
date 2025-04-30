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
  categories: Category[];
}
