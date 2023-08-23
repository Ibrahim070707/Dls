import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import ViewQuoteData from "../components/ViewQuoteData";

function ViewCaseDetails() {
  const [loader, setloader] = useState(false);
  const { Base_Url } = useStateContext();
  const Token = localStorage.getItem("token");
  const [QuoteData, setQuoteData] = useState({});
  const { id } = useParams();
  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}GetCaseWithQuoteData/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setQuoteData(result.Data)
          setloader(false);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    ApiFetch();
    setloader(true);
  }, []);


  return (
    <>
      <div className="bg-gray-200" style={{ height: "auto", minHeight: "96vh" }}>
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
            style={{ gridTemplateColumns: "auto" }}
          >
            <ViewQuoteData Data={QuoteData} />
          </div>
        )}
        <div className="bg-white mt-9 rounded-2xl w-full mb-9">
        </div>
      </div>
    </>
  );
}

export default ViewCaseDetails;
