use std::{fs, path::PathBuf};
use tauri::{App, Manager};
use yaml_rust2::{Yaml, YamlLoader};

#[derive(serde::Serialize)]
pub struct CheatSheet {
    name: String,
    path: String,
    description: String,
    shortcuts: Vec<Category>,
}

#[derive(serde::Serialize)]
pub struct Category {
    name: String,
    shortcuts: Vec<Shortcut>,
}

#[derive(serde::Serialize)]
pub struct Shortcut {
    keys: String,
    description: String,
}

pub fn load_cheatsheets(app: &App) -> Result<String, Box<dyn std::error::Error>> {
    let cheatsheets_path = app.path().home_dir()?.join(".quicksheet/cheatsheets");

    check_and_create_cheatsheet_folder(&cheatsheets_path)?;

    let cheatsheets = read_cheatsheet_files(&cheatsheets_path)?;

    let cheatsheets_json_string = serde_json::to_string(&cheatsheets)?;

    Ok(cheatsheets_json_string)
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


// give example of a valid cheatsheet yaml file
// info:
//   - name: "Vim"
//     description: "Vim shortcuts"
// shortcuts:
//   Normal:
//     - keys: "h"
//       description: "Move cursor left"
//     - keys: "j"
//       description: "Move cursor down"
//     - keys: "k"
//       description: "Move cursor up"
//     - keys: "l"
//       description: "Move cursor right"
//   Insert:
//     - keys: "i"
//       description: "Enter insert mode"
//     - keys: "a"
//       description: "Enter insert mode after cursor"
//     - keys: "o"
//       description: "Enter insert mode below cursor"
//     - keys: "O"
//       description: "Enter insert mode above cursor"
//   Visual:
//     - keys: "v"
//       description: "Enter visual mode"
//     - keys: "V"
//       description: "Enter visual line mode"
//     - keys: "Ctrl-v"
//       description: "Enter visual block mode"
//   Command:
//     - keys: ":"
//       description: "Enter command mode"
//     - keys: "/"
//       description: "Enter search mode"
//     - keys: "Esc"
//       description: "Exit command mode"
//     - keys: "Ctrl-c"
//       description: "Exit command mode"
