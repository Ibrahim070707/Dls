import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";
import Reminders from "../components/Reminders";
import TabButton from "../components/TabButton";
import CustomLoader from "../components/CustomLoader";
import QuoteGaneration from "../components/Tables/QuoteGaneration";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";


const CaseList = ({ RemindersData }) => {
  const [loader, setloader] = useState(false);
  const Token = localStorage.getItem("token");
  const { Base_Url, activeMenu } = useStateContext();
  const [ActiveTabNumber, setActiveTabNumber] = useState(1);
  const [ActiveMonthTabNumber, setActiveMonthTabNumber] = useState(1);
  const [TabsNumbersData, setTabsNumbersData] = useState({});
  const [ActiveCasesType, setActiveCasesType] = useState(1);
  const UserData = JSON.parse(localStorage.getItem("data"));
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let month = d.getMonth();

  const [SelectedMonth, setSelectedMonth] = useState(month);
  const [data, setdata] = useState([]);
  const [Quotedata, setQuotedata] = useState([]);
  const [Conviencedata, setConviencedata] = useState([]);
  const [Appointmentdata, setAppointmentdata] = useState([]);
  const [Convertdata, setConvertdata] = useState([]);
  const [Lostdata, setLostdata] = useState([]);
  const [NumberCountLoader, setNumberCountLoader] = useState(false);
  const [SelectMonthId, setSelectMonthId] = useState(month + 1)

  useEffect(() => {
    setNumberCountLoader(true)
    setloader(true);
    ApiFetch();
  }, []);
  const ApiFetch = () => {
    GetConnectdata();
    GetQuotedata();
    GetConviencedata();
    GetAppointmentdata();
    GetConvertdata();
    GetLostdata();
    GetDataCount(month + 1);
  };
  const handleTabsChange = (id) => {
    setActiveTabNumber(id);
  };
  const GetConnectdata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var raw = JSON.stringify({
      employee_id: UserData.id,
      sub_status: 1,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/MyTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          // setTabsNumbersData({
          //   Connect: result.Connect,
          //   Quote: result.Quote,
          //   Convience: result.Convience,
          //   Appointment: result.Appointment,
          //   Convert: result.Convert,
          //   Lost: result.Lost,
          // });
          setdata({
            Currect: result.Current,
            Previous: result.previous_Month,
            Next: result.Next_Month,
            RenewalCurrent: result.RenewalCurrent,
            Renewalprevious_Month: result.Renewalprevious_Month,
            RenewalNext_Month: result.RenewalNext_Month,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const GetQuotedata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var raw = JSON.stringify({
      employee_id: UserData.id,
      sub_status: 2,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/MyTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setQuotedata({
            Currect: result.Current,
            Previous: result.previous_Month,
            Next: result.Next_Month,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const GetConviencedata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var raw = JSON.stringify({
      employee_id: UserData.id,
      sub_status: 3,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/MyTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setConviencedata({
            Currect: result.Current,
            Previous: result.previous_Month,
            Next: result.Next_Month,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const GetAppointmentdata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var raw = JSON.stringify({
      employee_id: UserData.id,
      sub_status: 4,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/MyTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setAppointmentdata({
            Currect: result.Current,
            Previous: result.previous_Month,
            Next: result.Next_Month,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const GetConvertdata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var raw = JSON.stringify({
      employee_id: UserData.id,
      sub_status: 5,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/MyTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setConvertdata({
            Currect: result.Current,
            Previous: result.previous_Month,
            Next: result.Next_Month,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const GetLostdata = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var raw = JSON.stringify({
      employee_id: UserData.id,
      sub_status: 6,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/MyTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setLostdata({
            Currect: result.Current,
            Previous: result.previous_Month,
            Next: result.Next_Month,
          });
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));
  };
  const handleMonthChnage = (id) => {
    setNumberCountLoader(true)
    setActiveMonthTabNumber(id);
    if (id == 0) {
      GetDataCount(month)
      setSelectedMonth(month);
      setSelectMonthId(month)
    } else if (id == 1) {
      GetDataCount(month + 1)
      setSelectedMonth(month + 1);
      setSelectMonthId(month + 1)
    } else {
      GetDataCount(month + 2)
      setSelectedMonth(month + 2);
      setSelectMonthId(month + 2)
    }
  };
  const GetDataCount = (monthId) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      "emp": UserData.id,
      "month": monthId,
      "type": ActiveCasesType
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetCountOFCaseList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTabsNumbersData({
          Connect: result.Data.Connect,
          Convience: result.Data.Convience,
          Appointment: result.Data.Appointment,
          Convert: result.Data.Convert,
          Lost: result.Data.Lost,
        });
        setNumberCountLoader(false)
      })
      .catch(error => console.log('error', error));
  }
  const handleCaseType = (id) => {
    GetDataCount(SelectMonthId, id)
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;


  return (
    <div className="bg-gray-200" style={{ minHeight: "93vh" }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          id: "25663",
          duration: 7000,
        }}
      />
      {loader ? (
        <CustomLoader />
      ) : (
        <div
          className="grid mx-5 gap-5"
          style={{
            gridTemplateColumns: activeMenu ? "73% auto" : "78% auto",
            gridAutoColumns: "auto",
          }}
        >
          <div className="mt-5">
            <div className="mb-3 bg-white w-full gap-5 p-5 grid grid-cols-5 rounded-2xl shadow-md">
              <TabButton
                type
                Title="Fresh"
                Isactive={ActiveCasesType === 1 ? true : false}
                onclick={() => {
                  setActiveCasesType(1);
                  handleCaseType(1)
                }}
              />
              <TabButton
                type
                Title="Renewal"
                Isactive={ActiveCasesType === 2 ? true : false}
                onclick={() => {
                  setActiveCasesType(2);
                  handleCaseType(2)
                }}
              />
            </div>
            <div className="bg-white w-full gap-5 p-5 grid grid-cols-5 rounded-2xl shadow-md">
              <TabButton
                Title="Connect"
                number={NumberCountLoader ? <Spin indicator={antIcon} /> : TabsNumbersData.Connect ? TabsNumbersData.Connect : "0"}
                Isactive={ActiveTabNumber === 1 ? true : false}
                onclick={() => handleTabsChange(1)}
              />
              <TabButton
                Title="Convience"
                number={NumberCountLoader ? <Spin indicator={antIcon} /> : TabsNumbersData.Convience ? TabsNumbersData.Convience : "0"}
                Isactive={ActiveTabNumber === 2 ? true : false}
                onclick={() => handleTabsChange(2)}
              />
              {/* <TabButton Title="Convience" number={
                TabsNumbersData.Convience ? TabsNumbersData.Convience : "0"
              }
                Isactive={ActiveTabNumber === 3 ? true : false} onclick={() => handleTabsChange(3)} /> */}

              <TabButton
                Title="Appointment"
                number={
                  NumberCountLoader ? <Spin indicator={antIcon} /> :
                    TabsNumbersData.Appointment
                      ? TabsNumbersData.Appointment
                      : "0"
                }
                Isactive={ActiveTabNumber === 4 ? true : false}
                onclick={() => handleTabsChange(4)}
              />
              <TabButton
                Title="Convert"
                number={NumberCountLoader ? <Spin indicator={antIcon} /> : TabsNumbersData.Convert ? TabsNumbersData.Convert : "0"}
                Isactive={ActiveTabNumber === 5 ? true : false}
                onclick={() => handleTabsChange(5)}
              />
              <TabButton
                Title="Lost"
                number={NumberCountLoader ? <Spin indicator={antIcon} /> : TabsNumbersData.Lost ? TabsNumbersData.Lost : "0"}
                Isactive={ActiveTabNumber === 6 ? true : false}
                onclick={() => handleTabsChange(6)}
              />
            </div>
            <div className="bg-white mt-3 w-full h-20 gap-5 p-5 grid grid-cols-6 rounded-2xl shadow-md">
              <TabButton
                type
                Title={monthNames[month - 1]}
                Isactive={ActiveMonthTabNumber === 0 ? true : false}
                onclick={() => {
                  handleMonthChnage(0);
                }}
              />
              <TabButton
                type
                Title={monthNames[month]}
                Isactive={ActiveMonthTabNumber === 1 ? true : false}
                onclick={() => {
                  handleMonthChnage(1);
                }}
              />
              <TabButton
                type
                Title={monthNames[month + 1]}
                Isactive={ActiveMonthTabNumber === 2 ? true : false}
                onclick={() => {
                  handleMonthChnage(2);
                }}
              />
            </div>
            <div className="bg-white p-5 rounded-2xl mt-3 mb-5 shadow-md">
              {ActiveCasesType === 1 ? (
                ActiveTabNumber === 1 ? (
                  <QuoteGaneration
                    Text="Pending"
                    data={
                      ActiveMonthTabNumber === 1
                        ? data.Currect
                        : ActiveMonthTabNumber === 2
                          ? data.Next
                          : data.Previous
                    }
                  />
                ) : ActiveTabNumber === 2 ? (
                  <QuoteGaneration
                    Text="Connected"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Quotedata.Currect
                        : ActiveMonthTabNumber === 2
                          ? Quotedata.Next
                          : Quotedata.Previous
                    }
                  />
                ) : ActiveTabNumber === 4 ? (
                  <QuoteGaneration
                    Text="Appointment"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Appointmentdata.Currect
                        : ActiveMonthTabNumber === 2
                          ? Appointmentdata.Next
                          : Appointmentdata.Previous
                    }
                  />
                ) : ActiveTabNumber === 5 ? (
                  <QuoteGaneration
                    Text="Convert"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Convertdata.Currect
                        : ActiveMonthTabNumber === 2
                          ? Convertdata.Next
                          : Convertdata.Previous
                    }
                  />
                ) : ActiveTabNumber === 6 ? (
                  <QuoteGaneration
                    Text="Lost"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Lostdata.Currect
                        : ActiveMonthTabNumber === 2
                          ? Lostdata.Next
                          : Lostdata.Previous
                    }
                  />
                ) : (
                  ""
                )) : ActiveTabNumber === 1 ? (
                  <QuoteGaneration
                    Text="Pending"
                    data={
                      ActiveMonthTabNumber === 1
                        ? data.RenewalCurrect
                        : ActiveMonthTabNumber === 2
                          ? data.RenewalNext
                          : data.RenewalPrevious
                    }
                  />
                ) : ActiveTabNumber === 2 ? (
                  <QuoteGaneration
                    Text="Connected"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Quotedata.RenewalCurrect
                        : ActiveMonthTabNumber === 2
                          ? Quotedata.RenewalNext
                          : Quotedata.RenewalPrevious
                    }
                  />
                ) : ActiveTabNumber === 4 ? (
                  <QuoteGaneration
                    Text="Appointment"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Appointmentdata.RenewalCurrect
                        : ActiveMonthTabNumber === 2
                          ? Appointmentdata.RenewalNext
                          : Appointmentdata.RenewalPrevious
                    }
                  />
                ) : ActiveTabNumber === 5 ? (
                  <QuoteGaneration
                    Text="Convert"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Convertdata.RenewalCurrect
                        : ActiveMonthTabNumber === 2
                          ? Convertdata.RenewalNext
                          : Convertdata.RenewalPrevious
                    }
                  />
                ) : ActiveTabNumber === 6 ? (
                  <QuoteGaneration
                    Text="Lost"
                    data={
                      ActiveMonthTabNumber === 1
                        ? Lostdata.RenewalCurrect
                        : ActiveMonthTabNumber === 2
                          ? Lostdata.RenewalNext
                          : Lostdata.RenewalPrevious
                    }
                  />
                ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <Reminders Height="auto" MaxHeight="663px" Data={RemindersData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;
