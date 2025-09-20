import HomeButtonLink from "./HomeButtonLink";

const HomeCard = ({ logo, text, description, styles, btnText }) => {
  return (
    <div
      className={`border border-border rounded-lg p-4 flex flex-col gap-4 text-main_foreground
        w-full sm:w-[300px] h-auto min-h-[170px] flex-grow ${styles || ""}`}
    >
      <div className="flex items-center gap-2">
        {logo}
        <p className="font-semibold">{text}</p>
      </div>

      <p className="text-muted_foreground flex-1 text-sm">{description}</p>

      <HomeButtonLink styles="px-3 py-2 w-full sm:w-[130px] text-center text-[13px] bg-border text-secondary_foreground ">
        {btnText}
      </HomeButtonLink>
    </div>
  );
};

export default HomeCard;
