import { useMutation } from "@tanstack/react-query";
import AuthenticationServices from "../../service";
import { useNavigate } from "react-router-dom";
import { useSesionStorage } from "../../../../../hooks/storage-web/useSessionStorage";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setStorageData } = useSesionStorage();

  const {
    mutateAsync: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["auth/register"],
    mutationFn: AuthenticationServices.register,
    onSuccess: (data) => {
      if (data.token) {
        setStorageData("access_token", data.token);
        navigate("/");
      }
    },
    onError: (error) => {
      alert("Error al registrar. Verifica los datos ingresados." + error);
    },
  });

  return {
    createAccount,
    isPending,
    isError,
    error,
  };
};
