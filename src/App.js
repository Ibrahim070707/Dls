import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { useStateContext } from "../src/contexts/ContextProvider";

import Login from "./Login";
import {
  BranchAddEmployee,
  BranchAllIds,
  BranchAllocation,
  BranchCreateEmployee,
  BranchDashboard,
  BranchCSRReport,
  BranchListEmployee,
  BranchMovements,
  BranchNavbar,
  BranchReAllocation,
  BranchSidebar,
  BranchViewCaseDetails,
  BranchViewEmployee,
  BranchBusinessReports,
  BranchPayrolls,
  BranchEmployeePayroll,
} from "../src/BM/imports";
import {
  TCAddMyLeads,
  TCCaseList,
  TCDashboard,
  TCMyLeads,
  TCMyProfile,
  TCNavbar,
  TCSidebar,
  TCTimer,
  TCViewCaseDetails,
} from "../src/Tc/imports";
import PayRoll from "./Tc/pages/PayRoll";
import {
  MovementBusinessReports,
  MovementsCreateMovement,
  MovementsDashboard,
  MovementsMyMovements,
  MovementsNavbar,
  MovementsSideBar,
} from "./Movments/imports";

import NonFound from "./BM/pages/NonFound";
import PdfDonwload from "./Tc/pages/PdfDonwload";
const App = () => {
  const { currentMode, activeMenu, setCurrentMode } = useStateContext();
  const WhoIsLoginIn = sessionStorage.getItem("WhoIsLoginIn");
  const LoginValid = sessionStorage.getItem("LoginValid");
  const [RemindersData, setRemindersData] = useState([]);
  const { Base_Url } = useStateContext();
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("data"));
  const ChangeState = (e) => {
    if (e === false) {
      // localStorage.removeItem("LoginValid");
      sessionStorage.removeItem("LoginValid");
    } else {
      // localStorage.setItem("LoginValid", true);
      sessionStorage.setItem("LoginValid", true);
    }
    window.location.reload();
  };
  const GetRemindersData = () => {
    if (UserData) {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${Token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${Base_Url}GetEmp/Reminder/${UserData.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.Status === 200) {
            setRemindersData(result.data);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  useEffect(() => {
    if (WhoIsLoginIn == 3) {
      GetRemindersData();
    }
  }, []);

  const [OnChangeTheme, setOnChangeTheme] = useState("light");

  return (
    <>
      <BrowserRouter basename="/">
        {LoginValid ? (
          WhoIsLoginIn == 2 ? (
            <div className={currentMode === "Dark" ? "dark" : "light"}>
              <div className="flex relative dark:bg-main-dark-bg">
                {activeMenu ? (
                  <div
                    className="fixed sidebar dark:bg-secondary-dark-bg "
                    style={{
                      width: "15%",
                      transition: "0.5s",
                      backgroundColor: "#33373E",
                      color: "white",
                    }}
                  >
                    <BranchSidebar />
                  </div>
                ) : (
                  <div
                    className="w-0 dark:bg-secondary-dark-bg"
                    style={{ transition: "0.5s" }}
                  >
                    <BranchSidebar />
                  </div>
                )}
                <div
                  className={
                    activeMenu
                      ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full ML15 "
                      : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                  }
                >
                  <div className="fixed md:static dark:bg-main-dark-bg navbar w-full ">
                    <BranchNavbar OnChangeState={ChangeState} />
                  </div>
                  <div style={{ height: "auto" }}>
                    <Routes>
                      <Route path="/" element={<BranchDashboard />} />
                      <Route
                        path="/CreateEmployee"
                        element={<BranchCreateEmployee />}
                      />
                      <Route
                        path="/Allocation"
                        element={<BranchAllocation />}
                      />
                      <Route
                        path="/ReAllocation"
                        element={<BranchReAllocation />}
                      />
                      <Route path="/Movements" element={<BranchMovements />} />
                      <Route
                        path="/EmployeePayroll/:id"
                        element={<BranchEmployeePayroll />}
                      />
                      <Route path="/AllIds" element={<BranchAllIds />} />
                      <Route
                        path="/AddEmployee"
                        element={<BranchAddEmployee />}
                      />
                      <Route
                        path="/ListEmployee"
                        element={<BranchListEmployee />}
                      />
                      <Route
                        path="/ViewCaseDetails/:id"
                        element={<BranchViewCaseDetails />}
                      />
                      <Route
                        path="/ViewEmployee/:id"
                        element={<BranchViewEmployee />}
                      />
                      <Route path="/Payrolls" element={<BranchPayrolls />} />
                      <Route
                        path="/BusinessReports"
                        element={<BranchBusinessReports />}
                      />
                      <Route
                        path="/CsrReports"
                        element={
                          <React.Suspense>
                            <BranchCSRReport />
                          </React.Suspense>
                        }
                      />
                      <Route path="*" element={<NonFound />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          ) : WhoIsLoginIn == 3 ? (
            <div className={currentMode === "Dark" ? "dark" : "light"}>
              <div className="flex relative dark:bg-main-dark-bg">
                {activeMenu ? (
                  <div
                    className="fixed sidebar dark:bg-secondary-dark-bg "
                    style={{
                      width: "14%",
                      transition: "0.5s",
                      backgroundColor: "#33373E",
                      color: "white",
                    }}
                  >
                    <React.Suspense>
                      <TCSidebar />
                    </React.Suspense>
                  </div>
                ) : (
                  <div
                    className="w-0 dark:bg-secondary-dark-bg"
                    style={{ transition: "0.5s" }}
                  >
                    <React.Suspense>
                      <TCSidebar />
                    </React.Suspense>
                  </div>
                )}
                <div
                  className={
                    activeMenu
                      ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full BMSidebarWidth"
                      : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                  }
                >
                  <div className="fixed md:static dark:bg-main-dark-bg navbar w-full ">
                    <React.Suspense>
                      <TCNavbar OnChangeState={ChangeState} />
                    </React.Suspense>
                  </div>
                  <div style={{ height: "auto" }}>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <React.Suspense>
                            <TCDashboard RemindersData={RemindersData} />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/Timer"
                        element={
                          <React.Suspense>
                            <TCTimer />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <React.Suspense>
                            <NonFound />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/MyTask"
                        element={
                          <React.Suspense>
                            <TCCaseList RemindersData={RemindersData} />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/MyLeads"
                        element={
                          <React.Suspense>
                            <TCMyLeads RemindersData={RemindersData} />
                          </React.Suspense>
                        }
                      />
                      <Route path="/AddMyLeads" element={<TCAddMyLeads />} />
                      <Route path="/MyProfile" element={<TCMyProfile />} />
                      <Route path="/PayRoll" element={<PayRoll />} />
                      <Route path="/PdfDonwload" element={<PdfDonwload />} />
                      <Route
                        path="/ViewCaseDetails/:id"
                        element={
                          <TCViewCaseDetails
                            GetRemindersData={GetRemindersData}
                            RemindersData={RemindersData}
                          />
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={currentMode === "Dark" ? "dark" : "light"}>
              <div className="flex relative dark:bg-main-dark-bg">
                {activeMenu ? (
                  <div
                    className="fixed sidebar dark:bg-secondary-dark-bg "
                    style={{
                      width: "14%",
                      transition: "0.5s",
                      backgroundColor: "#33373E",
                      color: "white",
                    }}
                  >
                    <MovementsSideBar />
                  </div>
                ) : (
                  <div
                    className="w-0 dark:bg-secondary-dark-bg"
                    style={{ transition: "0.5s" }}
                  >
                    <MovementsSideBar />
                  </div>
                )}
                <div
                  className={
                    activeMenu
                      ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full BMSidebarWidth"
                      : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                  }
                >
                  <div className="fixed md:static dark:bg-main-dark-bg navbar w-full ">
                    <MovementsNavbar OnChangeState={ChangeState} />
                  </div>
                  <div style={{ height: "auto" }}>
                    <Routes>
                      <Route path="/" element={<MovementsDashboard />} />
                      <Route
                        path="/CreateMovment"
                        element={<MovementsCreateMovement />}
                      />
                      <Route
                        path="/MyMovements"
                        element={<MovementsMyMovements />}
                      />
                      <Route
                        path="/BusinessReports"
                        element={<MovementBusinessReports />}
                      />

                      <Route path="*" element={<NonFound />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <Routes>
            <Route path="/" element={<Login setLoginValid={ChangeState} />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};
export default App;
