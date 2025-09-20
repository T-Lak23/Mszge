import { Send } from "lucide-react";

const HomePageChatExample = () => {
  return (
    <div className="w-full border border-border rounded-lg p-4">
      <div className="border border-border p-2 rounded-lg">
        <div className="flex items-center justify-between px-2 sm:px-4">
          <div className="flex items-center gap-1 text-main_foreground ">
            {" "}
            <img
              src="/logo2.svg"
              className="w-7 h-7 p-1 rounded-full bg-border"
              alt="user-icon"
            />
            <p className="font-semibold">Mszge</p>
          </div>
          <p className="text-main_foreground text-[14px]">Online</p>
        </div>
        <div className="chat sm:px-4 px-2 flex flex-col mt-3 gap-4">
          <div className="chat-end">
            <p className="chat-bubble bg-primary text-primary_foreground font-[500] md:text-base text-[13px] ">
              Hey! Ready to try Mszge?
            </p>
          </div>
          <div className="chat-start">
            <p className="chat-bubble bg-border text-secondary_foreground font-[500] md:text-base text-[13px]">
              Absolutely.
            </p>
          </div>
          <div className="chat-end">
            <p className="chat-bubble bg-primary text-primary_foreground font-[500] md:text-base text-[13px]">
              It is also fast and super responsive.
            </p>
          </div>
          <div className="chat-start">
            <p className="chat-bubble bg-border text-secondary_foreground font-[500] md:text-base text-[13px]">
              Can't wait to try it.
            </p>
          </div>
          <div className="flex md:flex-row flex-col md:items-center  gap-4 mt-3">
            <input
              type="text"
              readOnly
              className="focus:outline-none flex-1 bg-secondary rounded-lg border md:text-base text-[13px] border-border px-4 py-3 text-main_foreground font-[500]
              "
              value={"Signup today......"}
            />
            <Send className="p-2 md:w-10 h-10 rounded-full bg-primary sm:flex-0 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageChatExample;
