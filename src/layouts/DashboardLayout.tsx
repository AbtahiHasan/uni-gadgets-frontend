import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main className="w-full h-full flex ">
      <aside className="md:w-[200px] md:fixed md:top-0 md:left-0 md:bottom-0 md:h-screen">
        sidebar
        <h1>asdfasd</h1>
      </aside>
      <main className="md:absolute w-full md:w-[calc(100%-200px)] h-full bg-[#ececec] md:left-[200px]">
        <Outlet />
      </main>
    </main>
  );
};

export default DashboardLayout;
