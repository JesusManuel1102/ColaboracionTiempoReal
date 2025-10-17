import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Users,
  Vote,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import imagen from "../../../assets/collaborative-voting-and-decision-making-illustrat.jpg";
import { Button } from "../../../components/shared/Botton";
import { Label } from "../../../components/shared/Label";
import { useAuth } from "../../../features/auth/basic/hooks/useAuth";
import { useForm } from "../../../hooks/formulary/useForm";

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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 ">
        <div className="w-full max-w-md flex flex-col gap-5">
          {/* Logo */}
          <Link to={"/"} className="flex items-center justify-center gap-3">
            <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Vote className="size-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">VoteSync</span>
          </Link>

          <div className="bg-card border-border shadow-xl p-4 rounded-lg">
            <div className="space-y-1 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                Login
              </div>
              <div className="text-muted-foreground">
                Enter your credentials to access your account
              </div>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(() => login.authenticate(FormData))}
                className="flex flex-col gap-2 mt-5">
                <Label
                  icon={<Mail />}
                  id="email"
                  name="email"
                  label="Email:"
                  typeInput="email"
                  placeholder="your@email.com"
                  value={FormData.email}
                  onChange={handleChange}
                  error={FormDataError.email}
                  className="outline-0"
                />
                <Label
                  id="password"
                  name="password"
                  label="Password:"
                  typeInput={IsVisiblePassword === true ? "text" : "password"}
                  value={FormData.password}
                  onChange={handleChange}
                  error={FormDataError.password}
                  icon={<Lock />}
                  rightIcon={IsVisiblePassword ? <Eye /> : <EyeOff />}
                  rightIconOnClick={toogleVisiblePassword}
                  className="outline-0 w-full"
                />
                <Button
                  type="submit"
                  disabled={login.isPending}
                  className="bg-gray-900 text-white p-2 rounded-md mt-3 mb-4 cursor-pointer hover:bg-primary/90 transition-colors">
                  Login
                </Button>
              </form>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Illustration and Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-purple-500/10 to-background relative overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h2 className="text-xl font-bold text-foreground mb-2 text-balance">
            Make decisions in real time
          </h2>
          <p className="text-base text-gray-400 mb-5 max-w-md text-pretty">
            Collaborate with your team, vote in real time and visualize results
            instantly
          </p>

          {/* Illustration placeholder */}
          <div className="mb-8 relative">
            <div className="size-64 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              <img
                src={imagen}
                alt="Collaborative voting"
                className="size-48 opacity-90 object-cover rounded-lg"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 size-20 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
              <Users className="size-10 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 size-20 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
              <Zap className="size-10 text-purple-400" />
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 w-full max-w-md grid-cols-4 grid-rows-2 place-items-center">
            <div className="col-span-2">
              <div className="flex items-center gap-3 text-lef">
                <div className="size-10 rounded-lg bg-purple-500/20 backdrop-blur-sm border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Zap className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Instant voting
                  </p>
                  <p className="text-sm text-gray-400">
                    Real-time results
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-3 text-left ">
                <div className="size-10 rounded-lg bg-purple-500/20 backdrop-blur-sm border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Fluid collaboration
                  </p>
                  <p className="text-sm text-gray-400">
                    Integrated chat and active participants
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center gap-3 text-left">
                <div className="size-10 rounded-lg bg-purple-500/20 backdrop-blur-sm border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Secure and reliable
                  </p>
                  <p className="text-sm text-gray-400">
                    JWT authentication and encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
