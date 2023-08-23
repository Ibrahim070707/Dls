import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../../contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const [SerachBar, setSerachBar] = useState(false);
  const [VisibleDropDown, setVisibleDropDown] = useState(false);
  const [ProfileBox, setProfileBox] = useState(false)
  const [time, setTime] = useState(300);
  const [ShowTimer, setShowTimer] = useState(false)
  const UserData = JSON.parse(localStorage.getItem("data"));
  const [EmployeeTime, setEmployeeTime] = useState("")
  const [EmployeeTimeStatus, setEmployeeTimeStatus] = useState("")

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  const fontSize = "fontSize:'25px'";
  const handleSearchBar = () => {
    if (SerachBar === false) {
      setSerachBar(true);
    } else {
      setSerachBar(false);
    }
  };
  const handleDropDown = () => {
    if (VisibleDropDown === false) {
      setVisibleDropDown(true);
    } else {
      setVisibleDropDown(false);
    }
  };
  const handleLogout = () => {
    CreateTime()
    localStorage.removeItem("TCIsLoggedIn");
    localStorage.removeItem("EmpData");
    localStorage.removeItem("token");
    sessionStorage.removeItem("ShowModal");
    localStorage.removeItem("RoleID");
    sessionStorage.removeItem("LoginTime");
    navigate("/");
    // window.location.replace("https://flymingotech.co.in/CRM/");
    OnChangeState(false);
  };
  var date = new Date();

  var formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // Use 24-hour format
    timeZone: 'Asia/Kolkata' // Adjust to your desired time zone
  });

  // Timer Js
  useEffect(() => {
    const SetWorkingTime = setInterval(() => {
      CreateTime()
      sessionStorage.setItem("LoginTime", formattedTime)
    }, 300000);
    const timerId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    if (time === 0) {
      clearInterval(timerId);
      CreateTime()
      RemoveSession();
    }
    if (time <= 30) {
      setShowTimer(true)
    }

    return () => {
      clearInterval(timerId);
      clearInterval(SetWorkingTime);
    };
  }, [time]);
  useEffect(() => {
    GetEmployeeTime()
  }, [])

  const RemoveSession = () => {
    navigate("/")
    sessionStorage.removeItem("LoginValid")
    sessionStorage.removeItem("LoginTime");
    window.location.reload(false)
  };
  const MouseOver = () => {
    setShowTimer(false)
    setTime(300);
  };
  const Body = document.getElementsByTagName("body");
  Body[0].addEventListener("mousemove", MouseOver);
  if (sessionStorage.getItem("LoginTime")) {
  } else {
    sessionStorage.setItem("LoginTime", formattedTime)
  }
  const CreateTime = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      "emp_id": UserData.id,
      "from": sessionStorage.getItem("LoginTime"),
      "to": formattedTime
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${Base_Url}CreateEmployeeTime`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  const GetEmployeeTime = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      "emp_id": UserData.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${Base_Url}CalculateEmployeeTime`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setEmployeeTime(result.Data)
        setEmployeeTimeStatus(result.TimeStatus)
      })
      .catch(error => console.log('error', error));
  }
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
        <div className="flex flex-row justify-center items-center">
          <NavButton
            title="Menu"
            customFunc={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
            color={currentColor}
            icon={<AiOutlineMenu />}
          />
          <span className="text-sm rounded-lg hover:bg-light-gray cursor-pointer py-3 px-1">Your Rank&nbsp;100</span>
        </div>
        {SerachBar ? (
          <input
            class="SearchInput input-elevated"
            style={{ width: "70%", transition: "0.5s" }}
            type="text"
            placeholder="Search"
          />
        ) : null}
        <div className="flex">
          <TooltipComponent content="Profile" position="BottomCentre">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              {
                ShowTimer ?
                  <div className="text-sm text-red-600">
                    Time Remaining: <span className="font-semibold">{time}</span>
                  </div> : ""
              }
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
            className="absolute right-10 top-12  dark:text-white dark:bg-secondary-dark-bg p-3 rounded-lg "
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
                <p className="font-semibold text-lg dark:text-gray-200">
                  {UserData.first_name + " " + UserData.last_name}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  TeleCaller
                </p>
              </div>
            </div>
            <div className="w-full mt-2 border-color border-b-1 pb-2">
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>Total Working Time:</span>&nbsp;&nbsp;<span className={EmployeeTimeStatus === 2 ? "text-red-500" : "text-green-500"}>{EmployeeTime}</span>
              </div>
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>EmployeeID:</span>&nbsp;&nbsp;<span>{UserData.employee_id}</span>
              </div>
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>EmailID:</span>&nbsp;&nbsp;<span>{UserData.email_id}</span>
              </div>
              <div className="flex  font-semibold text-sm dark:text-gray-200 mb-1">
                <span>Contact:</span>&nbsp;&nbsp;<span>{UserData.official_mobile_no}</span>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                style={{
                  borderRadius: "10px",
                }}
                className="hover:drop-shadow-xl shadow-xl p-3 w-full bg-[#1677ff] text-white dark:bg-white dark:text-black"
                onClick={handleLogout}>
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
