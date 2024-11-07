// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod global_shortcut;
mod system_tray_menu;
mod webview;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();

            system_tray_menu::initialize_system_tray_menu(app)?; // Initialize the menu
            webview::initialize_webview(&handle)?; // Initialize the webview window
            global_shortcut::initialize_shortcut(app, handle.clone())?; // Initialize global shortcuts

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
