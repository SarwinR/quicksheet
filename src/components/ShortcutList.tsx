const ShortcutList = ({ cheatsheets }: { cheatsheets: Array<any> }) => {
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
          {
          cheatsheets.length > 0 ? 
          cheatsheets[0]["shortcuts"].map((category: any) =>
            category.shortcuts.map((shortcut: any) => (
              <tr key={shortcut.keys}>
                <td>
                  <kbd className="kbd kbd-sm">{shortcut.keys}</kbd>
                </td>
                <td>{shortcut.description}</td>
              </tr>
            ))
          ): <tr><td colSpan={2}>No shortcuts found</td></tr>
        }
        </tbody>
      </table>
    </div>
  );
};

export default ShortcutList;