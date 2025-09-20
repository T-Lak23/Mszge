import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import {
  LogOutIcon,
  VolumeOffIcon,
  Volume2Icon,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImage] = useState(null);
  const { isSoundEnabled, toggleSound, clearSelectedUser } = useChatStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleImageUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
    setLoading(false);
  };
  return (
    <div className="flex gap-3 items-center justify-between bg-card border border-border rounded-lg px-3 py-2">
      <div className="flex items-center gap-3">
        <div className="avatar online">
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-12  overflow-hidden rounded-full cursor-pointer"
          >
            {/* TODO TO SOME LOADING STATE TILL IMAGE IS UPLOADING OE LOADING */}
            {loading && <LoaderCircle className="animate-spin size-8" />}
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="profile-picture"
              className="w-full h-full object-cover overflow-hidden"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>

        <div>
          <h2 className="text-primary font-semibold">{authUser.fullName}</h2>
          <p className="text-muted_foreground text-xs">online</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <button
          onClick={() => {
            logout();
            clearSelectedUser();
            navigate("/login");
          }}
          className="bg-secondary rounded-full p-2"
        >
          <LogOutIcon size={16} className="text-main_foreground" />
        </button>
        <button
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error) => console.log(error));
            toggleSound();
          }}
          className="bg-secondary rounded-full p-2"
        >
          {isSoundEnabled ? (
            <Volume2Icon size={16} className="text-main_foreground" />
          ) : (
            <VolumeOffIcon size={16} className="text-main_foreground" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
