import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

function App() {
  // wait for enter key to be pressed then close the window
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      getCurrentWebviewWindow().close();
    }
  });

  return (
    <div className="bg-slate-600/90 backdrop-blur-lg h-screen w-screen p-2 flex items-center justify-center">
      <p className="text-white bg-slate-700 p-2 rounded-xl">
        KEYBOARD SHORTCUTS GOES HERE :)
      </p>
    </div>
  );
}

export default App;
