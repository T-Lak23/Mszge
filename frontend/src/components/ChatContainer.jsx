// export default ChatContainer;
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { LoaderCircle } from "lucide-react";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

const ChatContainer = () => {
  const {
    getMessagesByUserId,
    messages,
    selectedUser,
    isMessagesLoading,
    susbcribeToMessages,
    unsubsribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const [page, setPage] = useState(1);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    setPage(1);
    loadMessages(1, true);
    susbcribeToMessages();
    return () => unsubsribeFromMessages();
  }, [selectedUser]);

  const loadMessages = async (pageNum, scrollToBottom = false) => {
    const more = await getMessagesByUserId(selectedUser._id, pageNum);
    setHasMore(more);
    if (scrollToBottom && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!loadingOlder && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = async () => {
    if (containerRef.current.scrollTop === 0 && hasMore && !isMessagesLoading) {
      setLoadingOlder(true);
      const nextPage = page + 1;
      setPage(nextPage);
      const oldHeight = containerRef.current.scrollHeight;
      await loadMessages(nextPage);
      const newHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop = newHeight - oldHeight;
      setLoadingOlder(false);
    }
  };

  const formatDate = (date) => {
    const msgDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (msgDate.toDateString() === today.toDateString()) return "Today";
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return msgDate.toLocaleDateString();
  };

  let lastDate = "";

  return (
    <div className="h-screen hide-scrollbar flex flex-col w-full">
      <ChatHeader />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-y-auto flex-1 hide-scrollbar  px-2 py-4"
      >
        {loadingOlder && (
          <p className="flex justify-center w-full m-3">
            <LoaderCircle className="text-primary animate-spin" />
          </p>
        )}

        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={authUser?.fullName} />
        ) : (
          messages.map((message, i) => {
            const msgDate = formatDate(message.createdAt);
            const showDate = msgDate !== lastDate;
            lastDate = msgDate;

            return (
              <div key={message._id}>
                {showDate && (
                  <div className="text-center sm:text-base text-[13px] text-muted_foreground my-2">
                    {msgDate}
                  </div>
                )}
                <div
                  className={`chat ${
                    message.senderId === authUser._id
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble break-words max-w-[75%] sm:max-w-[60%] text-[13px] sm:text-[14.5px] ${
                      message.senderId === authUser._id
                        ? "bg-primary text-main"
                        : "bg-secondary text-secondary_foreground"
                    }`}
                  >
                    {message.image && (
                      <img
                        className="sm:max-w-[200px] max-w-[150px] rounded-md"
                        src={message.image}
                        alt="msg"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                    <small
                      className={`block text-[11px] ${
                        message.senderId === authUser._id
                          ? "text-muted"
                          : "text-muted_foreground"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
