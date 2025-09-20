import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Loader from "./components/Loader";
import ChatContainer from "./components/ChatContainer";
import NoConversationPlaceholder from "./components/NoConversationPlaceholder";
import HomePage from "./pages/HomePage";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
    // console.log(authUser);
    // console.log(import.meta.env.VITE_SERVER);
  }, [checkAuth]);

  if (isCheckingAuth) return <Loader />;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/chat"
        element={authUser ? <ChatPage /> : <Navigate to="/login" />}
      >
        <Route index element={<NoConversationPlaceholder />} />
        <Route path=":id" element={<ChatContainer />} />
      </Route>

      {/* <Route
        path="/chatting"
        element={authUser ? <ChatContainer /> : <Navigate to={"/login"} />}
      /> */}
      <Route
        path="/signup"
        element={authUser ? <Navigate to={"/chat"} /> : <SignUpPage />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to={"/chat"} /> : <LoginPage />}
      />
    </Routes>
  );
};

export default App;
