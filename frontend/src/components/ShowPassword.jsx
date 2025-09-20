import { Eye, EyeOff } from "lucide-react";

const ShowPassword = ({ setShowPassword, showPassword }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-[34px] right-4  z-10"
    >
      {showPassword ? (
        <Eye className="w-6 h-6" />
      ) : (
        <EyeOff className="w-6 h-6" />
      )}
    </button>
  );
};

export default ShowPassword;
