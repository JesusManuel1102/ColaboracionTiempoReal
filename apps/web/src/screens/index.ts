import { lazy } from "react";

export const LoginPage = lazy(() => import("./public/login"));
export const RegisterPage = lazy(() => import("./public/register"));
export const HomePage = lazy(() => import("./private/home"));