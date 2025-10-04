import { useSesionStorage } from "../../../../hooks/storage-web/useSessionStorage";
import { useLogin } from "../query/login";
import { useRegister } from "../query/register";

// Hook padre para los metodos de authenticación
export const useAuth = () => {
  const { removeStorageData } = useSesionStorage();

  const login = useLogin();
  const register = useRegister();
  const logout = () => removeStorageData("access_token");

  return {
    login,
    register,
    logout,
  };
};
