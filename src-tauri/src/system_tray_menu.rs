use std::process::Command;
use tauri::{menu::Menu, menu::MenuItem, tray::TrayIconBuilder, App, Manager};

pub fn initialize_system_tray_menu(app: &App) -> tauri::Result<()> {
    let open_config_i = MenuItem::with_id(app, "open-config", "Open Config", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&open_config_i, &quit_i])?;

    TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .menu_on_left_click(true)
        .on_menu_event(|app_handle, event| match event.id.as_ref() {
            "open-config" => {
                let app_handle = app_handle.clone();
                let config_file_path = app_handle.path().home_dir().unwrap().join(".quicksheet");
                
                #[cfg(target_os = "windows")]
                let _ = Command::new("explorer").arg(config_file_path).spawn();

                #[cfg(target_os = "macos")]
                let _ = Command::new("open").arg(config_file_path).spawn();

                #[cfg(target_os = "linux")]
                let _ = Command::new("xdg-open").arg(config_file_path).spawn();
            }
            "quit" => app_handle.exit(0),
            _ => println!("menu item {:?} not handled", event.id),
        })
        .build(app)?;

    Ok(())
}
