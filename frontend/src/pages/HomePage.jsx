import {
  LayoutDashboard,
  User,
  Users,
  MessageCircle,
  KeyRound,
  MessagesSquare,
} from "lucide-react";
import HomeButtonLink from "../components/HomeButtonLink";
import HomeCard from "../components/HomeCard";
import HomePageChatExample from "../components/HomePageChatExample";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="flex sm:flex-row flex-col items-center gap-12 sm:gap-8 mt-10 px-3 sm:px-7 pb-10 border-b border-border">
        <div className="text-muted_foreground flex-1 flex flex-col justify-center sm:items-start items-center flex-wrap">
          <p className="text-main_foreground text-2xl md:text-4xl font-bold sm:text-start text-center">
            Chat instantly. Connect deeply.
          </p>
          <p className="text-main_foreground text-2xl md:text-4xl font-bold sm:text-start text-center">
            Welcome to Mszge.
          </p>
          <p className="my-4 md:text-base text-[15px] sm:text-start text-center">
            Mszge is fast, elegant chat platform with real-time messaging, media
            sharing, and a beautiful interface. Experience fast and modern UI
            made to not only look good but also feels good.
          </p>
          <HomeButtonLink
            to={"/signup"}
            styles="md:text-[15px] text-[14px] px-4 py-3 bg-primary text-main w-[170px] text-center mb-4"
          >
            Get Started Free
          </HomeButtonLink>
          <div className="flex items-center gap-3">
            <HomeButtonLink styles="text-[12px] px-3 py-2 bg-border text-secondary_foreground cursor-not-allowed">
              No number required
            </HomeButtonLink>
            <HomeButtonLink styles="text-[12px] px-3 py-2 bg-border text-secondary_foreground cursor-not-allowed">
              Image sharing
            </HomeButtonLink>
          </div>
        </div>

        <div className="w-full flex-1">
          <HomePageChatExample />
        </div>
      </section>

      {/* Features Section */}
      <section className="sm:px-7 px-3 py-8 border-b border-border">
        <p className="sm:text-3xl text-xl text-main_foreground font-bold mb-5 sm:text-start text-center">
          Everything you need for modern messaging
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {/* Existing cards */}
          <HomeCard
            logo={<LayoutDashboard className="w-5 h-5" />}
            text="Realtime delivery"
            description="Messages delivered instantly."
            btnText="Super fast"
          />
          <HomeCard
            logo={<User className="w-5 h-5" />}
            text="Profile Management"
            description="Upload image with a single click."
            btnText="Drag and Drop"
          />
          <HomeCard
            logo={<Users className="w-5 h-5" />}
            text="Contacts and Discovery"
            description="Find all the users at one place and chat with anyone."
            btnText="Search"
          />

          {/* New cards */}
          <HomeCard
            logo={<KeyRound className="w-5 h-5" />}
            text="Sign up without number"
            description="No phone number needed. Just sign up and start chatting."
            btnText="Instant Access"
          />
          <HomeCard
            logo={<MessagesSquare className="w-5 h-5" />}
            text="Access all chats"
            description="Manage all your conversations in one unified place."
            btnText="One Inbox"
          />
          <HomeCard
            logo={<MessageCircle className="w-5 h-5" />}
            text="Chat with everyone"
            description="Connect freely with all users on the platform."
            btnText="Start Chatting"
          />
        </div>
      </section>

      <section className="py-[50px] h-[300px] flex flex-col items-center justify-center">
        <p className="text-main_foreground font-bold text-xl sm:text-2xl">
          Ready to try Mszge?
        </p>
        <p className="font-[500] sm:text-base text-[14px] text-muted_foreground text-center">
          Create your account in seconds and start messaging instantly.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <HomeButtonLink
            to={"/signup"}
            styles={
              "sm:py-3sm: px-4 sm:text-base py-2 px-3 text-[14px]  bg-primary text-main"
            }
          >
            Create Account
          </HomeButtonLink>
          <HomeButtonLink
            to={"/login"}
            styles={
              "sm:py-3sm: px-4 sm:text-base py-2 px-3 text-[14px] bg-border text-main_foreground"
            }
          >
            Login
          </HomeButtonLink>
        </div>
      </section>

      <footer className="bg-secondary p-4 text-muted_foreground font-medium text-center sm:text-base text-[14px]">
        &copy; 2025 Mszge. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
