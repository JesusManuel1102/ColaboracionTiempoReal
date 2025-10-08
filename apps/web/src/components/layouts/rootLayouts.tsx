import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <main className="flex">
        <section className="w-full overflow-y-hidden">
          <div>
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};
