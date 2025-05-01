import { Cheatsheet } from "@/typings/cheatsheet";

export const mockCheatsheets: Cheatsheet[] = [
    {
        name: "VSCode",
        shortcutCategories: [
            {
                name: "General",
                shortcuts: [
                    { name: "ShowCommandPalette", keys: ["Ctrl + Shift + P"], description: "Show Command Palette" },
                    { name: "QuickOpen", keys: ["Ctrl + P"], description: "Quick Open" },
                    { name: "NewWindow", keys: ["Ctrl + Shift + N"], description: "New Window" },
                    { name: "CloseWindow", keys: ["Ctrl + Shift + W"], description: "Close Window" },
                ],
            },
            {
                name: "Editing",
                shortcuts: [
                    { name: "Copy", keys: ["Ctrl + C"], description: "Copy" },
                    { name: "Cut", keys: ["Ctrl + X"], description: "Cut" },
                    { name: "Paste", keys: ["Ctrl + V"], description: "Paste" },
                    { name: "Undo", keys: ["Ctrl + Z"], description: "Undo" },
                ],
            },
        ],
    },
    {
        name: "Chrome",
        shortcutCategories: [
            {
                name: "Navigation",
                shortcuts: [
                    { name: "OpenNewTab", keys: ["Ctrl + T"], description: "Open new tab" },
                    { name: "CloseCurrentTab", keys: ["Ctrl + W"], description: "Close current tab" },
                    { name: "ReopenLastClosedTab", keys: ["Ctrl + Shift + T"], description: "Reopen last closed tab" },
                ],
            },
        ],
    }
];