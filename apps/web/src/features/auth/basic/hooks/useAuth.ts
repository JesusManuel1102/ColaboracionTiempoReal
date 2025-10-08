import { useNavigate } from "react-router-dom";
import { useLogin } from "../query/login";
import { useRegister } from "../query/register";
import { useGlobalStore } from "../../../../core/store/global_store";
import { QueryClientConfig } from "../../../../core/config/tanstackQuery/queryClientConfig";

// Hook padre para los metodos de authenticación
export const useAuth = () => {
  const { token, user, isAuthenticated, logout } = useGlobalStore();
  const navigate = useNavigate();

  const login = useLogin();
  const register = useRegister();

  const handleLogout = () => {
    logout();
    QueryClientConfig.clear(); // 👈 Limpia todas las queries y mutations cacheadas
    navigate("/login");
  };

  return {
    login,
    register,
    handleLogout,
    token,
    user,
    isAuthenticated,
  };
};
