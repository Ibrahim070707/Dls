import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  FaDatabase,
  FaList,
  FaTasks,
  FaTv,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import "../sidebar.css";
import crmLogo from "../data/crmLogo2.png";
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
  const myCustomFunction = (e) => {
    navigate(e)
  }

  // New 
  const items = [
    getItem('Dashboard', '1', <FaTv />, null, () => myCustomFunction("/")),
    getItem('Movments', 'sub1', <FaList />, [
      getItem('Create Movement', '2', null, null, () => myCustomFunction("/CreateMovment")),
      getItem('My Movement', '3', null, null, () => myCustomFunction("/MyMovements")),
    ]),
    getItem('Reports', 'sub2', <FaDatabase />, [
      getItem('Business Reports', '4', null, null, () => myCustomFunction("/BusinessReports")),
    ]),
  ];
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto scroll-pb-10">
      {activeMenu ? (
        <>
          <div className="flex justify-center items-center top-0 z-100">
            <span className="items-center mt-4 flex text-sm font-extrabold tracking-tight  text-white">I Partner Dashboard</span>
          </div>
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
