import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useNavigate } from "react-router";
import NoConversationPlaceholder from "./NoConversationPlaceholder";
const ChatsList = () => {
  const {
    chats,
    isUsersLoading,
    setSelectedUser,
    getMyChatPartners,
    messages,
    getMessagesByUserId,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners, messages]);
  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats?.length === 0)
    return "Choose a contact from above tab to start a chatting";

  const filteredChats = chats.filter((chat) =>
    chat.fullName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full my-3 bg-card text-card_foreground border border-border  focus:outline-none"
      />
      {filteredChats.length === 0 || !filteredChats
        ? "Choose a contact from above tab to start a chatting"
        : filteredChats?.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                setSelectedUser(chat);
                navigate(`/chat/${chat._id}`);
              }}
              className="mt-3 bg-card border border-border rounded-lg px-3 py-2 cursor-pointer "
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`avatar ${
                    onlineUsers.includes(chat._id) ? "online" : "offline"
                  }`}
                >
                  <div className="size-10 rounded-full">
                    <img
                      src={chat.profilePic || "/avatar.png"}
                      alt={chat.fullName}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{chat.fullName}</h4>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ChatsList;
