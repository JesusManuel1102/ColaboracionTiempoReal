import {
  BarChart3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  TrendingUp,
  Vote,
} from "lucide-react";
import { Link } from "react-router-dom";
import imagen from "../../../assets/team-collaboration-and-analytics-dashboard.jpg";
import { Button } from "../../../components/shared/Botton";
import { Label } from "../../../components/shared/Label";
import { useAuth } from "../../../features/auth/basic/hooks/useAuth";
import { useForm } from "../../../hooks/formulary/useForm";

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
                Create Account
              </div>
              <div className="text-muted-foreground">
                Fill out the form to start using VoteSync
              </div>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(() => register.createAccount(FormData))}
                className="flex flex-col gap-2 mt-5">
                <Label
                  icon={<Mail />}
                  id="username"
                  name="username"
                  label="Username:"
                  typeInput="text"
                  placeholder="John Doe"
                  value={FormData.username}
                  onChange={handleChange}
                  error={FormDataError.username}
                  className="outline-0"
                />
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
                  loading={register.isPending}
                  disabled={register.isPending}
                  className="bg-gray-900 text-white p-2 rounded-md mt-3 mb-4 cursor-pointer hover:bg-primary/90 transition-colors">
                  Create account
                </Button>
              </form>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-primary hover:underline font-medium">
                  Login here
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
            Join thousands of teams
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
              <BarChart3 className="size-10 text-purple-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 size-20 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
              <MessageSquare className="size-10 text-primary" />
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 w-full max-w-md grid-cols-4 grid-rows-2 place-items-center">
            <div className="col-span-2">
              <div className="flex items-center gap-3 text-lef">
                <div className="size-10 rounded-lg bg-purple-500/20 backdrop-blur-sm border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="size-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Detailed analysis
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
                  <MessageSquare className="size-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Real-time chat
                  </p>
                  <p className="text-sm text-gray-400">
                    Discuss while you vote
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center gap-3 text-left">
                <div className="size-10 rounded-lg bg-purple-500/20 backdrop-blur-sm border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="size-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Easy to use</p>
                  <p className="text-sm text-gray-400">
                    Intuitive and modern interface
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

export default Register;
