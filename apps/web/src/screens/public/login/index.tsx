import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "../../../hooks/formulary/useForm";
import { Label } from "../../../components/shared/Label";
import { Button } from "../../../components/shared/Botton";
import { useAuth } from "../../../features/auth/basic/hooks/useAuth";

const Login = () => {
  const {
    FormData,
    IsVisiblePassword,
    handleSubmit,
    toogleVisiblePassword,
    handleChange,
    FormDataError,
  } = useForm({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  // const { loginWithGoogle } = useGoogle();

  return (
    <div className="layoutAuthPage">
      <div className="p-4 w-96">
        <h2 className="text-3xl text-center mb-2 font-bold">
          Bienvenido de nuevo
        </h2>
        <p className="text-sm text-center mb-2 text-text-secondary">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
        <div className="my-6">
          <form
            method="POST"
            onSubmit={handleSubmit(() => login.authenticate(FormData))}
            // onSubmit={handleSubmit(() => console.log(FormData))}
            className="flex flex-col gap-2"
          >
            <Label
              id="email"
              name="email"
              label="Correo electronico:"
              typeInput="email"
              value={FormData.email}
              onChange={handleChange}
              error={FormDataError.email}
              icon={<Mail />}
            />
            <Label
              id="password"
              name="password"
              label="Contraseña:"
              typeInput={IsVisiblePassword === true ? "text" : "password"}
              value={FormData.password}
              onChange={handleChange}
              error={FormDataError.password}
              icon={<Lock />}
              rightIcon={IsVisiblePassword ? <Eye /> : <EyeOff />}
              rightIconOnClick={toogleVisiblePassword}
            />
            {/* <Link
              to={PublicRoutes.FORGOT_PASSWORD}
              className="text-sm m-2 text-end hover:underline text-text-secondary"
            >
              ¿Olvidaste tu contraseña?
            </Link> */}

            <Button type="submit">
              Iniciar sesión
            </Button>
          </form>
          <p className="text-xs text-center mb-3 text-text-secondary">
            o continua con
          </p>
          {/* <Button width="full" onClick={loginWithGoogle.login}>
            Continuar con Google
          </Button> */}
          <p className="text-sm text-center text-text-secondary">
            No tienes una cuenta?{" "}
            <Link
              to={`/register`}
              className="hover:underline font-bold"
            >
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
