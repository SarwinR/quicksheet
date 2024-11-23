use tauri::{AppHandle, WebviewUrl, WebviewWindowBuilder};

pub fn initialize_webview(handle: &AppHandle) -> tauri::Result<()> {
    WebviewWindowBuilder::new(handle, "main", WebviewUrl::default())
        .inner_size(1920.0, 1080.0)
        .decorations(false)
        .transparent(true)
        .resizable(false)
        .center()
        .always_on_top(true)
        .skip_taskbar(true)
        .visible(false)
        .build()?;

    Ok(())
}
