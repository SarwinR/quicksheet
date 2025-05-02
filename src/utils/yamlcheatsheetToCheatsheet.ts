import { Cheatsheet, YAMLCheatsheet } from "@/typings/cheatsheet"

export const mapYAMLCheatsheetToCheatsheet = (
  yamlCheatsheet: YAMLCheatsheet,
): Cheatsheet => {
    return {
        name: yamlCheatsheet.name,
        description: yamlCheatsheet.description,
        path: yamlCheatsheet.path,
        shortcutCategories: yamlCheatsheet.shortcut_categories
    }
}

export const mapYAMLCheatsheetToCheatsheetArray = (
  yamlCheatsheets: YAMLCheatsheet[],
): Cheatsheet[] => {
    return yamlCheatsheets.map((yamlCheatsheet) => mapYAMLCheatsheetToCheatsheet(yamlCheatsheet))
}