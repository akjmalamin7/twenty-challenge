import { useState } from "react";

type MenuNames = {
  _id: string;
  name: string;
};
const menuNames: MenuNames[] = [
  { _id: "1", name: "Google" },
  { _id: "2", name: "Facebook" },
  { _id: "3", name: "Instagram" },
  { _id: "4", name: "Tiktok" },
  { _id: "5", name: "Tumblr" },
  { _id: "6", name: "Snapchat" },
  { _id: "7", name: "Youtube" },
];

const BrandMenu = () => {
  const [menus, setMenus] = useState<MenuNames[]>(menuNames);
  const [copy, setCopy] = useState<MenuNames[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleMenuClick = (menu: MenuNames) => {
    setMenus(menus.filter((mn) => mn._id !== menu._id));
    setCopy((prev) => [...prev, menu]);
  };

  const handleRemoveCopy = (menu: MenuNames) => {
    setCopy(copy.filter((cp) => cp._id !== menu._id));

    // ফিরিয়ে দেওয়ার সময় আগের ক্রম ধরে sort করা
    setMenus((prev) => {
      const newMenus = [...prev, menu];
      return newMenus.sort(
        (a, b) =>
          menuNames.findIndex((mn) => mn._id === a._id) -
          menuNames.findIndex((mn) => mn._id === b._id)
      );
    });
  };

  return (
    <div>
      <button
        className="bg-white px-5 h-10 text-gray-950 rounded-sm lg:cursor-pointer"
        onClick={handleVisible}
      >
        Add social link
      </button>

      {visible && (
        <div className="bg-gray-100 rounded-md w-[200px]">
          <ul>
            {menus.map((menu) => (
              <li
                key={menu._id}
                onClick={() => handleMenuClick(menu)}
                className="text-gray-900 p-2 hover:bg-gray-500 lg:cursor-pointer"
              >
                {menu.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        {copy.map((cp) => (
          <div
            key={cp._id}
            onClick={() => handleRemoveCopy(cp)}
            className="flex gap-2 items-center"
          >
            <div className="flex gap-2">
              <span>{cp.name}</span>
              <input type="text" className="border" />
            </div>
            <button className="text-red-500">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BrandMenu;
