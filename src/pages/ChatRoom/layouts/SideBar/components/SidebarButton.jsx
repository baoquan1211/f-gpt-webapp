import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
const SidebarButton = ({
  children,
  className = "",
  onClick,
  to = undefined,
}) => {
  return (
    <Link
      className={twMerge(
        `flex p-[12px] max-h-11 items-center justify-center text-white bg-transparent border-[0.5px] border-gray-600 rounded-[6px] font-sans text-sm hover:bg-[#2B2C2F]
         ct-transition cursor-pointer ${className}`
      )}
      onClick={onClick}
      to={to}
    >
      {children}
    </Link>
  );
};

export default SidebarButton;
