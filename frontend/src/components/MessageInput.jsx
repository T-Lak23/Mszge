import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useRef } from "react";
import toast from "react-hot-toast";
import { ImageIcon, Send, XIcon } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text && !imagePreview) return;
    sendMessage({
      text,
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div className="sticky max-w-full bottom-0 bg-main border-t border-border py-3 px-2 sm:py-4 sm:px-7 z-40">
      {" "}
      {imagePreview && (
        <div>
          <div className="relative  w-20">
            <img
              src={imagePreview}
              alt={"imagePreview"}
              className="h-20 w-20 inline-block mb-3 rounded-lg object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-1 right-0.5 w-6 h-6 rounded-full flex items-center justify-center bg-secondary p-1 text-primary "
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          placeholder="Write a message...."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="border border-border flex-1 bg-input text-main_foreground rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base"
        />
        <input
          type="file"
          accept="image/"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className={`bg-secondary text-main_foreground p-3 rounded-full ${
            imagePreview ? "text-cyan-500" : ""
          }`}
          type="button"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button type="submit" className="bg-primary rounded-full p-2 text-main">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
