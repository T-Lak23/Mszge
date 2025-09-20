import { useChatStore } from "../store/useChatStore";
const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs my-5 flex items-center gap-3 justify-center">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab rounded-xl  ${
          activeTab === "chats"
            ? "bg-sidebar_primary font-semibold  text-sidebar_primary_foreground"
            : " bg-card  text-sidebar_primary_foreground font-semibold border border-border"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab rounded-xl  ${
          activeTab === "contacts"
            ? "bg-sidebar_primary font-semibold  text-sidebar_primary_foreground"
            : "text-sidebar_primary_foreground font-semibold bg-card border border-border"
        }`}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
