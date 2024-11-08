// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod configuration;
mod global_shortcut;
mod system_tray_menu;
mod webview;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let handle = app.handle();

            let general_config = configuration::load_and_setup_configuration(app)?;

            system_tray_menu::initialize_system_tray_menu(app)?;

            webview::initialize_webview(&handle)?;

            // todo: use the general_config to setup the application [only shortcut keys for now]
            global_shortcut::initialize_shortcut(app, handle.clone())?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
