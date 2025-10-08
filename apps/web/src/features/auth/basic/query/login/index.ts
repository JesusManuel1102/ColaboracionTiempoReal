import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthenticationServices from "../../service";
import { useGlobalStore } from "../../../../../core/store/global_store";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useGlobalStore();

  const {
    mutateAsync: authenticate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["auth/login"],
    mutationFn: AuthenticationServices.login,
    retry: 1, // Número de intentos de en caso de error en las consultas
    onSuccess: (data) => {
      if (data.token) {
        setAuth(data.token);
        navigate("/");
      }
    },
    onError: (error) => {
      alert("Error al iniciar sesion. Verifica los datos ingresados." + error);
    },
  });

  return {
    authenticate,
    isPending,
    isError,
    error,
    // Aquí puedes devolver cualquier información que necesites para el manejo de errores o carga de datos
  };
};
