import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  FaDatabase,
  FaPen,
  FaTv,
  FaUsers,
} from "react-icons/fa";
import "../sidebar.css";
import crmLogo from "../data/crmLogo2.png";
import Sider from "antd/es/layout/Sider";
import { Layout, Menu } from "antd";


function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick
  };
}
const SideBar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const UserData = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const SideNav = [
    {
      Tile: "Dashboard",
      IsDropDown: 2,
      id: "Dashboard",
      Links: "",
      To: "/",
      icon: <FaTv className="text-sm" />,
    },
    {
      Tile: "My Task",
      IsDropDown: 2,
      id: "MyTask",
      Links: "",
      To: "/MyTask",
      icon: <FaDatabase className="text-sm" />,
    },
    {
      Tile: "My Leads",
      IsDropDown: 2,
      id: "MyLeads",
      Links: "",
      To: "/MyLeads",
      icon: <FaPen className="text-sm" />,
    },
    // {
    //   Tile: "My Task",
    //   id: "DataBank",
    //   IsDropDown: 1,
    //   icon: <FaDatabase className="text-sm" />,
    //   Links: [
    //     {
    //       Title: "Data Allocation",
    //       To: "/Allocation",
    //       id: "Allocation",
    //     },
    //     {
    //       Title: "ReAllocation",
    //       To: "/ReAllocation",
    //       id: "ReAllocation",
    //     },
    //     {
    //       Title: "Movements",
    //       To: "/Movements",
    //       id: "Movements",
    //     },
    //   ],
    // },
    {
      Tile: "Employee Corner",
      IsDropDown: 1,
      icon: <FaUsers className="text-sm" />,
      id: "EmployeeCorner",
      Links: [
        {
          Title: "My Profile ",
          To: "/MyProfile",
          id: "MyProfile",
        },
        {
          Title: "Payrolls",
          To: "/PayRoll",
          id: "PayRoll",
        },
      ],
    },
  ];
  const myCustomFunction = (e) => {
    navigate(e)
  }

  // New 
  const items = [
    getItem('Dashboard', '1', <FaTv />, null, () => myCustomFunction("/")),
    getItem('My Task', '2', <FaDatabase />, null, () => myCustomFunction("/MyTask")),
    getItem('My Leads', '3', <FaPen />, null, () => myCustomFunction("/MyLeads")),
    getItem('Employee Corner', 'sub1', <FaUsers />, [
      getItem('My Profile', '4', null, null, () => myCustomFunction("/MyProfile")),
      getItem('Payrolls', '5', null, null, () => myCustomFunction("/PayRoll")),
    ]),
  ];
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto scroll-pb-10">
      {activeMenu ? (
        <>
          <div className="flex justify-center items-center top-0 z-100">
            <span className="items-center mt-4 flex text-sm font-extrabold tracking-tight text-white">TeleCaller Dashboard</span>
          </div>
          {/* <CustomNavLink data={SideNav} /> */}
          <Layout
            style={{
              backgroundColor: "transparent",
              background: "transparent",
              border: "none",
              width: "100%",
            }}
          >
            <Sider>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: "#33373E", color: "white", width: "100%", fontSize: "10.7px" }} />
            </Sider>
          </Layout>
          <div className="flex w-full items-center justify-center">
            <img
              src={crmLogo}
              style={{ width: "95px", position: "fixed", bottom: "20px" }}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
