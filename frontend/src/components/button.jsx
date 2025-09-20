const Button = ({ children, disable, style }) => {
  return (
    <button
      disabled={disable && disable}
      type="submit"
      className={`px-3 py-2 bg-primary text-primary_foreground font-semibold rounded-xl cursor-pointer disabled:bg-muted_foreground${
        style ? style : ""
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
