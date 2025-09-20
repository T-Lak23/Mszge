import { create } from "zustand";
import { api } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
let notificationSound;

function getNotificationSound() {
  if (!notificationSound) {
    notificationSound = new Audio("/sounds/notification.mp3");
  }
  return notificationSound;
}
export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  isUsersLoading: false,
  isMessagesLoading: false,
  activeTab: "chats",
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  lastMessage: null,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    set({ selectedUser: user });
  },

  clearSelectedUser: () => {
    localStorage.removeItem("selectedUser");
    set({ selectedUser: null });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/messages/contacts");
      set({ allContacts: res.data.user });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/messages/chats");
      set({ chats: res.data.chatPartners });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  // getMessagesByUserId: async (id, page = 1, limit = 15) => {
  //   set({ isMessagesLoading: true });
  //   try {
  //     const res = await api.get(`/messages/${id}?page=${page}&limit=${limit}`);
  //     if (page === 1) {
  //       set({ messages: res.data.messages.reverse() });
  //     } else {
  //       set({ messages: [...res.data.messages.reverse, ...get().messages] });
  //     }
  //     return res.data.hasMore;
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error?.response?.data?.message);
  //   } finally {
  //     set({ isMessagesLoading: false });
  //   }
  // },

  getMessagesByUserId: async (id, page = 1, limit = 15) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/messages/${id}?page=${page}&limit=${limit}`);

      if (page === 1) {
        // first load (latest messages)
        set({ messages: res.data.messages.reverse() });
      } else {
        // prepend older messages
        set({
          messages: [...res.data.messages.reverse(), ...get().messages],
        });
      }

      return res.data.hasMore;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    set({ messages: [...messages, optimisticMessage] });
    try {
      const res = await api.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: messages.concat(res.data.newMessage) });
    } catch (error) {
      set({ messages: messages });
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },
  susbcribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const sound = getNotificationSound();
        sound.currentTime = 0;
        sound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },
  unsubsribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
