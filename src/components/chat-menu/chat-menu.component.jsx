import React, { useState } from "react";
import "./chat-menu.styles.css";
// Components:
import ProfileBar from "../profile-bar/profile-bar.component";
import SearchBar from "../search-bar/search-bar.component";
import ChatList from "../chat-list/chat-list.component";
import Profile from "../profile/profile.component";
import Settings from "../settings/settings.component";
import Account from "../account/account.components";
import ChangePassword from "../changePassword/changePassword.component";

export const ChatMenu = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showChgPass, setShowChgPass] = useState(false);

  if (showProfile) {
    return (
      <div className="chat-menu">
        <Profile showProfile={setShowProfile} />
      </div>
    );
  }
  if (showSettings) {
    return (
      <div className="chat-menu">
        <Settings showSettings={setShowSettings} showAccount={setShowAccount} />
      </div>
    );
  }
  if (showAccount) {
    return (
      <div className="chat-menu">
        <Account
          showSettings={setShowSettings}
          showProfile={setShowProfile}
          showAccount={setShowAccount}
          showChgPass={setShowChgPass}
        />
      </div>
    );
  }
  if (showChgPass) {
    return (
      <div className="chat-menu">
        <ChangePassword
          showAccount={setShowAccount}
          showChgPass={setShowChgPass}
        />
      </div>
    );
  }
  return (
    <div className="chat-menu">
      <div className="chat-menu-bar">
        <ProfileBar
          showProfile={setShowProfile}
          showSettings={setShowSettings}
        />
        <SearchBar />
      </div>
      <ChatList />
    </div>
  );
};
