import React, { useState } from "react";
import "./chat-menu.styles.css";
// Components:
import ProfileBar from "../profile-bar/profile-bar.component";
import { SearchBar } from "../search-bar/search-bar.component";
import ChatList from "../chat-list/chat-list.component";
import Profile from "../profile/profile.component";

export const ChatMenu = () => {
  const [showProfile, setShowProfile] = useState(false);
  if (showProfile) {
    return (
      <div className="chat-menu">
        <Profile showProfile={setShowProfile} />
      </div>
    );
  }
  return (
    <div className="chat-menu">
      <div className="chat-menu-bar">
        <ProfileBar showProfile={setShowProfile} />
        <SearchBar />
      </div>
      <ChatList />
    </div>
  );
};
