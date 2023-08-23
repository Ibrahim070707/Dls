import React, { useEffect, useState } from "react";
import { Stacked } from "../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Modal } from "antd";
import CustomLoader from "../components/CustomLoader";
import { Toaster, toast } from "react-hot-toast";

const MovementsDashboard = () => {
  const [loader, setloader] = useState(false);
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("data"));
  const { Base_Url, MediaBase_Url } = useStateContext();
  const [IsFirstTime, setIsFirstTime] = useState(false);
  const [NotificstionData, setNotificstionData] = useState({});
  const [ShowStacked, setShowStacked] = useState(false)
  const [SalesData, setSalesData] = useState([])
  const [DataCount, setDataCount] = useState({})



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
        setloader(false)
      })
      .catch((error) => console.log("error", error));
  };
  const GetBusinessData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetMovmentBusinessDataByBranchID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setDataCount({
            Pvt: result.Data.Pvt,
            Gcv: result.Data.Gcv,
            Health: result.Data.Health,
            Total: result.Data.Total,
          })
        }
        setloader(false)
      })
      .catch(error => console.log('error', error));
  }
  const GetSaleData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetMovmentSalesDataByBranchID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSalesData({
          Prev: result.Prev,
          Current: result.Current
        })
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    setloader(true);
    ApiFetch();
    GetSaleData();
    GetBusinessData();
    setTimeout(() => {
      setShowStacked(true)
    }, 1000);
  }, []);
  setTimeout(() => {
    setIsFirstTime(false);
  }, 10000);
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
          <div className="grid " style={{ gridTemplateColumns: "60% auto" }}>
            <div className="w-full">
              <div
                className="mt-6 mx-5 ml-12 bg-blue-500 dark:bg-[#1D944F] p-4 rounded-2xl"
                style={{ width: "90%" }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white text-sm">
                    Total Business
                  </p>
                  <div>
                    <p className="text-lg text-white font-semibold">
                      ₹{DataCount?.Total?.premium}/-
                    </p>
                  </div>
                </div>
                <div className="grid  mt-2">
                  <div className="mt-2">
                    <div className="grid grid-cols-3 mt-1">
                      <div className="text-center text-white font-semibold f02">
                        <p>Type</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Nop</p>
                      </div>
                      <div className="text-center text-white font-semibold f02">
                        <p>Premium</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 mt-2">
                      <div className="text-center text-white f01">
                        <p>Pvt</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataCount?.Pvt?.Nop}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataCount?.Pvt?.premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-center text-white f01">
                        <p>Gcv</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataCount?.Gcv?.Nop}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataCount?.Gcv?.premium}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3  ">
                      <div className="text-center text-white f01">
                        <p>Health</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataCount?.Health?.Nop}</p>
                      </div>
                      <div className="text-center text-white f01">
                        <p>{DataCount?.Health?.premium}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-3  ">
                    <div className="text-center text-white f01">
                      <p>Total</p>
                    </div>
                    <div className="text-center text-white f01">
                      <p>{DataCount?.Health?.Nop + DataCount?.Pvt?.Nop + DataCount?.Gcv?.Nop}</p>
                    </div>
                    <div className="text-center text-white f01">
                      <p>{DataCount?.Health?.premium + DataCount?.Pvt?.premium + DataCount?.Gcv?.premium}</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div
                className="bg-white mt-6 mx-5 py-5 rounded-2xl"
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
        </div >
      )}
    </>
  );
};

export default MovementsDashboard;
