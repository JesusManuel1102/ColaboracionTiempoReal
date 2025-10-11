import { useProfile } from '../../../features/user/hooks/useProfile';
import { useAuth } from '../../../features/auth/basic/hooks/useAuth';
import {
  LogOut,
  Vote,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '../../shared/Botton';
import { useGlobalStore } from '../../../core/store/global_store';
import { useEffect } from 'react';

const Header = () => {
  const { data, isLoading, isError, error } = useProfile();
  const { setUser } = useGlobalStore();
  const { handleLogout } = useAuth();

  console.log("Profile:", data);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <header className="border-b border-border border-gray-500">
    <div className="mx-auto px-16 py-2 flex items-center justify-between">
      <Link to={"/"} className="flex items-center justify-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-gray-800 flex items-center justify-center shadow-lg shadow-primary/20">
          <Vote className="size-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground">VoteSync</span>
      </Link>
      <div className="flex items-center gap-4">
        <div className="sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:shadow hover:shadow-gray-400 cursor-pointer">
          <div className="size-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {data?.username?.[0] || "U"}
            </span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {data?.username || "User"}
          </span>
        </div>
        <Button
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground px-3 py-2 hover:shadow hover:shadow-gray-400 cursor-pointer">
          <LogOut className="size-5" />
        </Button>
      </div>
    </div>
  </header>
  )
}

export default Header