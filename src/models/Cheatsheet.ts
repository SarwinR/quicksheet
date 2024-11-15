interface Shortcut {
    keys: string;
    description: string;
}
  
interface ShortcutCategory {
    name: string;
    shortcuts: Shortcut[];
}

export interface Cheatsheet {
    name: string;
    path: string;
    description: string;
    shortcuts: ShortcutCategory[];
}