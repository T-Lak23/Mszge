import { useAuthStore } from "../store/useAuthStore";
import HomeButtonLink from "./HomeButtonLink";

const Navbar = () => {
  const { authUser } = useAuthStore();
  return (
    <nav className="flex items-center justify-between px-3 sm:px-7 py-5 border-b border-border">
      <div className="flex items-center gap-1">
        <img
          src="/logo.svg"
          alt="website-logo"
          className="w-9 h-9 bg-primary rounded-full p-2"
        />
        <p className="font-semibold text-primary text-lg">Mszge</p>
      </div>
      <div className="flex items-center gap-4">
        {authUser ? (
          <>
            <HomeButtonLink
              styles={"px-4 py-3 bg-primary text-[15px]"}
              to={"/chat"}
            >
              Chat
            </HomeButtonLink>
          </>
        ) : (
          <>
            <HomeButtonLink
              styles={"px-4 py-3 bg-primary text-[15px]"}
              to={"/login"}
            >
              Login
            </HomeButtonLink>
            <HomeButtonLink
              styles={
                "px-4 py-3 bg-border text-secondary_foreground text-[15px] sm:block hidden"
              }
              to={"/login"}
            >
              Signup
            </HomeButtonLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
