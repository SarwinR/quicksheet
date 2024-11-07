use tauri::{menu::Menu, menu::MenuItem, tray::TrayIconBuilder, App};

pub fn initialize_system_tray_menu(app: &App) -> tauri::Result<()> {
    let open_config_i = MenuItem::with_id(app, "open-config", "Open Config", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&open_config_i, &quit_i])?;

    TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .menu_on_left_click(true)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "open-config" => println!("open-config menu item was clicked"),
            "quit" => app.exit(0),
            _ => println!("menu item {:?} not handled", event.id),
        })
        .build(app)?;

    Ok(())
}
