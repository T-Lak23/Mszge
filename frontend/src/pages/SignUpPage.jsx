import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BaseAuthStyle from "../components/BaseAuthStyle";
import Button from "../components/button";
import ShowPassword from "../components/ShowPassword";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isSigningUp, signup } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  return (
    <BaseAuthStyle
      text={"Hi there!"}
      para={"Create your account."}
      linkText={"Already have an account?"}
      dest={"/login"}
      linkInnerText={"Login"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5  ">
        <div className="flex flex-col gap-0.5 justify-center">
          <label htmlFor="name" className="text-muted_foreground font-normal">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Lary"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            className="bg-input border border-border rounded-xl px-3 py-2 focus:outline-none text-main_foreground"
          />
        </div>
        <div className="flex flex-col gap-0.5 justify-center">
          <label htmlFor="email" className="text-muted_foreground font-normal">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="bg-input border border-border rounded-xl px-3 py-2 focus:outline-none text-main_foreground"
          />
        </div>
        <div className="flex relative flex-col gap-0.5 justify-center">
          <label htmlFor="password" className="text-muted_foreground">
            Password
          </label>
          <input
            id="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="atleast 6 characters"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="bg-input border border-border rounded-xl px-3 py-2 focus:outline-none text-main_foreground"
          />
          <ShowPassword
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        </div>
        <Button disable={isSigningUp}>Sign Up</Button>
      </form>
    </BaseAuthStyle>
  );
};

export default SignUpPage;
