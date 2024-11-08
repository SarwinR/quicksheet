import ShortcutList from "./components/ShortcutList";

function App() {
  return (
    <div className="bg-base-300 backdrop-blur-lg h-screen w-screen p-2 flex flex-col justify-start items-center">
      <div className="flex flex-row justify-center items-center space-x-4">
        <input type="text" placeholder="Type here" className="input w-full" />
        <select className="select w-full max-w-xs">
          <option value="vim">Vim</option>
          <option value="vscode">VSCode</option>
          <option value="webstorm">Python</option>
          <option value="sublime">Rust</option>
        </select>
      </div>

      <ShortcutList />
    </div>
  );
}

export default App;
