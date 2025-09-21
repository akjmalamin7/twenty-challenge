import { useState } from "react";
import type { UpdateEffectData } from "./update-without-effect-data";

interface Props {
  items: UpdateEffectData[]
}

const List = ({ items }: Props) => {
  const [selected, setSelected] = useState<UpdateEffectData | null>(null)

  return (
    <>
      <button>Switch to item 1</button>
      <button>Switch to item 2</button>
      <ul>
        {
          items.map(item => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selected?.id === item.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected(item)
                    } else {
                      setSelected(null)
                    }
                  }}
                />
                {item.title}
              </label>
            </li>
          ))
        }
      </ul>

      <div>
        {selected && <h1>{selected.title}</h1>}
      </div>
    </>
  );
};

export default List;
