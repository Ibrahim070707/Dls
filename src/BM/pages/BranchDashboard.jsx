import React, { useEffect, useState } from "react";
import { Pie, SparkLine, Stacked } from "../components";
import { SparklineAreaData } from "../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaPlus } from "react-icons/fa";
import { Modal } from "antd";
import CustomLoader from "../components/CustomLoader";
import { Toaster, toast } from "react-hot-toast";
import ViewTc from "./ViewTc";

const BranchDashboard = () => {
  const [NotificationData, setNotificationData] = useState([]);
  const [loader, setloader] = useState(false);
  const [ModelOpen, setModelOpen] = useState(false);
  const [FormData, setFormData] = useState({ title: "", description: "" });
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("data"));
  const [DashboardData, setDashboardData] = useState({});
  const { Base_Url, MediaBase_Url } = useStateContext();
  const [IsFirstTime, setIsFirstTime] = useState(false);
  const [NotificstionData, setNotificstionData] = useState({});
  const [CallStatusdata, setCallStatusdata] = useState({});
  const [PrevMonthData, setPrevMonthData] = useState("")
  const [DataPremiumCount, setDataPremiumCount] = useState([])
  const [CurrentMonthData, setCurrentMonthData] = useState("")
  const [LocationData, setLocationData] = useState([])
  const [BranchReportsData, setBranchReportsData] = useState([])
  const [EmpId, setEmpId] = useState("")
  const [ShowStacked, setShowStacked] = useState(false)
  const [SalesData, setSalesData] = useState([])


  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}getNotice`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setNotificationData(result.data);
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));

    // DashboardData
    var newmyHeaders = new Headers();
    newmyHeaders.append("Accept", "application/json");
    newmyHeaders.append("Content-Type", "application/json");
    newmyHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      branch_id: UserData.branch_id,
    });

    var requestOptionsnew = {
      method: "POST",
      headers: newmyHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Count/EmpAndCase`, requestOptionsnew)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setDashboardData({
            TotalEmployee: result.Employee,
            TotalCase: result.Case,
            Allocated: result.Allocated,
            Unallocated: result.Unallocated,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));

    fetch(`${Base_Url}GetNotification`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setNotificstionData(result.Data);
          if (sessionStorage.getItem("ShowModal") === null) {
            setIsFirstTime(true);
            sessionStorage.setItem("ShowModal", "true");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  const CallStatus = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetCallStatus/ByBranchId/${UserData.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCallStatusdata({
          Total: result.Total,
          Connect: result.Connect,
          Quote: result.Quote,
          Convience: result.Convience,
          Appointment: result.Appointment,
          Convert: result.Convert,
          Lost: result.Conver,
        });
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    ApiFetch();
    CallStatus();
    GetBusinessData();
    GetLocation();
    GetEmployeeReportsData();
    setloader(true);
    GetSalesData();
    setTimeout(() => {
      setShowStacked(true);
    }, 2000);
    setTimeout(() => {
      setIsFirstTime(false);
    }, 10000);
  }, []);
  const DashboardCards = [
    {
      amount: DashboardData.TotalEmployee ? DashboardData.TotalEmployee : 0,
      title: "Total Employees",
    },
    {
      amount: DashboardData.TotalCase ? DashboardData.TotalCase : 0,
      title: "Total Data",
    },
    {
      amount: DashboardData.Allocated ? DashboardData.Allocated : 0,
      title: "Total Allocated",
    },
    {
      amount: DashboardData.Unallocated ? DashboardData.Unallocated : 0,
      title: "Total Unallocated",
    },
  ];

  const GetBusinessData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}DataPremiumCountByBranchID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataPremiumCount(result.Data)
        setPrevMonthData(result.Data.Prev)
        setCurrentMonthData(result.Data.Current)
      })
      .catch(error => console.log('error', error));
  }
  const labels = ['Total', 'Connect', 'Convience', 'Appointment', 'Convert', 'Lost'];
  const PieChartDataa = {
    Total: CallStatusdata.Total ? CallStatusdata.Total : 0,
    Connect: CallStatusdata.Connect ? CallStatusdata.Connect : 0,
    Convience: CallStatusdata.Convience ? CallStatusdata.Convience : 0,
    Appointment: CallStatusdata.Appointment ? CallStatusdata.Appointment : 0,
    Convert: CallStatusdata.Convert ? CallStatusdata.Convert : 0,
    Lost: CallStatusdata.Lost ? CallStatusdata.Lost : 0,
  };
  const GetLocation = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}Get/Employees/ByBranchID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const Ter = result.data.map((el) => ({
          id: el.id,
          name: el.Reporting_name,
        }))
        setLocationData(Ter)
      })
      .catch(error => console.log('error', error));
  }
  const GetEmployeeReportsData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetEmployeePremuimDataByBranch/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setBranchReportsData(result.Data)
        }
      })
      .catch(error => console.log('error', error));
  }
  const GetSalesData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetSalesDataByBranchID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setSalesData(result.Data)
        }
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

      {IsFirstTime === true ? (
        <Modal open={true} footer="" onCancel={() => setIsFirstTime(false)}>
          <div className="m-5">
            <img src={MediaBase_Url + NotificstionData.photo} />
          </div>
          <div className="flex mt-5 flex-col gap-3">
            <p className="text-2xl text-center text-gray-600">
              {NotificstionData.title}
            </p>
            <p className="text-lg text-center text-gray-400">
              {NotificstionData.description}
            </p>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {loader ? (
        <CustomLoader />
      ) : (
        <div className="mt-2 bg-gray-200" style={{ minHeight: "93vh" }}>
          <Modal
            open={ModelOpen}
            title="Telecaller Report"
            onCancel={() => {
              setModelOpen(false)
              setEmpId("")
              window.location.reload(false)
            }}
            footer=""
            width="60%"
          >
            <ViewTc EmpID={EmpId} />
          </Modal>
          <div className="grid " style={{ gridTemplateColumns: "60% auto" }}>
            <div className="w-full mb-3">
              <div className="mt-4 p-2 gap-2 ml-8 mx-5 grid grid-cols-4">
                {DashboardCards.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#9372f7"
                          : index === 1
                            ? "#fa5b05"
                            : index === 2
                              ? "#2ab86a" : "#1e28c7",
                      background:
                        index === 0
                          ? "linear-gradient(320deg, #552cd1,#9372f7)"
                          : index === 1
                            ? "linear-gradient(320deg, #fa5b05,#f5945f)"
                            : index === 2
                              ? "linear-gradient(320deg, #2ab86a,#84f5b7)" : "linear-gradient(320deg, #1e28c7,#676feb)",
                      height: "5.5rem",
                      width: "100%"
                    }}
                    className="mx-1 text-white py-3 px-1 rounded-2xl flex flex-col justify-center items-center"
                  >
                    <span className="f01 font-semibold">{item.amount}</span>
                    <p className="f01 text-white mt-1">{item.title}</p>
                  </div>
                ))}
              </div>
              <div
                className="mt-2 mx-5 ml-12 bg-blue-500 dark:bg-[#1D944F] p-4 rounded-2xl"
                style={{ width: "90%" }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white text-sm">
                    Total Business
                  </p>
                  <div>
                    <p className="text-lg text-white font-semibold">
                      ₹{DataPremiumCount?.TotalBusiness + DataPremiumCount?.IPartner?.Health?.Premium + DataPremiumCount?.IPartner?.Gcv?.Premium + DataPremiumCount?.IPartner?.Pvt?.Premium}/-
                    </p>
                  </div>
                </div>
                <div className="grid  mt-4">
                  <div>
                    <p className="text-white f03">CSE Report</p>
                    <div className="grid grid-cols-5 mt-1">
                      <div className="text-center text-white font-semibold f02">
                        <p>Type</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Premium</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Premium</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 mt-2">
                      <div className="text-center text-white f01">
                        <p>Pvt</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Pvt?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Pvt?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="text-center text-white f01">
                        <p>Gcv</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Gcv?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Gcv?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType2?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType2?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Health</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType3?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType3?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Total</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Total + DataPremiumCount?.Gcv?.Current?.Total + DataPremiumCount?.Pvt?.Current?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.Health?.Current?.Premium + DataPremiumCount?.Gcv?.Current?.Premium + DataPremiumCount?.Pvt?.Current?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Total + DataPremiumCount?.RenewalType2?.Total + DataPremiumCount?.RenewalType3?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.RenewalType1?.Premium + DataPremiumCount?.RenewalType2?.Premium + DataPremiumCount?.RenewalType3?.Premium}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-white f03 mt-5">I Partner Report</p>
                    <div className="grid grid-cols-5 mt-1">
                      <div className="text-center text-white font-semibold f02">
                        <p>Type</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Fresh Premium</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Renewal Premium</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 mt-2">
                      <div className="text-center text-white f01">
                        <p>Pvt</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Pvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Pvt?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalPvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalPvt?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="text-center text-white f01">
                        <p>Gcv</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Gcv?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Gcv?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalGcv?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalGcv?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Health</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5  ">
                      <div className="text-center text-white f01">
                        <p>Total</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Total + DataPremiumCount?.IPartner?.Gcv?.Total + DataPremiumCount?.IPartner?.Pvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.Health?.Premium + DataPremiumCount?.IPartner?.Gcv?.Premium + DataPremiumCount?.IPartner?.Pvt?.Premium}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Total + DataPremiumCount?.IPartner?.RenewalGcv?.Total + DataPremiumCount?.IPartner?.RenewalPvt?.Total}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataPremiumCount?.IPartner?.RenewalHealth?.Premium + DataPremiumCount?.IPartner?.RenewalGcv?.Premium + DataPremiumCount?.IPartner?.RenewalPvt?.Premium}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mt-4 ml-12 mb-5 bg-white rounded-2xl md:w-400 py-2"
                style={{ width: "90%", maxHeight: "200px", overflowY: "scroll" }}>
                <p className="text-sm mb-3 text-center">Employee Report</p>
                <div className="grid grid-cols-4">
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">EmployeeID</span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Nop</span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Total Premium</span>
                  </div>
                  <div className="f02 flex flex-col">
                    <span className="text-center font-semibold">Action</span>
                  </div>
                </div>
                {
                  BranchReportsData && BranchReportsData.map((el, index) => {
                    return (
                      <div className="grid grid-cols-4 my-1" key={index}>
                        <div className="f01 flex flex-col">
                          <span className="text-center ">{el.Employee}</span>
                        </div>
                        <div className="f01 flex flex-col">
                          <span className="text-center ">{el.TotalData}</span>
                        </div>
                        <div className="f01 flex flex-col">
                          <span className="text-center ">{el.Premium}</span>
                        </div>
                        <div className="f01 flex flex-col">
                          <span className="text-center hover:text-blue-700 cursor-pointer" onClick={() => {
                            setModelOpen(true)
                            setEmpId(el.Id)
                          }}>View</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="w-full">
              {/* <div className="mt-2 mx-5">
                <select
                  style={{ borderRadius: "5px", width: "97%" }}
                  className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black font-bold placeholder:font-bold f01"
                  onChange={(e) => handleLocationChange(e.target.value)}
                >
                  <option className="text-gray-400 font-bold text-center" selected disabled>--Select Location--</option>
                  {LocationData.map((el, index) => {
                    return (
                      <option className="text-gray-400 font-bold text-center" key={index} value={el.id}>{el.name}</option>
                    )
                  })}
                </select>
              </div> */}
              <div
                className="mt-6 mx-5 bg-white w-full rounded-2xl p-2 "
                style={{ width: "90%" }}>
                <p className="text-sm flex flex-row justify-between font-semibold">Call Status <span className="f01 text-center font-light">Total Data<br />{PieChartDataa.Total}</span></p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: " 0 10%",
                  }}>
                  <div className="w-36">
                    {/* <Pie Data={{ series: Object.values(PieChartDataa), labels }} Width={365} /> */}
                    <Pie Data={PieChartDataa} Width={360} />
                  </div>
                </div>
              </div>
              <div
                className="bg-white mt-2 mx-5 py-5 rounded-2xl"
                style={{ width: "90%" }}
              >
                <div className="text-center">
                  <p className="font-semibold text-sm">Sales Report</p>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div
                    className="mt-2"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {ShowStacked ?
                      <div className="grid grid-cols-2">
                        <div className="flex flex-col">
                          <Stacked data={SalesData} type={1} lenght={100} />
                          <p className="text-center f03">Policy</p>
                        </div>
                        <div className="flex flex-col">
                          <Stacked data={SalesData} lenght={1000000} />
                          <p className="text-center f03">Premuim</p>
                        </div>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BranchDashboard;
