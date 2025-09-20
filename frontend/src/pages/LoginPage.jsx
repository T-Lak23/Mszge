import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import ShowPassword from "../components/ShowPassword";
import Button from "../components/button";
import BaseAuthStyle from "../components/BaseAuthStyle";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <BaseAuthStyle
      text={"Welcome back!"}
      para={"Log into your account."}
      linkText={"Don't have an account?"}
      dest={"/signup"}
      linkInnerText={"Create One"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5 md ">
        <div className="flex flex-col gap-0.5 justify-center">
          <label htmlFor="email" className="text-muted_foreground font-normal">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            className="bg-input border border-border rounded-xl px-3 py-2 focus:outline-none   text-main_foreground"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="flex relative flex-col gap-0.5 justify-center">
          <label htmlFor="password" className="text-muted_foreground">
            Password
          </label>
          <input
            id="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="***********"
            value={formData.password}
            className="bg-input border border-border rounded-xl px-3 py-2 focus:outline-none text-main_foreground"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <ShowPassword
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
        {/* <button disabled={isLoggingIn}>Login</button> */}
        <Button text={"Login"} disable={isLoggingIn}>
          Log In
        </Button>
      </form>
    </BaseAuthStyle>
  );
};

export default LoginPage;
