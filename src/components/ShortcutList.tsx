const ShortcutList = () => {
  const vimCheatSheet = [
    { command: ":w", description: "Save file" },
    { command: ":q", description: "Quit" },
    { command: ":wq", description: "Save and quit" },
    { command: ":q!", description: "Quit without saving" },
    { command: "i", description: "Insert mode" },
    { command: "esc", description: "Exit insert mode" },
    { command: "dd", description: "Delete line" },
    { command: "yy", description: "Copy line" },
    { command: "p", description: "Paste" },
    { command: "/text", description: "Search for 'text'" },
    { command: "n", description: "Repeat last search" },
    {
      command: ":%s/old/new/g",
      description: "Replace 'old' with 'new' globally",
    },
  ];

  return (
    <div className="overflow-x-auto w-full p-2">
      <table className="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {vimCheatSheet.map((shortcut) => (
            <tr>
              <td>
                <kbd className="kbd kbd-sm">{shortcut.command}</kbd>
              </td>
              <td>{shortcut.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortcutList;
