import { Cheatsheet } from "../typings/cheatsheet";
import { Badge } from "./ui/badge";

const ShortcutList = ({ cheatsheet }: { cheatsheet: Cheatsheet }) => {
  return (
    <div className="overflow-x-auto w-full p-2">
      <table className="table">
        <tbody>
          {cheatsheet.categories.length > 0 ? (
            cheatsheet.categories.map((category) => (
              <>
                <h1 className="font-bold">{category.name}</h1>
                {category.shortcuts.map((shortcut) => (
                  <tr key={shortcut.name}>
                    <td>
                      <Badge variant="outline" className="mr-2">
                        {shortcut.keys}
                      </Badge>
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
