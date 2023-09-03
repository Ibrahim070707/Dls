import React, { useEffect, useState } from "react";
import { Pie, Stacked, } from "../components";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomLoader from "../components/CustomLoader";
import { Toaster } from "react-hot-toast";
import Reminders from "../components/Reminders";
import { FaCheck, FaHandshake, FaMeteor, FaPhoneVolume, FaTasks, FaTrophy } from "react-icons/fa";
import { Modal } from "antd";

const TCDashboard = ({ RemindersData }) => {
  const [loader, setloader] = useState(false)
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("data"));
  const [DashboardData, setDashboardData] = useState({})
  const { Base_Url, MediaBase_Url } = useStateContext();
  const [NotificstionData, setNotificstionData] = useState({});
  const [IsFirstTime, setIsFirstTime] = useState(false);
  const [PrevMonthData, setPrevMonthData] = useState("")

  const [DataPremiumCount, setDataPremiumCount] = useState([])
  const [CallStatusdata, setCallStatusdata] = useState({})
  const [CurrentMonthData, setCurrentMonthData] = useState("")
  const [ShowStacked, setShowStacked] = useState(false)
  const [SalesData, setSalesData] = useState([])
  const [DashboardCardsData, setDashboardCardsData] = useState({})

  const GetBusinessData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}DataPremiumCountByEmpID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataPremiumCount(result.Data)
        setPrevMonthData(result.Data.Prev)
        setCurrentMonthData(result.Data.Current)
        setloader(false)
      })
      .catch(error => console.log('error', error));
  }
  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}DashboardData/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setDashboardData({
            TodayTotal: result.Today.Total,
            TodayConnect: result.Today.Connect,
            TodayConvert: result.Today.Convert,

            Month_Total: result.Month.Month_Total,
            Connect_Month: result.Month.Connect_Month,
            Convert_Total: result.Month.Convert_Total,


            NextTodayTotal: result.NextToday.Total,
            NextTodayConnect: result.NextToday.Connect,
            NextTodayConvert: result.NextToday.Convert,
            NextMonth_Total: result.NextMonth.Month_Total,
            NextConnect_Month: result.NextMonth.Connect_Month,
            NextConvert_Total: result.NextMonth.Convert_Total,


          })
        }
        setloader(false)
      })
      .catch(error => console.log('error', error));






    fetch(`${Base_Url}GetNotification`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setNotificstionData(result.Data);
          if (sessionStorage.getItem("ShowModal") === null) {
            setIsFirstTime(true)
            sessionStorage.setItem("ShowModal", "true")
          }
        }
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    ApiFetch()
    CallStatus()
    GetBusinessData()
    GetDashboardCardsdata()
    GetSalesData()
    setloader(true)
    setTimeout(() => {
      setShowStacked(true);
    }, 2000);

  }, []);
  const DashboardStatsData = [
    {
      Today: DashboardData.TodayTotal ? DashboardData.TodayTotal : 0,
      Month: DashboardData.Month_Total ? DashboardData.Month_Total : 0,
      NextToday: DashboardData.NextTodayTotal ? DashboardData.NextTodayTotal : 0,
      NextMonth: DashboardData.NextMonth_Total ? DashboardData.NextMonth_Total : 0,
      title: "Connect",
      icon: <FaPhoneVolume className="text-lg" />,
      bg: "linear-gradient(320deg, #552cd1,#9372f7)"
      ,
    },
    {
      Today: DashboardData.TodayConnect ? DashboardData.TodayConnect : 0,
      Month: DashboardData.Connect_Month ? DashboardData.Connect_Month : 0,
      NextToday: DashboardData.NextTodayConnect ? DashboardData.NextTodayConnect : 0,
      NextMonth: DashboardData.NextConnect_Month ? DashboardData.NextConnect_Month : 0,
      title: "Appointment",
      icon: <FaHandshake className="text-lg" />,
      bg: "linear-gradient(320deg, #fa5b05,#f5945f)"
    },
    {
      Today: DashboardData.TodayConvert ? DashboardData.TodayConvert : 0,
      Month: DashboardData.Convert_Total ? DashboardData.Convert_Total : 0,
      NextToday: DashboardData.NextTodayConvert ? DashboardData.NextTodayConnect : 0,
      NextMonth: DashboardData.NextConvert_Total ? DashboardData.NextConvert_Total : 0,
      title: "Convert",
      icon: <FaCheck className="text-lg" />,
      bg: "linear-gradient(320deg, #2ab86a,#84f5b7)"
    },
  ]
  setTimeout(() => {
    setIsFirstTime(false);
  }, 10000);
  const CallStatus = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetCallStatus/ByEmpId/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setCallStatusdata({
          Total: result.Total,
          Connect: result.Connect,
          Convience: result.Convience,
          Appointment: result.Appointment,
          Convert: result.Convert,
          Lost: result.Lost,
        })
        setloader(false)
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
  }
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  let month = d.getMonth();
  const GetSalesData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetSalesDataByEmployeeID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setSalesData(result.Data)
        }
      })
      .catch(error => console.log('error', error));
  }
  const GetDashboardCardsdata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetDashboardDataByEmpID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDashboardCardsData({
          Total: result.Total,
          Connect: result.Connect,
          Convert: result.Convert,
          Lost: result.Lost,
        })
      })
      .catch(error => console.log('error', error));
  }
  const DashboardCards = [
    {
      amount: DashboardCardsData.Total ? DashboardCardsData.Total : 0,
      title: "Total Data",
    },
    {
      amount: DashboardCardsData.Connect ? DashboardCardsData.Connect : 0,
      title: "Connect",
    },
    {
      amount: DashboardCardsData.Convert ? DashboardCardsData.Convert : 0,
      title: "Convert",
    },
    {
      amount: DashboardCardsData.Lost ? DashboardCardsData.Lost : 0,
      title: "Lost",
    },
  ];

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
        null
      )}
      {loader ?
        <CustomLoader /> :
        <div className="mt-2 bg-gray-200" style={{ minHeight: "93vh" }}>
          <div className="grid " style={{ gridTemplateColumns: "65% auto" }}>
            <div className="w-full">
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
              <div className="mx-4 mt-1">
                <div>
                  <div className="w-full ml-2 flex flex-wrap justify-center gap-1 items-start">
                    {DashboardStatsData.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'white',
                          width: "31%",
                          height: "13rem",
                        }}
                        className="mx-1 text-black p-4 rounded-xl shadow-md">
                        <p className="mt-1 flex justify-start items-center">
                          <span className="p-3 text-sm text-white rounded-3xl" style={{ background: item.bg }}>{item.icon}</span>
                          <span className="text-sm">{item.title}</span>
                        </p>
                        <p className="mt-5 text-gray-400 font-extralight text-sm">{monthNames[month]}</p>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="flex justify-center items-center flex-col rounded-md bg-gray-100 SMF">
                            <span>{item.Today}</span>
                            <span>FTD</span>
                          </div>
                          <div className="flex justify-center items-center flex-col rounded-md bg-gray-100 SMF">
                            <span>{item.Month}</span>
                            <span>MTD</span>
                          </div>
                        </div>
                        <p className="mt-5 text-gray-400 font-extralight text-sm">{monthNames[month + 1]}</p>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="flex justify-center items-center flex-col border-r-1 SMF">
                            <span>{item.NextToday}</span>
                            <span>FTD</span>
                          </div>
                          <div className="flex justify-center items-center flex-col SMF">
                            <span>{item.NextMonth}</span>
                            <span>MTD</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-2 mx-5 ml-4 shadow-md bg-blue-500 dark:bg-[#1D944F] p-4 rounded-2xl"
                    style={{ width: "97%" }}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-white text-sm">
                        Total Business
                      </p>
                      <div>
                        <p className="text-lg text-white font-semibold">
                          {/* {DataPremiumCount?.Pvt?.Current?.Premium + DataPremiumCount?.Gcv?.Current?.Premium + DataPremiumCount?.Health?.Current?.Premium} */}
                          ₹{DataPremiumCount.TotalBusiness}/-
                        </p>
                      </div>
                    </div>
                    <div className="grid  mt-4">
                      <div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="ml-5 shadow-md bg-white rounded-2xl p-2" style={{ width: "90%", marginTop: "1rem" }}>
                <p className="text-sm flex flex-row justify-between font-semibold">Call Status <span className="f01 text-center font-light">Total Data<br />{PieChartDataa.Total}</span></p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: " 0 10%",
                  }}
                >
                  <div className="w-36 ">
                    <Pie Data={PieChartDataa} Width={360} />
                  </div>
                </div>
              </div>
              <div
                className="bg-white mt-2 mx-5 px-5 py-2 rounded-2xl shadow-md" style={{ width: "90%" }}>
                <div className="text-center">
                  <p className="font-semibold text-sm">Sales Report</p>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
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
              <div className="ml-4 mr-6">
                <Reminders Height="auto" MaxHeight="150px" Data={RemindersData} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default TCDashboard;
