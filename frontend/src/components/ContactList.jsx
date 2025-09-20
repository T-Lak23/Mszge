import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useNavigate } from "react-router";

const ContactList = () => {
  const { allContacts, isUsersLoading, setSelectedUser, getAllContacts } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts?.length === 0) return "No chats found";

  const filteredContacts = allContacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full my-3 bg-card text-card_foreground border border-border focus:outline-none "
      />

      {filteredContacts?.map((contact) => (
        <div
          key={contact._id}
          className="mt-3 bg-card border border-border rounded-lg px-3 py-2 cursor-pointer "
          onClick={() => {
            setSelectedUser(contact);
            navigate(`/chat/${contact._id}`);
          }}
        >
          <div className="flex gap-2 items-center">
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-10 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4>{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
