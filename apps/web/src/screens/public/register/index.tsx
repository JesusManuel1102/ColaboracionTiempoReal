import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useForm } from "../../../hooks/formulary/useForm";
import { Label } from "../../../components/shared/Label";
import { Button } from "../../../components/shared/Botton";
import { useAuth } from "../../../features/auth/basic/hooks/useAuth";

const Register = () => {
  const {
    FormData,
    handleSubmit,
    handleChange,
    FormDataError,
    toogleVisiblePassword,
    IsVisiblePassword,
  } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();
  // const { loginWithGoogle } = useGoogle();

  return (
    <div className="layoutAuthPage">
      <div className="p-4 w-96">
        <h2 className="text-3xl text-center mb-2 font-bold">
          Craer una cuenta
        </h2>
        <p className="text-sm text-center mb-4 text-text-secondary">
          Ingresa tus datos para registrarte
        </p>
        <form
          method="POST"
          onSubmit={handleSubmit(() => register.createAccount(FormData))}
          // onSubmit={handleSubmit(() => console.log(FormData))}
          className="flex flex-col gap-2">
          <Label
            id="username"
            name="username"
            label="Nombre de Usuario: "
            typeInput="text"
            value={FormData.username}
            onChange={handleChange}
            error={FormDataError.username}
            icon={<UserRound />}
          />
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
          <br />
          <Button type="submit" >
            Craer Cuenta
          </Button>
        </form>
        <p className="text-sm text-center mb-3 text-text-secondary">
          o continua con
        </p>
        {/* <Button width="full" onClick={loginWithGoogle.login}> */}
          {/* Continuar con Google */}
        {/* </Button> */}
        <p className="text-sm text-center text-text-secondary">
          Ya tienes una cuenta?{" "}
          <Link to={`/login`} className="hover:underline font-bold">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
