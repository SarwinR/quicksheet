use std::{fs, path::PathBuf};
use tauri::{App, Manager};
use yaml_rust2::{Yaml, YamlLoader};

pub struct CheatSheet {
    name: String,
    path: String,
    description: String,
    shortcuts: Vec<Category>,
}

pub struct Category {
    name: String,
    shortcuts: Vec<Shortcut>,
}

pub struct Shortcut {
    keys: String,
    description: String,
}

pub fn load_cheatsheets(app: &App) -> Result<Vec<CheatSheet>, Box<dyn std::error::Error>> {
    let cheatsheets_path = app.path().home_dir()?.join(".quicksheet\\cheatsheets");

    check_and_create_cheatsheet_folder(&cheatsheets_path)?;

    let cheatsheets = read_cheatsheet_files(&cheatsheets_path)?;

    Ok(cheatsheets)
}

fn check_and_create_cheatsheet_folder(
    cheatsheets_path: &PathBuf,
) -> Result<(), Box<dyn std::error::Error>> {
    if !cheatsheets_path.exists() {
        fs::create_dir_all(cheatsheets_path)?;
    }

    //todo: move the default cheatsheets to the cheatsheets folder

    Ok(())
}

fn read_cheatsheet_files(cheatsheets_path: &PathBuf) -> Result<Vec<CheatSheet>, Box<dyn std::error::Error>> {
    let mut cheatsheets = Vec::new();

    for entry in fs::read_dir(cheatsheets_path)? {
        let entry = entry?;
        let path = entry.path();
    
        // todo: validate the structure of the yaml file
        if path.is_file() && path.extension().unwrap() == "yaml" {
            let file_content = fs::read_to_string(&path)?;
            let yaml_content = YamlLoader::load_from_str(&file_content).unwrap();

            let info = &yaml_content[0]["info"][0].as_hash().unwrap();
            let name = info.get(&Yaml::String("name".to_string())).unwrap().as_str().unwrap();
            let description = info.get(&Yaml::String("description".to_string())).unwrap().as_str().unwrap(); 

            let shortcuts = &yaml_content[0]["shortcuts"].as_hash().unwrap();
            let shortcut_categories = shortcuts.keys();

            let mut categories = Vec::new();

            for category in shortcut_categories {
                let category_name = category.as_str().unwrap();
                let category_shortcuts = shortcuts.get(&Yaml::String(category_name.to_string())).unwrap().as_vec().unwrap();

                let mut category = Category {
                    name: category_name.to_string(),
                    shortcuts: Vec::new(),
                };

                for shortcut in category_shortcuts {
                    let shortcut_hash = shortcut.as_hash().unwrap();

                    let keys = shortcut_hash.get(&Yaml::String("keys".to_string())).unwrap().as_str().unwrap();
                    let description = shortcut_hash.get(&Yaml::String("description".to_string())).unwrap().as_str().unwrap();

                    // todo: Change the type of keys so that it automatically converts the single string to a vector of strings
                    category.shortcuts.push(Shortcut {
                        keys: keys.to_string(),
                        description: description.to_string(),
                    });
                }

                categories.push(category);
            }

            cheatsheets.push(CheatSheet {
                name: name.to_string(),
                path: path.to_str().unwrap().to_string(),
                description: description.to_string(),
                shortcuts: categories,
            });
        }
    }

    Ok(cheatsheets)
}