import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuards } from "../security/guards/AuthGuard";
import { HomePage, LoginPage, ProfilePage, RegisterPage, RoomPage } from "../../screens";
import { RootLayout } from "../../components/layouts/rootLayouts";

export const ApplicationRouter = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/login`} element={<LoginPage />} />
        <Route path={`/register`} element={<RegisterPage />} />
        <Route element={<AuthGuards validation={true} />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="room/:uuid" element={<RoomPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};