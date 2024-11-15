import { invoke } from "@tauri-apps/api/core";
import ShortcutList from "./components/ShortcutList";
import { useEffect, useState } from "react";

function App() {
  const [cheatsheets, setCheatsheets] = useState([]);

  useEffect(() => {
    fetchCheatsheets();
  }, []);

  function fetchCheatsheets() {
    invoke("fetch_cheatsheets").then((res) => {
      setCheatsheets(JSON.parse(res as string));
    });
  }

  return (
    <div className="bg-base-300 backdrop-blur-lg h-screen w-screen p-2 flex flex-col justify-start items-center">
      <div className="flex flex-row justify-center items-center space-x-4">
        <input type="text" placeholder="Type here" className="input w-full" />
        <select
        className="select w-full max-w-xs">
          {
            cheatsheets.length > 0 ?
            cheatsheets.map((cheatsheet, index) => {
              return <option key={index} value={cheatsheet['name']}>{cheatsheet['name']}</option>
            }) : <option>No cheatsheets found</option>
          }
        </select>
      </div>

      <ShortcutList cheatsheets={cheatsheets} />
    </div>
  );
}

export default App;
