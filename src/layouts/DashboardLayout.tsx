import { RxDashboard } from "react-icons/rx";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineControl } from "react-icons/ai";
import { FaHistory, FaListUl } from "react-icons/fa";

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
    label: "Sales History",
  },
  {
    path: "/dashboard/sales-history",
    icon: <FaHistory />,
    label: "Sales History",
  },
];

const DashboardLayout = () => {
  return (
    <main className="w-full h-full flex ">
      <aside className="md:w-[200px] md:fixed md:top-0 md:left-0 md:bottom-0 md:h-screen">
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
      <main className="md:absolute w-full md:w-[calc(100%-200px)] h-full bg-[#ececec] md:left-[200px]">
        <Outlet />
      </main>
    </main>
  );
};

export default DashboardLayout;
