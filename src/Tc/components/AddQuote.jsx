import React, { useEffect, useRef, useState } from "react";
import CustomButton from "./AddProductForm/CustomButton";
import { BsTelephoneForward } from "react-icons/bs";
import { FaEnvelope, FaSlash } from "react-icons/fa";
import { useStateContext } from "../../contexts/ContextProvider";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { Toaster, toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function AddQuote({ Data, RemindersFunction }) {

  const [ShowQuote, setShowQuote] = useState(true);
  const Token = localStorage.getItem("token");
  const [Quotedata, setQuotedata] = useState([]);
  const { Base_Url, MediaBase_Url } = useStateContext();
  const UserData = JSON.parse(localStorage.getItem("data"));
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [ButtonEnabled, setButtonEnabled] = useState(false);
  const [IsOdOnly, setIsOdOnly] = useState("");
  const [ApiFormData, setApiFormData] = useState({
    id: Data.id,
    emp_id: UserData.id,
    customer_name: UserData.customer_name,
  });

  const [QuotationPremium, setQuotationPremium] = useState([])
  const QuoteIdsRef = useRef([])

  const navigate = useNavigate();
  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}getQuote`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setQuotedata(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    ApiFetch();
  }, []);
  const handleSelectCheckbox = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedValues((prevSelectedValues) => [
        ...prevSelectedValues,
        checkboxValue,
      ]);
    } else {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((value) => value !== checkboxValue)
      );
    }
  };
  const AddReminder = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      "case_id": Data.id,
      "emp_id": UserData.id,
      "date": ApiFormData.reminder_date,
      "time": ApiFormData.reminder_time
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${Base_Url}AddEmployeeReminders`, requestOptions)
      .then(response => response.json())
      .then(result => {
      })
      .catch(error => console.log('error', error));
  }
  const handleOnSubmit = () => {
    if (QuoteIdsRef.current.length >= 4) {
      toast.error("Only 3 Quotes Are Necessary");
    } else if (QuoteIdsRef.current.length < 3) {
      toast.error("Please Select Minimum 3 Quotes");
    } else {
      SaveApiCall();
      AddReminder();
      AddQuotePremiumData();
      generateAndDownloadPDF();
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${Token}`);

      var formdata = new FormData();
      formdata.append("case_id", Data.id);
      formdata.append("emp_id", UserData.id);
      formdata.append("reminder_date", ApiFormData.reminder_date);
      formdata.append("reminder_time", ApiFormData.reminder_time);

      QuoteIdsRef.current.map((ol) => {
        formdata.append("quote_id[]", `${ol}`);
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${Base_Url}GanerateQuote`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.Status === 200) {
            RemindersFunction();
            toast.success("Quote Ganerated Successfully");
            navigate("/MyTask");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  const SaveApiCall = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify(ApiFormData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}UpdateCaseWithAllocation`, requestOptions)
      .then((response) => response.json())
      .then((result) => { })
      .catch((error) => console.log("error", error));
  };
  const handleOnSave = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify(ApiFormData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}UpdateCaseWithAllocation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          toast.success("Data Updated Successfully");
          navigate(`/MyTask`);
        } else {
          toast.success("Data Not Updated Successfully");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleOnGanerateQuote = () => {
    setButtonEnabled(true);
  };
  const handleOnChange = (index, event, quote_id) => {
    const { name, value } = event.target

    if (QuotationPremium.length > 3) {
      toast.error("You Are Already Selected Three Companies")
    } else {
      if (!QuoteIdsRef.current.includes(quote_id)) {
        QuoteIdsRef.current.push(quote_id);
      }

      const updatedInputDataArray = [...QuotationPremium];
      updatedInputDataArray[index] = {
        ...updatedInputDataArray[index],
        [name]: value,
      };
      setQuotationPremium(updatedInputDataArray);
    }

  }
  const AddQuotePremiumData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    QuotationPremium.map((el) => {
      formdata.append("tariif_descount[]", el.tariif_descount);
      formdata.append("od_rate[]", el.od_rate);
      formdata.append("addon_rate[]", el.addon_rate);
      formdata.append("tp_rate[]", el.tp_rate);
      formdata.append("net_premium[]", el.net_premium);
      formdata.append("gross_premium[]", el.gross_premium);
    })
    QuoteIdsRef.current.map((re) => {
      formdata.append("quote_id[]", re);
    })
    formdata.append("case_id", Data.id);
    formdata.append("employee_id", UserData.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${Base_Url}AddQuotePremiumData`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }
  const filteredData = Quotedata.filter((Quote) =>
    Quote.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Create PDF component

  const generateAndDownloadPDF = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    const formdata = new FormData();

    formdata.append("employee_id", UserData.id);
    formdata.append("case_id", Data.id);
    QuoteIdsRef.current.forEach((re) => {
      formdata.append("QuoteIds[]", re);
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch(`${Base_Url}GetQuotePremiumdataById`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'example.pdf'; // Specify the desired file name
        document.body.appendChild(link);
        link.click();

        // Clean up the anchor element and blob URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => console.error('Error generating or downloading PDF:', error));
  };



  return (
    <>
      <div className="bg-white mt-5 rounded-2xl w-full mb-9">
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            id: "25663",
            duration: 7000,
          }}
        />
        <div className="flex justify-between items-center mt-5">
          <div className="flex justify-start items-center ml-8">
            <div className="bg-amber-200 text-amber-600 rounded-lg w-16 h-16 flex justify-center items-center text-xl">
              {Data.customer_name ? Data.customer_name[0] : "--"}
            </div>
            <div className="font-semibold text-sm ml-2 ">
              <p className="my-1">{Data.customer_name}</p>
              <p style={{ fontSize: "11px" }} className="text-gray-400">
                {Data.case_id}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 mr-5">
            <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
              <BsTelephoneForward />
              <p>{Data.mobile_no}</p>
            </div>
            <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
              <FaEnvelope />
              <p>{Data.email_id}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 mt-10 mx-3 gap-5 mb-10">
          <div className="flex justify-center items-center my-3 flex-col border-r-2">
            <p className="text-gray-400 f02">Vehicle Number</p>
            <p className="f01">{Data.vehicle_no}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col border-r-2">
            <p className="text-gray-400 f02 ">Year Of Manufacturing</p>
            <p className="f01">{Data.year_of_manufacturing}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col border-r-2">
            <p className="text-gray-400 f02 ">Make</p>
            <p className="f01">{Data.make}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02 ">Model</p>
            <p className="f01">{Data.model}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col border-r-2">
            <p className="text-gray-400 f02 ">Seating</p>
            <p className="f01">{Data.seating_capacity}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col border-r-2">
            <p className="text-gray-400 f02 ">CC / GVW</p>
            <p className="f01">{Data.CC_GVW}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col border-r-2">
            <p className="text-gray-400 f02 ">Zone</p>
            <p className="f01">{Data.zone}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col ">
            <p className="text-gray-400 f02 ">Location</p>
            <p className="f01">{Data.location}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col ">
            <p className="text-gray-400 f02 ">Expiry date</p>
            <p className="f01">{Data.expiry_date}</p>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02 ">Mobile 2</p>
            <Input
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["Mobile2"]: e.target.value })
              }
              placeholder="Enter Mobile 2"
              defaultValue={Data.Mobile2}
              className="font-semibold"
              type="number"
              maxLength="10"

            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col ">
            <p className="text-gray-400 f02">Alternate Email</p>
            <Input
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["alternate_email_id"]: e.target.value,
                })
              }
              className="font-semibold"
              placeholder="Enter Alternate Email ID"
              defaultValue={Data.alternate_email_id}
              type="email"
            />
          </div>
        </div>
        <div className="border-t-2" style={{ width: "100%" }}></div>
        <p className="mt-10 ml-4 text-gray-400 f02">Product Details:</p>
        <div className="grid grid-cols-4 mt-1 mx-3 gap-5 mb-5">
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f01">Product Type</p>
            <select
              style={{ borderRadius: "5px" }}
              id="gender"
              className="bg border text-gray-400 border-gray-200 font-extralight f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                value={Data.type}
                onChange={(e) =>
                  setApiFormData({ ...ApiFormData, ["type"]: e.target.value })
                }
              >
                {Data.type === 1
                  ? "Pvt Car"
                  : Data.type === 2
                    ? "GCV"
                    : "Health"}
              </option>

              {Data.type === 1 ? (
                <>
                  <option className="text-gray-400 font-extralight" value={2}>
                    GCV
                  </option>
                  <option className="text-gray-400 font-extralight" value={3}>
                    Health
                  </option>
                </>
              ) : Data.type === 2 ? (
                <>
                  <option className="text-gray-400 font-extralight" value={1}>
                    Pvt Car
                  </option>
                  <option className="text-gray-400 font-extralight" value={3}>
                    Health
                  </option>
                </>
              ) : (
                <>
                  <option className="text-gray-400 font-extralight" value={1}>
                    Pvt Car
                  </option>
                  <option className="text-gray-400 font-extralight" value={2}>
                    GCV
                  </option>
                </>
              )}
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f01">Sub-Model</p>
            <input
              style={{
                borderRadius: "5px",
                width: "100%",
                border: "1px solid red",
              }}
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["sub_model"]: e.target.value,
                })
              }
              placeholder="Enter Sub-Model"
              defaultValue={Data.sub_model}
              className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f01">NCB</p>
            <select
              style={{ borderRadius: "5px", border: "1px solid red" }}
              id="gender"
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["NCB"]: e.target.value })
              }
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                value={Data.NCB}
              >
                {Data.NCB}
              </option>
              <option className="text-gray-400 font-extralight" value={0}>
                0
              </option>
              <option className="text-gray-400 font-extralight" value={20}>
                20
              </option>
              <option className="text-gray-400 font-extralight" value={25}>
                25
              </option>
              <option className="text-gray-400 font-extralight" value={35}>
                35
              </option>
              <option className="text-gray-400 font-extralight" value={45}>
                45
              </option>
              <option className="text-gray-400 font-extralight" value={50}>
                50
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f01">Previous Insurance</p>
            <select
              style={{ borderRadius: "5px", border: "1px solid red" }}
              id="gender"
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["previous_insurance"]: e.target.value,
                })
              }
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                value={Data.previous_insurance}
              >
                {Data.previous_insurance}
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Acko General Insurance Limited"
              >
                Acko General Insurance Limited
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Bajaj Allianz General Insurance Co Ltd"
              >
                Bajaj Allianz General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Bharti AXA General Insurance Co Ltd"
              >
                Bharti AXA General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Cholamandalam MS General Insurance"
              >
                Cholamandalam MS General Insurance
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="ZUNO General Insurance Co Ltd"
              >
                ZUNO General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Future Generali India Insurance Co Ltd"
              >
                Future Generali India Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Go Digit General Insurance Limited"
              >
                Go Digit General Insurance Limited
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="HDFC Ergo General Insurance Co Ltd"
              >
                HDFC Ergo General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="ICICI Lombard General Insurance Co Ltd"
              >
                ICICI Lombard General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="IFFCO-Tokio General Insurance Co Ltd"
              >
                IFFCO-Tokio General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Kotak Mahindra General Insurance Co Ltd"
              >
                Kotak Mahindra General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Liberty General Insurance Ltd"
              >
                Liberty General Insurance Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Magma HDI General Insurance Co Ltd"
              >
                Magma HDI General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Navi General Insurance Ltd"
              >
                Navi General Insurance Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Raheja QBE General Insurance Co Ltd"
              >
                Raheja QBE General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Reliance General Insurance Co Ltd"
              >
                Reliance General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Royal Sundaram General Insurance Co Ltd"
              >
                Royal Sundaram General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="SBI General Insurance Co Ltd"
              >
                SBI General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Shriram General Insurance Co Ltd"
              >
                Shriram General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Tata AIG General Insurance Co Ltd"
              >
                Tata AIG General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Universal Sompo General Insurance Co Ltd"
              >
                Universal Sompo General Insurance Co Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="National Insurance Co. Ltd."
              >
                National Insurance Co. Ltd.
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="The New India Assurance Co. Ltd"
              >
                The New India Assurance Co. Ltd
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="The Oriental Insurance Co. Ltd."
              >
                The Oriental Insurance Co. Ltd.
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="United India Insurance Co. Ltd."
              >
                United India Insurance Co. Ltd.
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 1+6">Registration Date</p>
            <input
              style={{
                borderRadius: "5px",
                width: "100%",
                border: "1px solid red",
              }}
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["Registration_date"]: e.target.value,
                })
              }
              defaultValue={Data.Registration_date}
              placeholder="Enter Vehicle Number"
              className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:1+6"
              type="date"
            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 1+6">IDV</p>
            <input
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["IDV"]: e.target.value })
              }
              style={{
                borderRadius: "5px",
                width: "100%",
                border: "1px solid red",
              }}
              placeholder="Enter IDV Number"
              defaultValue={Data.IDV}
              className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:1+6"
              type="number"
            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">Previous Policy Type</p>
            <select
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["previous_policy_type"]: e.target.value,
                })
              }
              style={{ borderRadius: "5px" }}
              id="gender"
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                value={Data.previous_policy_type}
              >
                {Data.previous_policy_type}
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Comprehensive"
              >
                Comprehensive
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Third Party"
              >
                Third Party
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="No Policy"
              >
                No Policy
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">Address</p>
            <input
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["address"]: e.target.value })
              }
              style={{
                borderRadius: "5px",
                width: "100%",
              }}
              defaultValue={Data.address}
              placeholder="Enter Address"
              className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">RTO</p>
            <input
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["RTO"]: e.target.value })
              }
              style={{
                borderRadius: "5px",
                width: "100%",
                border: "1px solid red",
              }}
              defaultValue={Data.RTO}
              placeholder="Enter RTO"
              className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">Expiry Date</p>
            <input
              style={{
                borderRadius: "5px",
                width: "100%",
              }}
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["expiry_date"]: e.target.value,
                })
              }
              defaultValue={Data.expiry_date}
              placeholder="Enter Expiry Date"
              className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
              type="date"
            />
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">PA Limit</p>
            <select
              style={{ borderRadius: "5px" }}
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["pa_limit"]: e.target.value })
              }
              id="gender"
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                disabled
              >
                Select PA Limit
              </option>
              <option className="text-gray-400 font-extralight" value="100000">
                100000
              </option>
              <option className="text-gray-400 font-extralight" value="200000">
                200000
              </option>
              <option className="text-gray-400 font-extralight" value="300000">
                300000
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">Customer Type</p>
            <select
              style={{ borderRadius: "5px" }}
              onChange={(e) =>
                setApiFormData({
                  ...ApiFormData,
                  ["customer_type"]: e.target.value,
                })
              }
              id="gender"
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                value={Data.customer_type}
              >
                {Data.customer_type}
              </option>
              <option
                className="text-gray-400 font-extralight"
                value="Individual"
              >
                Individual
              </option>
              <option className="text-gray-400 font-extralight" value="Company">
                Company
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">CPA</p>
            <select
              onChange={(e) =>
                setApiFormData({ ...ApiFormData, ["CPA"]: e.target.value })
              }
              style={{ borderRadius: "5px" }}
              id="gender"
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                disabled
              >
                Select CPA
              </option>
              <option className="text-gray-400 font-extralight" value="Yes">
                Yes
              </option>
              <option className="text-gray-400 font-extralight" value="No">
                No
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center my-3 flex-col">
            <p className="text-gray-400 f02">OD Only</p>
            <select
              style={{ borderRadius: "5px" }}
              id="gender"
              className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
              onChange={(e) => setIsOdOnly(e.target.value)}
            >
              <option
                className="text-gray-400 font-extralight"
                selected
                disabled
              >
                Select OD Only
              </option>
              <option className="text-gray-400 font-extralight" value={1}>
                Yes
              </option>
              <option className="text-gray-400 font-extralight" value={0}>
                No
              </option>
            </select>
          </div>

          {IsOdOnly == 1 ? (
            <>
              <div className="flex justify-center items-center my-3 flex-col">
                <p className="text-gray-400 f02">OD Start Date</p>
                <input
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  onChange={(e) =>
                    setApiFormData({
                      ...ApiFormData,
                      ["OD_start_date"]: e.target.value,
                    })
                  }
                  placeholder="Enter OD Start Date"
                  className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
                  type="date"
                />
              </div>
              <div className="flex justify-center items-center my-3 flex-col">
                <p className="text-gray-400 f02">OD End Date</p>
                <input
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  onChange={(e) =>
                    setApiFormData({
                      ...ApiFormData,
                      ["OD_end_date"]: e.target.value,
                    })
                  }
                  placeholder="Enter OD End Date"
                  className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
                  type="date"
                />
              </div>
            </>
          ) : null}
          {ButtonEnabled === false ? (
            <>
              <div className="flex justify-center items-center my-3 flex-col">
                <p className="text-gray-400 f02">Status</p>
                <select
                  style={{ borderRadius: "5px" }}
                  id="gender"
                  className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                  onChange={(e) =>
                    setApiFormData({
                      ...ApiFormData,
                      ["Allocation_Status"]: e.target.value,
                    })
                  }
                >
                  {
                    Data.Allocation_status ?
                      <option
                        className="text-gray-400 font-extralight"
                        selected
                        value={Data.Allocation_status}
                      >
                        {Data.Allocation_status}
                      </option> :
                      <option
                        className="text-gray-400 font-extralight"
                        selected
                        disabled
                      >
                        Select Status
                      </option>
                  }
                  <option
                    className="text-gray-400 font-extralight"
                    value="CallBack"
                  >
                    CallBack
                  </option>
                  <option
                    className="text-gray-400 font-extralight"
                    value="Lost"
                  >
                    Lost
                  </option>
                  <option
                    className="text-gray-400 font-extralight"
                    value="Quote Send"
                  >
                    Quote Send
                  </option>
                  <option
                    className="text-gray-400 font-extralight"
                    value="Yet To Contact"
                  >
                    Yet To Contact
                  </option>
                </select>
              </div>
              <div className="flex justify-center items-center my-3 flex-col">
                <p className="text-gray-400 f02">Sub Status</p>
                <select
                  style={{ borderRadius: "5px" }}
                  id="gender"
                  className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                  onChange={(e) =>
                    setApiFormData({
                      ...ApiFormData,
                      ["Allocation_SubStatus"]: e.target.value,
                    })
                  }
                >
                  {
                    Data.Allocation_Sub_Sub_Status ?
                      <option
                        className="text-gray-400 font-extralight"
                        selected
                        value={Data.Allocation_Sub_Sub_Status}
                      >
                        {Data.Allocation_Sub_Sub_Status}
                      </option> :
                      <option
                        className="text-gray-400 font-extralight"
                        selected
                        disabled
                      >
                        Select Status
                      </option>
                  }
                  {ApiFormData.Allocation_Status == "CallBack" ? (
                    <>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Busy"
                      >
                        Busy
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Driving"
                      >
                        Driving
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="In Meeting"
                      >
                        In Meeting
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Out of Station"
                      >
                        Out of Station
                      </option>
                    </>
                  ) : ApiFormData.Allocation_Status == "Lost" ? (
                    <>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Not Interested"
                      >
                        Not Interested
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Dealer Issues"
                      >
                        Dealer Issues
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Does Not Exist"
                      >
                        Does Not Exist
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Not Reachable for Long Time"
                      >
                        Not Reachable for Long Time
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="High Premium"
                      >
                        High Premium
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Vehicle Sold"
                      >
                        Vehicle Sold
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Wrong Number"
                      >
                        Wrong Number
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Own agent"
                      >
                        Own agent
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Already Renewed"
                      >
                        Already Renewed
                      </option>
                    </>
                  ) : ApiFormData.Allocation_Status == "Yet To Contact" ? (
                    <>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Not Reachable"
                      >
                        Not Reachable
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Ringing"
                      >
                        Ringing
                      </option>
                      <option
                        className="text-gray-400 font-extralight"
                        value="Switched Off"
                      >
                        Switched Off
                      </option>
                    </>
                  ) : (
                    <option
                      className="text-gray-400 font-extralight"
                      value="Done"
                    >
                      Done
                    </option>
                  )
                  }
                </select>
              </div>
              <div className="flex justify-center items-center my-3 flex-col">
                <p className="text-gray-400 f02">Remarks</p>
                <input
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  defaultValue={Data.Allocation_Remarks}
                  onChange={(e) =>
                    setApiFormData({
                      ...ApiFormData,
                      ["Allocation_remark"]: e.target.value,
                    })
                  }
                  placeholder="Enter Remarks"
                  className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
                  type="text"
                />
              </div>
            </>
          ) : null}
        </div>
        {ButtonEnabled === false ? (
          <div className="mt-6 mb-8 flex justify-center items-center gap-5">
            <CustomButton
              type={1}
              Onclick={handleOnSave}
              Title="Save"
              BgColor="#2ab86a"
            />
            {ApiFormData.Allocation_Status == "Lost" ? null : (
              <CustomButton
                type={1}
                Onclick={handleOnGanerateQuote}
                Title="Ganerate Quote"
                BgColor="#2ab86a"
              />
            )}
          </div>
        ) : (
          <>
            <div
              className="mt-9 rounded-2xl w-full mb-2"
              style={{ height: "auto" }}
            >
              <div className="px-5 w-full">
                <Input
                  placeholder="Search Insurer Name Here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  suffix={<SearchOutlined />}
                  className="px-5 py-1 f03 font-semibold"
                />
              </div>
              <div className="h-[230px] overflow-y-scroll">
                {filteredData &&
                  filteredData.map((el, index) => {
                    const quote_id = el.id;
                    const dataIndex = QuoteIdsRef.current.indexOf(quote_id);
                    return (
                      <div className="bg-white rounded-2xl p-3 mb-2" key={index}>
                        <div className="mb-2">
                          <input
                            type="checkbox"
                            value={el.id}
                            onChange={handleSelectCheckbox}
                            className="float-right mr-5"
                            style={{ width: "20px", height: "20px" }}
                            checked={QuoteIdsRef.current.includes(el.id) ? true : false}
                            readOnly
                          />
                          <div className="grid grid-cols-3 mt-5 mx-5">
                            <div
                              className=" grid items-center"
                              style={{ gridTemplateColumns: "27% auto" }} >
                              <img src={MediaBase_Url + el.image} width="60px" />
                              <div className="flex justify-center flex-col items-center text-sm">
                                <p className="font-semibold">{el.title}</p>
                              </div>
                            </div>
                            <div className="flex justify-center flex-col items-center f02">
                              <p className="text-gray-400">Net Premium</p>
                              <Input placeholder="Enter Net Discount" name="net_premium" type="number"
                                onChange={(e) => handleOnChange(dataIndex, e, el.id)}
                              />
                            </div>
                            <div className="flex justify-center flex-col items-center  f02">
                              <p className="text-gray-400 ">Gross Premium</p>
                              <p>
                                <Input placeholder="Enter Gross Premium" type="number" name="gross_premium" onChange={(e) => handleOnChange(dataIndex, e, el.id)}
                                />
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 mt-5 mx-5">
                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                              <p className="text-gray-500 f02">
                                OD Rate
                              </p>
                              <p className="text-gray-600 f02 font-semibold">
                                <Input placeholder="Enter OD Rate" type="number" onChange={(e) => handleOnChange(dataIndex, e, el.id)} name="od_rate" />
                              </p>
                            </div>
                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                              <p className="text-gray-500 f02">
                                ADDON Rate
                              </p>
                              <p className="text-gray-600 f02 font-semibold">
                                <Input placeholder="Enter ADDON Rate" type="number" onChange={(e) => handleOnChange(dataIndex, e, el.id)} name="addon_rate" />
                              </p>
                            </div>
                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                              <p className="text-gray-500 f02">
                                TP Rate
                              </p>
                              <p className="text-gray-600 f02 font-semibold">
                                <Input placeholder="Enter TP Rate" type="number" onChange={(e) => handleOnChange(dataIndex, e, el.id)} name="tp_rate" />
                              </p>
                            </div>
                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center ">
                              <p className="text-gray-500 f02">
                                Tariff Discount %
                              </p>
                              <p className="text-gray-600 f02 font-semibold">
                                <Input placeholder="Enter Tariff Discount" type="number" onChange={(e) => handleOnChange(dataIndex, e, el.id)} name="tariif_descount" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="grid grid-cols-3 mt-1 mx-3 gap-5 mb-5">
                <div className="flex justify-center items-center my-3 flex-col">
                  <p className="text-gray-400 f02">Status</p>
                  <select
                    style={{ borderRadius: "5px" }}
                    id="gender"
                    className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                    onChange={(e) =>
                      setApiFormData({
                        ...ApiFormData,
                        ["Allocation_Status"]: e.target.value,
                      })
                    }
                  >
                    <option
                      className="text-gray-400 font-extralight"
                      selected
                      disabled
                    >
                      Select Status
                    </option>
                    <option
                      className="text-gray-400 font-extralight"
                      value="CallBack"
                    >
                      CallBack
                    </option>
                    <option
                      className="text-gray-400 font-extralight"
                      value="Lost"
                    >
                      Lost
                    </option>
                    <option
                      className="text-gray-400 font-extralight"
                      value="Quote Send"
                    >
                      Quote Send
                    </option>
                    <option
                      className="text-gray-400 font-extralight"
                      value="Yet To Contact"
                    >
                      Yet To Contact
                    </option>
                  </select>
                </div>
                <div className="flex justify-center items-center my-3 flex-col">
                  <p className="text-gray-400 f02">Sub Status</p>
                  <select
                    style={{ borderRadius: "5px" }}
                    id="gender"
                    className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                    onChange={(e) =>
                      setApiFormData({
                        ...ApiFormData,
                        ["Allocation_SubStatus"]: e.target.value,
                      })
                    }
                  >
                    <option
                      className="text-gray-400 font-extralight"
                      selected
                      disabled
                    >
                      Select Status
                    </option>
                    {ApiFormData.Allocation_Status == "CallBack" ? (
                      <>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Busy"
                        >
                          Busy
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Driving"
                        >
                          Driving
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="In Meeting"
                        >
                          In Meeting
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Out of Station"
                        >
                          Out of Station
                        </option>
                      </>
                    ) : ApiFormData.Allocation_Status == "Lost" ? (
                      <>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Not Interested"
                        >
                          Not Interested
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Dealer Issues"
                        >
                          Dealer Issues
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Does Not Exist"
                        >
                          Does Not Exist
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Not Reachable for Long Time"
                        >
                          Not Reachable for Long Time
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="High Premium"
                        >
                          High Premium
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Vehicle Sold"
                        >
                          Vehicle Sold
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Wrong Number"
                        >
                          Wrong Number
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Own agent"
                        >
                          Own agent
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Already Renewed"
                        >
                          Already Renewed
                        </option>
                      </>
                    ) : ApiFormData.Allocation_Status == "Yet To Contact" ? (
                      <>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Not Reachable"
                        >
                          Not Reachable
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Ringing"
                        >
                          Ringing
                        </option>
                        <option
                          className="text-gray-400 font-extralight"
                          value="Switched Off"
                        >
                          Switched Off
                        </option>
                      </>
                    ) : null}
                  </select>
                </div>
                <div className="flex justify-center items-center my-3 flex-col mx-5">
                  <p className="text-gray-400 text-sm ">Reminder Date</p>
                  <input
                    style={{
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    defaultValue={Data.reminder_date}
                    className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                    type="date"
                    onChange={(e) =>
                      setApiFormData({
                        ...ApiFormData,
                        ["reminder_date"]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-center items-center my-3 flex-col mx-5">
                  <p className="text-gray-400 text-sm ">Reminder Time</p>
                  <input
                    type="time"
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                    onChange={(e) =>
                      setApiFormData({
                        ...ApiFormData,
                        ["reminder_time"]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-center items-center my-3 flex-col">
                  <p className="text-gray-400 f02">Remarks</p>
                  <input
                    style={{
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    onChange={(e) =>
                      setApiFormData({
                        ...ApiFormData,
                        ["Allocation_remark"]: e.target.value,
                      })
                    }
                    placeholder="Enter Remarks If Any"
                    className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:f02"
                    type="text"
                  />
                </div>
              </div>
              <div className="mt-3 mb-8 flex justify-center items-center gap-5">
                <CustomButton
                  type={1}
                  Onclick={handleOnSubmit}
                  Title="Save"
                  BgColor="#2ab86a"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AddQuote;
