// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
use tauri::Manager;

mod cheatsheets;
mod configuration;
mod global_shortcut;
mod system_tray_menu;
mod webview;


// #[tauri::command]
// fn fetch_cheatsheets(cheatsheets: tauri::State<'_, String>) -> String {
//     //cheatsheets.to_string()
// }

// #[tauri::command]
// fn fetch_cheatsheets() -> String {
//     //cheatsheets.to_string()
//     "Test cheatsheets".to_string()
// }

#[tauri::command]
fn fetch_cheatsheets(cheatsheets: tauri::State<'_, Arc<String>>) -> String {
    cheatsheets.to_string()
}


fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let handle = app.handle();

            let general_config = configuration::load_and_setup_configuration(app)?;

            let cheatsheets_content = cheatsheets::load_cheatsheets(app)?;
            let cheatsheets = Arc::new(cheatsheets_content);
            app.manage(cheatsheets);

            system_tray_menu::initialize_system_tray_menu(app)?;

            webview::initialize_webview(&handle)?;

            // todo: use the general_config to setup the application [only shortcut keys for now]
            global_shortcut::initialize_shortcut(app, handle.clone())?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![fetch_cheatsheets])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
