import { invoke } from "@tauri-apps/api/core";
import ShortcutList from "./components/ShortcutList";
import { useEffect, useState } from "react";
import { Cheatsheet, Shortcut, YAMLCheatsheet } from "@/typings/cheatsheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCheatsheets } from "./mock/cheatsheets";
import { Input } from "./components/ui/input";

import { Search } from "js-search";
import { Badge } from "./components/ui/badge";
import { mapYAMLCheatsheetToCheatsheetArray } from "./utils/yamlcheatsheet_to_cheatsheet";

function App() {
  const [cheatsheets, setCheatsheets] = useState<Cheatsheet[]>([]);
  const [selectedCheatsheet, setSelectedCheatsheet] =
    useState<Cheatsheet | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Shortcut[]>([]);

  useEffect(() => {
    fetchCheatsheets();
  }, []);

  function fetchCheatsheets(useMock = false) {
    if (useMock) {
      setCheatsheets(mockCheatsheets);
      if (mockCheatsheets.length > 0) setSelectedCheatsheet(mockCheatsheets[0]);
      return;
    }

    invoke("fetch_cheatsheets").then((res) => {
      let yamlCheatsheets = JSON.parse(res as string) as YAMLCheatsheet[];
      let cheatsheets = mapYAMLCheatsheetToCheatsheetArray(yamlCheatsheets);
      setCheatsheets(cheatsheets);
      if (cheatsheets.length > 0) {
        setSelectedCheatsheet(cheatsheets[0]);
      }
    });
  }

  function handleCheatsheetSelect(name: string) {
    const selected = cheatsheets.find((cheatsheet) => cheatsheet.name === name);
    setSelectedCheatsheet(selected ?? null);
  }
  const [searchEngine, setSearchEngine] = useState<Search | null>(null);

  useEffect(() => {
    const search = new Search("id");
    search.addIndex("name");
    search.addIndex("description");
    search.addIndex("keys");
    const shortcuts = cheatsheets.flatMap((cheatsheet) =>
      cheatsheet.shortcutCategories.flatMap((category) =>
        category.shortcuts.map((shortcut, index) => ({
          ...shortcut,
          id: `${shortcut.keys}-${index}`,
        }))
      )
    );
    search.addDocuments(shortcuts);
    setSearchEngine(search);
  }, [cheatsheets]);

  useEffect(() => {
    if (!searchEngine || searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = searchEngine.search(searchQuery);
    setSearchResults(results as Shortcut[]);
  }, [searchQuery, searchEngine]);

  return (
    <div className="h-screen w-screen p-2 flex flex-col justify-start items-center">
      <div className="flex flex-row justify-center items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search shortcuts..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          onValueChange={handleCheatsheetSelect}
          value={selectedCheatsheet?.name}
        >
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

      {selectedCheatsheet && searchQuery.length === 0 && (
        <ShortcutList cheatsheet={selectedCheatsheet} />
      )}

      {searchResults.length > 0 && (
        <div className="overflow-x-auto w-full p-2">
          <h1 className="font-bold">Search Results</h1>
          <table className="table">
            <tbody>
              {searchResults.map((shortcut) => (
                <tr key={shortcut.name}>
                  <td>
                    <Badge variant="outline" className="mr-2">
                      {shortcut.keys}
                    </Badge>
                  </td>
                  <td>{shortcut.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
