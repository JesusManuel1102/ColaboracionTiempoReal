import { Outlet } from "react-router-dom";
import Header from "../sections/Header";
import useSocket from "../../infraestructure/sockets/hook/useSocket";

export const RootLayout = () => {
  useSocket();

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
