import { Outlet } from "react-router-dom";
import Header from "../sections/Header";
import useSocket from "../../infraestructure/sockets/hook/useSocket";
import { useGlobalStore } from "@/core/store/global_store";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useEffect } from "react";

export const RootLayout = () => {
  useSocket();
  const { data } = useProfile();
  const { setUser } = useGlobalStore();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Header />
        <section className="flex-1">
          <Outlet />
        </section>
      </main>
    </>
  );
};
