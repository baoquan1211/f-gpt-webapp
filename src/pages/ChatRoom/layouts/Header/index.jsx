import { useSelector, useDispatch } from "react-redux";
import { ModeToggle } from "../../../../components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { User2, LogOut } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { logoutAction } from "../../../../redux/actions/authAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user.auth) {
  //     navigate("/login/");
  //   }
  // });

  const logoutHandel = () => {
    dispatch(logoutAction());
  };
  return (
    <div className="fixed w-full bg-[#A7CDFB] dark:bg-[#799dc8] h-[60px] top-0 left-0 flex justify-between px-2 lg:px-[32px]">
      <div className="py-[10px] flex items-center gap-[12px] active:bg-[#799dc8]">
        <img src="/logo.png" alt="fujinet" className="h-full" />

        <h1 className="text-[22px] font-semibold select-none hidden lg:block">
          FUJICHAT
        </h1>
      </div>

      <div className="flex items-center gap-x-2">
        <ModeToggle className="bg-transparent" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="round" size="icon">
              <User2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-x-2 cursor-pointer"
              onClick={logoutHandel}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
