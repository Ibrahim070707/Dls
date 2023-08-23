import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../../contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaBell, FaRegBell } from "react-icons/fa";
import ChangeTheme from "../../assets/ChangeTheme";
import { Modal } from "antd";

const NavButton = ({ title, customFunc, icon, color, dotColor, FontSize }) => (
  <TooltipComponent content={title} position="BottomCentre">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ OnChangeState }) => {
  const navigate = useNavigate();
  const {
    setActiveMenu,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
    Base_Url,
    MediaBase_Url,
  } = useStateContext();
  const Token = localStorage.getItem("token");

  const [ProfileBox, setProfileBox] = useState(false)
  const [NotificationData, setNotificationData] = useState([]);
  const [SerachBar, setSerachBar] = useState(false);
  const [VisibleDropDown, setVisibleDropDown] = useState(false);
  const [VisibleNotificationDropDown, setVisibleNotificationDropDown] =
    useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    ApiFetch();
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const fontSize = "fontSize:'25px'";

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetAllNotifications`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setNotificationData(result.Data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleDropDown = () => {
    if (VisibleDropDown === false) {
      setVisibleDropDown(true);
    } else {
      setVisibleDropDown(false);
    }
  };
  const handleNotificationDropDown = () => {
    if (VisibleNotificationDropDown === false) {
      setVisibleNotificationDropDown(true);
    } else {
      setVisibleNotificationDropDown(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("BranchIsLoggedIn");
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    sessionStorage.removeItem("ShowModal");

    localStorage.removeItem("RoleID");
    navigate("/");

    // window.location.replace("https://flymingotech.co.in/CRM/");

    OnChangeState(false);

  };

  const UserData = JSON.parse(localStorage.getItem("data"));
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          id: "25663",
          duration: 7000,
        }}
      />
      <div
        className="flex justify-between items-center p-2 md:mx-6 relative h-12"
        style={{ transition: "0.5s" }}
      >
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="flex">
          {/* <ChangeTheme /> */}
          <TooltipComponent content="Profile" position="BottomCentre">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <div>
                {VisibleNotificationDropDown ? (
                  <FaBell
                    className="text-xl text-[#1677ff]"
                    onClick={handleNotificationDropDown}
                  />
                ) : (
                  <FaRegBell
                    className="text-xl text-[#1677ff]"
                    onClick={handleNotificationDropDown}
                  />
                )}
                {VisibleNotificationDropDown ? (
                  <div class="Notificationdropdown">
                    <div class="Notificationdropdown-content">
                      <div className="flex flex-col">
                        {NotificationData &&
                          NotificationData.map((el, index) => {
                            return (
                              <div className="mb-4 border-b-2">
                                <div className="grid grid-cols-2" key={index}>
                                  <img
                                    width="80px"
                                    src={MediaBase_Url + el.photo}
                                    alt="No Img Available"
                                  />
                                  <div className="flex flex-col">
                                    <p>{el.title}</p>
                                    <p>{el.description}</p>
                                  </div>
                                </div>
                                <span className="float-right text-gray-400">
                                  {el.Created_At}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <img
                className="rounded-full w-8 h-8"
                src={MediaBase_Url + UserData.photo}
              />
              <p onClick={() => setProfileBox(true)}>
                <span className="text-black text-14">Hi, </span>{" "}
                <span className="text-black font-bold ml-1 text-14">
                  {UserData ? UserData.first_name + " " + UserData.last_name : ""}

                </span>
                {VisibleDropDown ? (
                  <div class="dropdown">
                    <div class="dropdown-content">
                      <p onClick={handleLogout}>Logout</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </p>
              <MdKeyboardArrowDown
                style={{ fontSize: "20px" }}
                onClick={() => setProfileBox(true)}
              />
            </div>
          </TooltipComponent>
          <Modal
            open={ProfileBox}
            onCancel={() => setProfileBox(false)}
            footer=""
            className="absolute right-5 top-12  dark:text-white dark:bg-secondary-dark-bg  p-3 rounded-lg "
            style={{ width: "350px", minWidth: "350px", maxWidth: "350px" }}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg dark:text-gray-200">
                User Profile
              </p>
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
              <img
                className="rounded-full h-24 w-24"
                src={MediaBase_Url + UserData.photo}
                alt="user-profile"
              />
              <div>
                <p className="font-semibold text-xl dark:text-gray-200">
                  {UserData.first_name + " " + UserData.last_name}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Branch Admin
                </p>
              </div>
            </div>
            <div className="w-full mt-2 border-color border-b-1 pb-2">
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>EmployeeID:</span>&nbsp;&nbsp;<span>{UserData.employee_id}</span>
              </div>
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>EmailID:</span>&nbsp;&nbsp;<span>{UserData.email}</span>
              </div>
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>Contact:</span>&nbsp;&nbsp;<span>{UserData.office_mobile_no}</span>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                style={{
                  borderRadius: "10px",
                }}
                className="hover:drop-shadow-xl shadow-xl p-3 w-full bg-[#1677ff] text-white dark:bg-white dark:text-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Navbar;
