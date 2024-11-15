import { Cheatsheet } from "../models/Cheatsheet";

const ShortcutList = ({ cheatsheet }: { cheatsheet: Cheatsheet }) => {
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
          {cheatsheet.shortcuts.length > 0 ? (
            cheatsheet.shortcuts.map((category) =>
              category.shortcuts.map((shortcut) => (
                <tr key={shortcut.keys}>
                  <td>
                    <kbd className="kbd kbd-sm">{shortcut.keys}</kbd>
                  </td>
                  <td>{shortcut.description}</td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No shortcuts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShortcutList;
