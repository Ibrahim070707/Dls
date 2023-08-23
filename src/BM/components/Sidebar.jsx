import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  FaDatabase,
  FaTasks,
  FaTv,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import "../sidebar.css";
import crmLogo from "../data/crmLogo2.png";
// import CustomNavLink from "./CustomNavLink";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";

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
      icon: <FaTv className="text-lg" />,
    },
    {
      Tile: "My Task",
      id: "DataBank",
      IsDropDown: 1,
      icon: <FaDatabase className="text-lg" />,
      Links: [
        {
          Title: "Data Allocation",
          To: "/Allocation",
          id: "Allocation",
        },
        {
          Title: "ReAllocation",
          To: "/ReAllocation",
          id: "ReAllocation",
        },
        {
          Title: "Movements",
          To: "/Movements",
          id: "Movements",
        },
      ],
    },
    {
      Tile: "Employee Corner",
      IsDropDown: 1,
      icon: <FaUsers className="text-lg" />,
      id: "EmployeeCreation",
      Links: [
        {
          Title: "EMP ID Creation",
          To: "/CreateEmployee",
          id: "ListBranch",
        },
        {
          Title: "ALL ID'S",
          To: "/AllIds",
          id: "AllIds",
        },
        {
          Title: "Payrolls",
          To: "/Payrolls",
          id: "Payrolls",
        },
      ],
    },
    // UserData.user_type == 1 ?
    {
      Tile: "Reports",
      icon: <FaTasks className="text-lg" />,
      IsDropDown: 1,
      id: "Reports",
      Links: [
        {
          Title: "Business Reports",
          To: "add",
        },
        {
          Title: "CSR Reports",
          To: "/CsrReports",
          id: "CsrReports"
        },
        {
          Title: "Recovery Reports",
          To: "add",
        },
      ],
    },
    // : ""
    {
      // UserData.user_type == 1 ?
      Tile: "Financials",
      icon: <FaWallet className="text-lg" />,
      IsDropDown: 1,
      Links: [
        {
          Title: "Statement",
          To: "add",
        },
        {
          Title: "Invoice",
          To: "add",
        },
      ],
    },
    // : ""
  ];
  const myCustomFunction = (e) => {
    navigate(e)
  }

  // New 
  const items = [
    getItem('Dashboard', '1', <FaTv />, null, () => myCustomFunction("/")),
    getItem('My Task', 'sub1', <FaDatabase />, [
      getItem('Data Allocation', '3', null, null, () => myCustomFunction("/Allocation")),
      getItem('ReAllocation', '4', null, null, () => myCustomFunction("/ReAllocation")),
      getItem('Movements', '5', null, null, () => myCustomFunction("/Movements")),
    ]),
    getItem('Employee Corner', 'sub2', <FaUsers />, [
      getItem('EMP ID Creation', '6', null, null, () => myCustomFunction("/CreateEmployee")),
      getItem("ALL ID'S", '7', null, null, () => myCustomFunction("/AllIds")),
      getItem('Payrolls', '8', null, null, () => myCustomFunction("/Payrolls")),
    ]),
    UserData.type == 1 ? getItem('Reports', 'sub3', <FaTasks />, [
      getItem('Business Reports', '9', null, null, () => myCustomFunction("/BusinessReports")),
      getItem("CSR Reports", '10', null, null, () => myCustomFunction("/CsrReports")),
      getItem('Recovery Reports', '11', null, null, () => myCustomFunction("/NotAdded")),
    ]) : "",
    UserData.type == 1 ? getItem('Financials', 'sub4', <FaWallet />, [
      getItem('Statement', '12', null, null, () => myCustomFunction("/NotAdded")),
      getItem('Invoice', '13', null, null, () => myCustomFunction("/NotAdded")),
    ]) : "",
  ];
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto scroll-pb-10">
      {activeMenu ? (
        <>
          <div className="flex justify-center items-center top-0 z-100">
            <span className="items-center mt-4 flex text-sm font-extrabold tracking-tight  text-white">Branch Admin Dashboard</span>
          </div>
          {/* <CustomNavLink data={SideNav} /> */}
          <div style={{
            maxHeight: "600px",
            overflowX: "scroll",
          }}>
            <Layout
              style={{
                backgroundColor: "transparent",
                background: "transparent",
                border: "none",
                width: "100%"
              }}
            >
              <Sider>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: "#33373E", color: "white", width: "100%", fontSize: "10.7px" }} />
              </Sider>
            </Layout>
          </div>
          <div className="flex w-full mt-10 items-center justify-center">
            <div style={{ position: "Fixed", bottom: "7px" }}>
              <img src={crmLogo} style={{ width: "95px" }} />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
