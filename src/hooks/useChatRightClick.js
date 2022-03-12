import { useState, useEffect } from "react";

const useChatRightClick = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setX(e.pageX);
    setY(e.pageY);
    setShowMenu(true);
  };
  const handleClick = () => {
    showMenu && setShowMenu(false);
  };

  useEffect(() => {
    const chats = document.querySelectorAll(".chat-item");
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

  return { x, y, showMenu };
};

export default useChatRightClick;
