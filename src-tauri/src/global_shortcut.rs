use tauri::{App, AppHandle, Manager};
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

pub fn initialize_shortcut(app: &App, handle: AppHandle) -> tauri::Result<()> {
    let global_shortcut = Shortcut::new(Some(Modifiers::CONTROL | Modifiers::SHIFT), Code::Enter);

    let handle_clone = handle.clone();

    app.handle().plugin(
        tauri_plugin_global_shortcut::Builder::new()
            .with_handler(move |_, shortcut, event| {
                if shortcut == &global_shortcut {
                    let webview = handle_clone.get_webview_window("main").unwrap();
                    match event.state() {
                        ShortcutState::Pressed => {
                            if webview.is_visible().unwrap() {
                                webview.hide().unwrap();
                            } else {
                                webview.show().unwrap();
                            }
                        }
                        ShortcutState::Released => {}
                    }
                }
            })
            .build(),
    )?;

    app.global_shortcut()
        .register(global_shortcut)
        .map_err(|e| tauri::Error::Anyhow(e.into()))?;

    Ok(())
}
