use std::{fs, path::PathBuf};
use tauri::{App, Manager};
use tauri_plugin_dialog::{DialogExt, MessageDialogKind};
use yaml_rust2::{Yaml, YamlLoader};

pub fn load_and_setup_configuration(app: &App) -> Result<Yaml, Box<dyn std::error::Error>> {
    let config_file_path = app.path().home_dir()?.join(".quicksheet/config.yaml");

    check_and_create_config_file(&config_file_path)?;
    let general_config = load_configuration(&app, &config_file_path)?;

    Ok(general_config)
}

fn check_and_create_config_file(
    config_file_path: &PathBuf,
) -> Result<(), Box<dyn std::error::Error>> {
    if !config_file_path.try_exists()? {
        //todo: copy the default configuration file to the config file path
        fs::create_dir_all(config_file_path.parent().unwrap())?;
        fs::write(
            &config_file_path,
            "general:\n- shortcut: [\"ctrl+shift+enter\"]",
        )?;
    }

    Ok(())
}

fn load_configuration(
    app: &App,
    config_file_path: &PathBuf,
) -> Result<Yaml, Box<dyn std::error::Error>> {
    let configuration_string = fs::read_to_string(config_file_path)?;

    let configs = match YamlLoader::load_from_str(&configuration_string) {
        Ok(configs) => configs,
        Err(_) => {
            app
                .dialog()
                .message("The configuration file is invalid. Please check the configuration file and try again.")
                .kind(MessageDialogKind::Error)
                .title("Quicksheet Invalid Configuration")
                .blocking_show();
            return Err("Invalid configuration file".into());
        }
    };

    // todo: check if the configuration file is valid

    let general_config = configs[0].clone();
    Ok(general_config)
}
