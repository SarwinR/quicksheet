export interface Shortcut {
  name: string;
  keys: string[];
  description: string;
}

export interface Cheatsheet {
  name: string;
  shortcuts: Shortcut[];
}
