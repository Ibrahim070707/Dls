import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import CustomLoader from "../components/CustomLoader";
import Reminders from "../components/Reminders";
import { useStateContext } from "../../contexts/ContextProvider";
import AddQuote from "../components/AddQuote";
import ViewQuoteData from "../components/ViewQuoteData";
import Convience from "../components/Convience";
import Appointment from "../components/Appointment";
import Convert from "../components/Convert";
import Lost from "../components/Lost";
import RenderCaseDetails from "../components/RenderCaseDetails";
import { useParams } from "react-router-dom";

function ViewCaseDetails({ RemindersData, GetRemindersData }) {
  const { id } = useParams();
  const [loader, setloader] = useState(false);
  const { Base_Url } = useStateContext();
  const Token = localStorage.getItem("token");
  const [Data, setData] = useState({});
  const [QuoteData, setQuoteData] = useState({});
  const previousIdRef = useRef();
  const getDataWithQuote = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${Base_Url}GetCaseWithQuoteData/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setQuoteData(result.Data);
          setloader(false);
        }
      })
      .catch((error) => console.log("error", error));
  }
  const ApiFetch = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${Base_Url}getCase/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setData(result.data);
          setloader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getDataWithQuote()
    ApiFetch()
  }, []);




  return (
    <div className="bg-gray-200" style={{ height: "auto", minHeight: "160vh" }}>
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
          style={{ gridTemplateColumns: "72% auto", gridAutoColumns: "auto" }}
        >
          {Data.sub_status == "1" ? (
            <AddQuote Data={Data} RemindersFunction={GetRemindersData} />
          ) : Data.sub_status == "2" ? (
            <ViewQuoteData
              RemindersFunction={GetRemindersData}
              Data={QuoteData}
            />
          ) :
            //  Data.sub_status == "3" ? (
            //   <Convience Data={QuoteData} />
            // )
            //  :
            Data.sub_status == "4" ? (
              <Appointment
                RemindersFunction={GetRemindersData}
                Data={QuoteData} />
            ) : Data.sub_status == "5" ? (
              <Convert Data={QuoteData} RemindersFunction={GetRemindersData} />
            ) : Data.sub_status == "6" ? (
              <Lost Data={QuoteData} RemindersFunction={GetRemindersData} />
            ) : (
              <div className="bg-white mt-5 rounded-2xl w-full mb-9 flex justify-center items-center">
                No Data Available
              </div>
            )}
          <div>
            <Reminders Data={RemindersData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCaseDetails;
