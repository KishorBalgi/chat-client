import { useState, useEffect } from "react";

const useMsgRightClick = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [id, setId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setX(e.pageX);
    setY(e.pageY);
    setId(e.target.getAttribute("data-id"));
    setShowMenu(true);
  };
  const handleClick = () => {
    showMenu && setShowMenu(false);
  };

  useEffect(() => {
    const chats = document.querySelectorAll(".chat-dis");
    chats.forEach((c) => {
      c.addEventListener("contextmenu", handleContextMenu);
    });
    document.addEventListener("click", handleClick);
    return () => {
      chats.forEach((c) =>
        c.removeEventListener("contextmenu", handleContextMenu)
      );
      document.removeEventListener("click", handleClick);
    };
  });

  return { x, y, showMenu, id };
};

export default useMsgRightClick;
