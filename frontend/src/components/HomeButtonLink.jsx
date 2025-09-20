import { Link } from "react-router";
const HomeButtonLink = ({ children, styles, to }) => {
  return (
    <Link to={to && to} className={`rounded-lg font-semibold  ${styles}`}>
      {children}
    </Link>
  );
};

export default HomeButtonLink;
