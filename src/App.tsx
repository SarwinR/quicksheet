import { invoke } from "@tauri-apps/api/core";
import ShortcutList from "./components/ShortcutList";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cheatsheet } from "@/typings/cheatsheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const [cheatsheets, setCheatsheets] = useState<Cheatsheet[]>([]);
  const [selectedCheatsheet, setSelectedCheatsheet] =
    useState<Cheatsheet | null>(null);

  useEffect(() => {
    fetchCheatsheets();
  }, []);

  function fetchCheatsheets() {
    invoke("fetch_cheatsheets").then((res) => {
      let cheatsheets = JSON.parse(res as string);
      setCheatsheets(cheatsheets);
      if (cheatsheets.length > 0) {
        setSelectedCheatsheet(cheatsheets[0]);
      }
    });
  }

  function handleCheatsheetSelect(name: string) {
    const selected = cheatsheets.find((cheatsheet) => cheatsheet.name === name);
    setSelectedCheatsheet(selected || null);
  }

  return (
    <div className="h-screen w-screen p-2 flex flex-col justify-start items-center">
      <div className="flex flex-row justify-center items-center space-x-4 mb-4">
        <Button>Click me</Button>
        <input
          type="text"
          placeholder="Search shortcuts..."
          className="input w-full"
        />

        <Select onValueChange={handleCheatsheetSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Cheatsheet" />
          </SelectTrigger>
          <SelectContent>
            {cheatsheets.length > 0 ? (
              cheatsheets.map((cheatsheet, index) => (
                <SelectItem key={index} value={cheatsheet.name}>
                  {cheatsheet.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none">No cheatsheets found</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedCheatsheet && <ShortcutList cheatsheet={selectedCheatsheet} />}
    </div>
  );
}

export default App;
