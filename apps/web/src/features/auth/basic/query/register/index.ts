import { useMutation } from "@tanstack/react-query";
import AuthenticationServices from "../../service";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../../../core/store/global_store";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setAuth } = useGlobalStore();

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
        setAuth(data.token);
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
    // Here you can return any information you need for error handling or data loading
  };
};
