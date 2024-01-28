import { RxDashboard } from "react-icons/rx";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineControl } from "react-icons/ai";
import { FaHistory, FaListUl } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
interface IRoute {
  path: string;
  icon: JSX.Element;
  label: string;
}

const routes: IRoute[] = [
  { path: "/dashboard/home", icon: <RxDashboard />, label: "Dashboard" },
  {
    path: "/dashboard/add-gadgets",
    icon: <AiOutlineFileAdd />,
    label: "Add Gadgets",
  },
  { path: "/dashboard/gadgets", icon: <FaListUl />, label: "Manage Gadgets" },
  {
    path: "/dashboard/sales-management",
    icon: <AiOutlineControl />,
    label: "Sales Management",
  },
  {
    path: "/dashboard/sales-history",
    icon: <FaHistory />,
    label: "Sales History",
  },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <main className="w-full h-full flex ">
      <aside
        className={`${
          open ? "left-0" : "-left-[200px]"
        } w-[200px] z-50 fixed shadow-md md:shadow-none md:top-0 duration-150 md:left-0 md:bottom-0 h-screen bg-white`}
      >
        <h2 className="text-2xl font-bold ml-4 mt-2">Uni Gadgets</h2>

        <ul className="mt-5 px-1">
          {routes.map((route, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary px-4 py-2 rounded flex items-center gap-2 text-white"
                      : "px-4 py-2 rounded flex items-center gap-2"
                  }
                >
                  {route.icon} <span>{route.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="md:absolute w-full md:w-[calc(100%-200px)] md:p-5 min-h-screen bg-[#ececec] md:left-[200px]">
        <Button
          className={` ${
            open ? "translate-x-[200px]" : "translate-x-3"
          } duration-150 z-[9999] fixed ease-linear transition-transform text-lg top-2 md:hidden`}
        >
          <GiHamburgerMenu onClick={() => setOpen(!open)} />
        </Button>
        <section className="bg-white p-5 rounded-lg mt-5 md:mt-0">
          <Outlet />
        </section>
      </main>
    </main>
  );
};

export default DashboardLayout;
