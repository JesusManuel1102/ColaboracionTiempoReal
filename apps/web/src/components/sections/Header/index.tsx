import { useAuth } from "../../../features/auth/basic/hooks/useAuth";
import { LogOut, Vote } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalStore } from "../../../core/store/global_store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user: data, isOnline } = useGlobalStore();
  const { handleLogout } = useAuth();

  return (
    <header className="border-b border-border">
      <div className="mx-auto px-16 py-4 flex items-center justify-between">
        <Link to={"/"} className="flex items-center justify-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-gray-800 flex items-center justify-center shadow-lg shadow-primary/20">
            <Vote className="size-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">VoteSync</span>
        </Link>
        <HoverCard>
          <HoverCardTrigger>
            <Button variant={"ghost"} className="py-6">
              <div className="size-8 rounded-full bg-gray-600 flex items-center justify-center relative">
                <span className="text-sm font-semibold text-white">
                  {data?.username?.[0] || "U"}
                </span>
                <span
                  className={`h-3 w-3 ${isOnline ? "bg-green-500" : "bg-red-500"} rounded-full absolute -bottom-0.5 -right-0.5`}></span>
              </div>
              <span className="text-xl font-medium text-foreground">
                {data?.username || "User"}
              </span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="relative top-1 right-0 h-min w-min">
            <div className="flex flex-col items-center gap-2 w-full">
              <ul className="flex flex-col gap-1 w-full">
                <li className="hover:bg-primary/10 hover:text-primary-foreground rounded-md">
                  <Link
                    to={"/"}
                    className="text-foreground w-full h-ful inline-block px-4 py-2 text-md text-center font-semibold">
                    Inicio
                  </Link>
                </li>
                <li className="hover:bg-primary/10 hover:text-primary-foreground rounded-md">
                  <Link
                    to={"/profile"}
                    className="text-foreground w-full h-ful inline-block px-4 py-2 text-md text-center font-semibold">
                    Perfil
                  </Link>
                </li>
              </ul>
              <Button
                onClick={handleLogout}
                variant={"destructive"}
                className="cursor-pointer hover:bg-destructive/80">
                <span>Cerrar sesion</span>
                <LogOut className="size-5" />
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </header>
  );
};

export default Header;
