import React, { useState } from "react";
import { BsTelephoneForward } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import { Input, TimePicker } from "antd";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomButton from "./AddProductForm/CustomButton";
import { toast } from "react-hot-toast";
import CustomLoader from "./CustomLoader";
import { useNavigate } from "react-router-dom";

function ViewQuoteData({ Data }) {
    const { MediaBase_Url } = useStateContext();
    const Token = localStorage.getItem("token");
    const { Base_Url } = useStateContext();
    const [HideContent, setHideContent] = useState(false);
    const [FormData, setFormData] = useState({ case_id: Data.id });
    const [loader, setloader] = useState(false)
    const navigate = useNavigate();
    const handleChangeComponent = () => {
        if (HideContent === true) {
            setHideContent(false);
        } else {
            setHideContent(true);
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault()

        setloader(true)
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify(FormData);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${Base_Url}MoveCaseToFinal`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    toast.success("Case Moved To Final");
                    navigate("/Movements")
                }
                setloader(false)
            })
            .catch((error) => console.log("error", error));
    };

    const calculateRiskEndDate = (startDate) => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(startDate);
        endDateObj.setFullYear(startDateObj.getFullYear() + 1);

        const month = String(endDateObj.getMonth() + 1).padStart(2, "0");
        const day = String(endDateObj.getDate()).padStart(2, "0");
        const year = endDateObj.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const ChangeRiskStart = (startDate) => {
        const endDate = calculateRiskEndDate(startDate);
        setFormData({
            ...FormData,
            ["risk_start_date"]: startDate,
            ["risk_end_date"]: endDate,
        });
    };

    return (
        <>
            {
                loader ?
                    <CustomLoader /> :
                    <div className="bg-white mt-9 rounded-2xl w-full mb-9">
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
                                    {/* <p>{Data.mobile_no}</p> */}-
                                </div>
                                <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
                                    <FaEnvelope />
                                    <p>{Data.email_id}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 mt-10 mx-3 gap-5 mb-10">
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Vehicle Number</p>
                                <p className="f01">{Data.vehicle_no ? Data.vehicle_no : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Year Of Manufacturing</p>
                                <p className="f01">
                                    {Data.year_of_manufacturing ? Data.year_of_manufacturing : "--"}
                                </p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Make</p>
                                <p className="f01">{Data.make ? Data.make : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Model</p>
                                <p className="f01">{Data.model ? Data.model : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Seating</p>
                                <p className="f01">
                                    {Data.seating_capacity ? Data.seating_capacity : "--"}
                                </p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">CC / GVW</p>
                                <p className="f01">{Data.CC_GVW ? Data.CC_GVW : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Zone</p>
                                <p className="f01">{Data.zone ? Data.zone : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Location</p>
                                <p className="f01">{Data.location ? Data.location : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Expiry date</p>
                                <p className="f01">{Data.expiry_date ? Data.expiry_date : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Case Status</p>
                                <p className="f01">{Data.Case_Status ? Data.Case_Status : "--"}</p>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Payment_Details</p>
                                <p className="f01">{Data.Payment_Details ? Data.Payment_Details : "--"}</p>
                            </div>
                        </div>
                        <p
                            className="text-gray-400 right-5 p-4 cursor-pointer absolute"
                            onClick={handleChangeComponent}
                        >
                            {HideContent ? "Show Less" : "Show More"}
                        </p>
                        {HideContent ? (
                            <>
                                <p className="mt-8 ml-4 text-gray-400 text-sm">Product Details:</p>
                                <div className="grid grid-cols-4 mt-4 mx-3 gap-5 mb-5">
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Product Type</p>
                                        <select
                                            style={{ borderRadius: "5px" }}
                                            id="gender"
                                            className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        >
                                            <option
                                                className="text-gray-400 font-extralight"
                                                selected
                                                value={Data.type}
                                            >
                                                {Data.type === 1
                                                    ? "Pvt Car"
                                                    : Data.type === 2
                                                        ? "GCV"
                                                        : "Health"}
                                            </option>

                                            {Data.type === 1 ? (
                                                <>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value={2}
                                                    >
                                                        GCV
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value={3}
                                                    >
                                                        Health
                                                    </option>
                                                </>
                                            ) : Data.type === 2 ? (
                                                <>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value={1}
                                                    >
                                                        Pvt Car
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value={3}
                                                    >
                                                        Health
                                                    </option>
                                                </>
                                            ) : (
                                                <>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value={1}
                                                    >
                                                        Pvt Car
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value={2}
                                                    >
                                                        GCV
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Sub-Model</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            placeholder="Enter Sub-Model"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                            type="text"
                                            value={Data.sub_model}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">NCB</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            placeholder="Enter Sub-Model"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                            type="text"
                                            value={Data.NCB}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Previous Insurance</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            value={Data.previous_insurance}
                                            placeholder="Enter Previous Insurance"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Registration Date</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            value={Data.Registration_date}
                                            placeholder="Enter Vehicle Number"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="date"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">IDV</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            placeholder="Enter IDV Number"
                                            value={Data.IDV}
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Previous Policy Type</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            placeholder="Previous Policy Type"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                            type="text"
                                            value={Data.previous_policy_type}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Address</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                            }}
                                            value={Data.address}
                                            placeholder="Enter Address"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">RTO</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            value={Data.RTO}
                                            placeholder="Enter RTO"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Expiry Date</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                            }}
                                            value={Data.expiry_date}
                                            placeholder="Enter Expiry Date"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="date"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">PA Limit</p>
                                        <select
                                            style={{ borderRadius: "5px" }}
                                            id="gender"
                                            className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        >
                                            <option
                                                className="text-gray-400 font-extralight"
                                                selected
                                                disabled
                                            >
                                                Select PA Limit
                                            </option>
                                            <option
                                                className="text-gray-400 font-extralight"
                                                value="100000"
                                            >
                                                100000
                                            </option>
                                            <option
                                                className="text-gray-400 font-extralight"
                                                value="200000"
                                            >
                                                200000
                                            </option>
                                            <option
                                                className="text-gray-400 font-extralight"
                                                value="300000"
                                            >
                                                300000
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Customer Type</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                border: "1px solid red",
                                            }}
                                            placeholder="Customer Type"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                            type="text"
                                            value={Data.customer_type}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">CPA</p>
                                        <select
                                            style={{ borderRadius: "5px" }}
                                            id="gender"
                                            className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
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
                                        <p className="text-gray-400 text-sm ">OD Only</p>
                                        <select
                                            style={{ borderRadius: "5px" }}
                                            id="gender"
                                            className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        >
                                            <option
                                                className="text-gray-400 font-extralight"
                                                selected
                                                disabled
                                            >
                                                Select OD Only
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
                                        <p className="text-gray-400 text-sm ">OD Expiry Date</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                            }}
                                            placeholder="Enter OD Expiry Date"
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="date"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col">
                                        <p className="text-gray-400 text-sm ">Status</p>
                                        <select
                                            style={{ borderRadius: "5px" }}
                                            id="gender"
                                            className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        >
                                            <option
                                                className="text-gray-400 font-extralight"
                                                selected
                                                disabled
                                            >
                                                Select Status
                                            </option>
                                            <option className="text-gray-400 font-extralight" value="1">
                                                Convience
                                            </option>
                                            <option className="text-gray-400 font-extralight" value="2">
                                                Appointment
                                            </option>
                                            <option className="text-gray-400 font-extralight" value="3">
                                                Convert
                                            </option>
                                            <option className="text-gray-400 font-extralight" value="4">
                                                Lost
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col mx-5">
                                        <p className="text-gray-400 text-sm ">Reminder Date</p>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                            }}
                                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                            type="date"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-3 flex-col mx-5">
                                        <p className="text-gray-400 text-sm ">Reminder Time</p>
                                        <TimePicker
                                            style={{ height: "30px", marginBottom: "13px" }}
                                            required
                                            use12Hours
                                            format="h:mm a"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Remarks</p>
                                    <textarea
                                        style={{
                                            borderRadius: "5px",
                                            width: "100%",
                                        }}
                                        cols="10"
                                        rows="3"
                                        placeholder="Enter Remarks If Any"
                                        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                    ></textarea>
                                </div>
                                <div
                                    className="mt-9 rounded-2xl w-full mb-2"
                                    style={{ height: "auto" }}
                                >
                                    {Data.Quotesdata &&
                                        Data.Quotesdata.map((ol, index) => {
                                            return (
                                                <div className=" rounded-2xl p-3 mb-4" key={index}>
                                                    <div className="mb-2">
                                                        <div className="grid grid-cols-3 mt-5 mx-5">
                                                            <div
                                                                className="border-r-2 grid items-center"
                                                                style={{ gridTemplateColumns: "27% auto" }}
                                                            >
                                                                <img src={MediaBase_Url + ol.image} width="60px" />
                                                                <div className="flex justify-center flex-col items-center text-sm">
                                                                    <p className="font-semibold">{ol.title}</p>
                                                                    <p className="text-sm text-center">
                                                                        IDV:₹{ol.IDV}(min value:{ol.min_value}-max
                                                                        value:{ol.max_value})
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center flex-col items-center border-r-2">
                                                                <p className="text-gray-400">Tariff Discount</p>
                                                                <p>{ol.tariff_discount}</p>
                                                            </div>
                                                            <div className="flex justify-center flex-col items-center ">
                                                                <p className="text-gray-400">Total Premium</p>
                                                                <p>{ol.total_premium}</p>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 mt-5 mx-5">
                                                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                                                                <p className="text-gray-500">
                                                                    Without Addons Covers
                                                                </p>
                                                                <p className="text-gray-600 font-semibold">
                                                                    ₹{ol.without_addon_covers}
                                                                </p>
                                                            </div>
                                                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center ">
                                                                <p className="text-gray-500">With Addons Covers</p>
                                                                <p className="text-gray-600 font-semibold">
                                                                    ₹{ol.with_addon_covers}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <p className="mt-8 ml-4 text-gray-400 text-sm">OSV:</p>
                        <form onSubmit={handleOnSubmit}>

                            <div className="grid grid-cols-4 mt-4 mx-3 gap-5 mb-5">
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Policy Number</p>
                                    <input
                                        style={{
                                            borderRadius: "5px",
                                            width: "100%",
                                        }}
                                        required
                                        onChange={(e) =>
                                            setFormData({ ...FormData, ["policy_number"]: e.target.value })
                                        }
                                        placeholder="Enter Policy Number"
                                        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                        type="text"
                                    />
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Payment Mode</p>
                                    <select
                                        style={{ borderRadius: "5px" }}
                                        id="gender"
                                        required
                                        className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        onChange={(e) =>
                                            setFormData({ ...FormData, ["payment_mode"]: e.target.value })
                                        }
                                    >
                                        <option
                                            className="text-gray-400 font-extralight"
                                            selected
                                            disabled
                                        >
                                            Select Payment Mode
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="Cash">
                                            Cash
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="Online">
                                            Online
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="Check">
                                            Check
                                        </option>
                                    </select>
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">
                                        {FormData.payment_mode === "Check"
                                            ? "Check Recieved Date"
                                            : "Payment Recieved Date"}
                                    </p>
                                    <input
                                        required
                                        style={{
                                            borderRadius: "5px",
                                            width: "100%",
                                        }}
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["payment_received_date"]: e.target.value,
                                            })
                                        }
                                        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                        type="date"
                                    />
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Risk Start Date</p>
                                    <input
                                        required
                                        style={{
                                            borderRadius: "5px",
                                            width: "100%",
                                        }}
                                        onChange={(e) => ChangeRiskStart(e.target.value)}
                                        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                        type="date"
                                    />
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Risk End Date </p>
                                    <input
                                        style={{
                                            borderRadius: "5px",
                                            width: "100%",
                                        }}
                                        readOnly
                                        value={FormData.risk_end_date}
                                        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                        type="text"
                                        placeholder={FormData.risk_end_date}
                                    />
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Payment Recieved Or Not </p>
                                    <select
                                        style={{ borderRadius: "5px" }}
                                        id="gender"
                                        className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        required
                                        onChange={(e) =>
                                            setFormData({ ...FormData, ["payment_status"]: e.target.value })
                                        }
                                    >
                                        <option
                                            className="text-gray-400 font-extralight"
                                            selected
                                            disabled
                                        >
                                            --Select--
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="Yes">
                                            Yes
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="No">
                                            No
                                        </option>
                                    </select>
                                </div>
                                <div className="flex justify-center items-center my-3 flex-col mx-5">
                                    <p className="text-gray-400 text-sm ">Inspection Done </p>
                                    <select
                                        style={{ borderRadius: "5px" }}
                                        id="gender"
                                        required
                                        className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["Inspection_done"]: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            className="text-gray-400 font-extralight"
                                            selected
                                            disabled
                                        >
                                            --Select--
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="Yes">
                                            Yes
                                        </option>
                                        <option className="text-gray-400 font-extralight" value="No">
                                            No
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center items-center my-5">
                                <CustomButton Title="Submit" />
                            </div>
                        </form>
                    </div>
            }
        </>
    );
}

export default ViewQuoteData;
