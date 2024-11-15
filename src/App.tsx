import { invoke } from "@tauri-apps/api/core";
import ShortcutList from "./components/ShortcutList";
import { useEffect, useState } from "react";
import { Cheatsheet } from "./models/Cheatsheet";

function App() {
  const [cheatsheets, setCheatsheets] = useState<Cheatsheet[]>([]);
  const [selectedCheatsheet, setSelectedCheatsheet] = useState<Cheatsheet | null>(null);

  useEffect(() => {
    fetchCheatsheets();
  }, []);

  function fetchCheatsheets() {
    invoke("fetch_cheatsheets").then((res) => {
      let cheatsheets = JSON.parse(res as string);
      setCheatsheets(cheatsheets);
      if (cheatsheets.length > 0){
        setSelectedCheatsheet(cheatsheets[0]);
      }
    });
  }

  function handleCheatsheetSelect(name: string) {
    const selected = cheatsheets.find((cheatsheet) => cheatsheet.name === name);
    setSelectedCheatsheet(selected || null);
  }

  return (
    <div className="bg-base-300 backdrop-blur-lg h-screen w-screen p-2 flex flex-col justify-start items-center">
      {selectedCheatsheet && (
        <h1 className="text-xl font-bold mb-4">{selectedCheatsheet.name}</h1>
      )}
      <div className="flex flex-row justify-center items-center space-x-4 mb-4">
        <input type="text" placeholder="Search shortcuts..." className="input w-full" />
        <select
          onChange={(e) => handleCheatsheetSelect(e.target.value)}
          className="select w-full max-w-xs"
        >
          {cheatsheets.length > 0 ? (
            cheatsheets.map((cheatsheet, index) => (
              <option key={index} value={cheatsheet.name}>
                {cheatsheet.name}
              </option>
            ))
          ) : (
            <option>No cheatsheets found</option>
          )}
        </select>
      </div>

      {selectedCheatsheet && <ShortcutList cheatsheet={selectedCheatsheet} />}
    </div>
  );
}

export default App;
