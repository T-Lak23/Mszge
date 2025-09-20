import { X } from "lucide-react";
import { Link } from "react-router";

const BaseAuthStyle = ({
  children,
  text,
  para,
  linkText,
  dest,
  linkInnerText,
}) => {
  return (
    <>
      <div className="h-screen w-full flex  items-center justify-center ">
        <div className=" bg-card border border-border rounded-xl p-6 min-w-[250px] max-w-[350px] sm:min-w-[500px] lg:min-w-[500px] relative ">
          <Link
            to={"/"}
            className="text-main_foreground bg-secondary p-1 rounded-full absolute top-2 right-2"
          >
            <X className="w-5 h-5" />
          </Link>
          <div className="flex items-center justify-center gap-2 mt-2">
            <img
              src="/logo2.svg"
              className="w-10 h-10 bg-secondary rounded-full p-2 fill-primary"
              alt=""
            />
            <p className="font-bold text-lg  text-main_foreground">Mszge</p>
          </div>
          <div className="flex flex-col items-center mt-2 gap-4">
            <p className="text-muted_foreground">{text}</p>
            <p className="text-xl text-main_foreground font-semibold">{para}</p>
          </div>

          {children}

          <p className="text-center text-muted_foreground text-sm mt-4">
            {linkText}
            <Link
              to={dest}
              className="text-primary font-semibold cursor-pointer hover:underline hover:underline-offset-2"
            >
              {linkInnerText}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default BaseAuthStyle;
