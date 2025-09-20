import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  //TODO TO SET ESCAPE KEY MIGHT CHNAGE LATER
  const navigate = useNavigate();

  useEffect(() => {
    const hadleEsc = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", hadleEsc);
    return () => window.removeEventListener("keydown", hadleEsc);
  }, [setSelectedUser]);
  const handleCross = (e) => {
    setSelectedUser(null);
    navigate("/chat");
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-8 sticky top-0 z-50 bg-main py-3 sm:py-4 border-b border-border">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-10 sm:w-12 rounded-full">
            {" "}
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div className="truncate">
          {" "}
          <h2 className="text-main_foreground font-semibold text-sm sm:text-base truncate">
            {selectedUser.fullName}
          </h2>
          <h3 className="text-muted_foreground text-xs sm:text-sm font-semibold">
            {isOnline ? "Online" : "Offline"}
          </h3>
        </div>
      </div>

      <div
        onClick={handleCross}
        className="bg-secondary p-2 rounded-full cursor-pointer flex-shrink-0"
      >
        <X className="text-main_foreground w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
  );
};

export default ChatHeader;
