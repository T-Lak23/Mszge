import React from "react";
import { Outlet, useParams } from "react-router";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab } = useChatStore();
  const { id } = useParams(); // if we’re on /chat/:id

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div
        className={`
          w-full md:w-[300px] h-full flex-col bg-sidebar text-sidebar_foreground border-r border-border
          ${id ? "hidden md:flex" : "flex"} 
        `}
      >
        <div className="px-5 py-7 flex flex-col h-full">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div
        className={`
          flex-1 h-full 
          ${id ? "flex" : "hidden md:flex"} 
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
