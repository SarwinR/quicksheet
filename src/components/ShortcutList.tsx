import { Cheatsheet } from "../typings/Cheatsheet";

const ShortcutList = ({ cheatsheet }: { cheatsheet: Cheatsheet }) => {
  return (
    <div className="overflow-x-auto w-full p-2">
      <table className="table">
        <tbody>
          {cheatsheet.shortcuts.length > 0 ? (
            cheatsheet.shortcuts.map((category) => (
              <>
                <h1 className="font-bold">{category.name}</h1>
                {category.shortcuts.map((shortcut) => (
                  <tr key={shortcut.keys}>
                    <td>
                      <kbd className="kbd kbd-sm">{shortcut.keys}</kbd>
                    </td>
                    <td>{shortcut.description}</td>
                  </tr>
                ))}
              </>
            ))
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
