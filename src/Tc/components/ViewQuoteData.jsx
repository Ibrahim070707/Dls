import React, { useEffect, useState } from 'react'
import CustomButton from './AddProductForm/CustomButton'
import { BsTelephoneForward } from 'react-icons/bs'
import { FaEnvelope } from 'react-icons/fa'
import { useStateContext } from "../../contexts/ContextProvider";
import { TimePicker } from 'antd'
import { Input } from 'antd'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CustomLoader from './CustomLoader';


function ViewQuoteData({ Data, RemindersFunction }) {
    console.log("Data", Data);
    const Token = localStorage.getItem("token");
    const { Base_Url, MediaBase_Url } = useStateContext();
    const [SelectedQuote, setSelectedQuote] = useState("")
    const [FormData, setFormData] = useState({})
    const [loader, setloader] = useState(false)
    const [Status, setStatus] = useState("")
    const [SubStatus, setSubStatus] = useState("")
    const navigate = useNavigate();
    const UserData = JSON.parse(localStorage.getItem("data"));
    const handleOnSubmit = () => {
        if (Data.Quotesdata.lenght > 1) {
            if (SelectedQuote) {
                var myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${Token}`);

                var raw = JSON.stringify({
                    "case_id": Data.id,
                    "emp_id": UserData.id,
                    "sub_status": Status == "CONVINCE" ? 4 : Status == "QUOTE But Lost" ? 6 : null,
                    "status": Status,
                    "Sub_Sub_Status": SubStatus,
                    "Mobile2": FormData.Mobile2,
                    "alternate_email_id": FormData.alternate_email_id,
                    "type": FormData.type,
                    "sub_model": FormData.sub_model,
                    "NCB": FormData.NCB,
                    "previous_insurance": FormData.previous_insurance,
                    "Registration_date": FormData.Registration_date,
                    "IDV": FormData.IDV,
                    "previous_policy_type": FormData.previous_policy_type,
                    "address": FormData.address,
                    "RTO": FormData.RTO,
                    "expiry_date": FormData.expiry_date,
                    "pa_limit": FormData.pa_limit,
                    "customer_type": FormData.customer_type,
                    "CPA": FormData.CPA,
                    "reminder_date": FormData.reminder_date,
                    "reminder_time": FormData.reminder_time,
                    "remark": FormData.remark,
                    "quote_id": SelectedQuote,
                });


                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                if (Status) {
                    setloader(true)

                    fetch(`${Base_Url}ChangeCaseStatus`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result.Status === 200) {
                                AddReminder()
                                toast.success("Data Updated Successfully")
                                navigate("/MyTask")
                                RemindersFunction()
                            }
                            setloader(false)
                        })
                        .catch(error => console.log('error', error));
                } else {
                    if (FormData.reminder_date) {
                        if (FormData.reminder_time) {
                            setloader(true)
                            fetch(`${Base_Url}ChangeCaseStatus`, requestOptions)
                                .then(response => response.json())
                                .then(result => {
                                    if (result.Status === 200) {
                                        AddReminder()
                                        toast.success("Data Updated Successfully")
                                        navigate("/MyTask")
                                        RemindersFunction()
                                    }
                                    setloader(false)
                                })
                                .catch(error => console.log('error', error));
                        } else {
                            toast.error("Appointment Time Is Required");
                        }
                    } else {
                        toast.error("Appointment Date Is Required");
                    }
                }
            } else {
                toast.error("Please Select One Quote")
            }
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${Token}`);

            var raw = JSON.stringify({
                "case_id": Data.id,
                "emp_id": UserData.id,
                "sub_status": Status == "CONVINCE" ? 4 : Status == "QUOTE But Lost" ? 6 : null,
                "status": Status,
                "Sub_Sub_Status": SubStatus,
                "Mobile2": FormData.Mobile2,
                "alternate_email_id": FormData.alternate_email_id,
                "type": FormData.type,
                "sub_model": FormData.sub_model,
                "NCB": FormData.NCB,
                "previous_insurance": FormData.previous_insurance,
                "Registration_date": FormData.Registration_date,
                "IDV": FormData.IDV,
                "previous_policy_type": FormData.previous_policy_type,
                "address": FormData.address,
                "RTO": FormData.RTO,
                "expiry_date": FormData.expiry_date,
                "pa_limit": FormData.pa_limit,
                "customer_type": FormData.customer_type,
                "CPA": FormData.CPA,
                "reminder_date": FormData.reminder_date,
                "reminder_time": FormData.reminder_time,
                "remark": FormData.remark,
                "quote_id": SelectedQuote,
            });


            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            if (Status) {
                setloader(true)

                fetch(`${Base_Url}ChangeCaseStatus`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.Status === 200) {
                            toast.success("Data Updated Successfully")
                            navigate("/MyTask")
                            RemindersFunction()
                        }
                        setloader(false)
                    })
                    .catch(error => console.log('error', error));
            } else {
                if (FormData.reminder_date) {
                    if (FormData.reminder_time) {
                        setloader(true)
                        fetch(`${Base_Url}ChangeCaseStatus`, requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                if (result.Status === 200) {
                                    toast.success("Data Updated Successfully")
                                    navigate("/MyTask")
                                    RemindersFunction()
                                }
                                setloader(false)
                            })
                            .catch(error => console.log('error', error));
                    } else {
                        toast.error("Appointment Time Is Required");
                    }
                } else {
                    toast.error("Appointment Date Is Required");
                }
            }
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setFormData({
                ...FormData,
                ["Mobile2"]: Data.Mobile2,
                ["alternate_email_id"]: Data.alternate_email_id,
                ["type"]: Data.type,
                ["sub_model"]: Data.sub_model,
                ["NCB"]: Data.NCB,
                ["previous_insurance"]: Data.previous_insurance,
                ["Registration_date"]: Data.Registration_date,
                ["IDV"]: Data.IDV,
                ["previous_policy_type"]: Data.previous_policy_type,
                ["address"]: Data.address,
                ["RTO"]: Data.RTO,
                ["expiry_date"]: Data.expiry_date,
                ["pa_limit"]: Data.pa_limit,
                ["customer_type"]: Data.customer_type,
                ["CPA"]: Data.CPA,
                ["reminder_date"]: Data.reminder_date,
                ["reminder_time"]: Data.reminder_time,
                ["remark"]: Data.remark,
            })
        }, 4000);
        return () => {
            setFormData({})
        }
    }, [])
    const handleSelectCheckbox = (event) => {
        setSelectedQuote(event.target.value);
    };
    const AddReminder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            "case_id": Data.id,
            "emp_id": UserData.id,
            "date": FormData.reminder_date,
            "time": FormData.reminder_time
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

    return (
        <>
            {loader === true ? <CustomLoader /> :
                <div className="bg-white mt-5 rounded-2xl w-full mb-9">
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
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Vehicle Number</p>
                            <p className="f01">{Data.vehicle_no}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Year Of Manufacturing</p>
                            <p className="f01">{Data.year_of_manufacturing}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Make</p>
                            <p className="f01">{Data.make}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Model</p>
                            <p className="f01">{Data.model}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Seating</p>
                            <p className="f01">{Data.seating_capacity}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">CC / GVW</p>
                            <p className="f01">{Data.CC_GVW}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Zone</p>
                            <p className="f01">{Data.zone}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Location</p>
                            <p className="f01">{Data.location}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Expiry date</p>
                            <p className="f01">{Data.expiry_date}</p>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Mobile 2</p>
                            <Input
                                defaultValue={Data.Mobile2}
                                onChange={(e) => setFormData({ ...FormData, ["Mobile2"]: e.target.value })}
                                placeholder="Enter Mobile 2"
                                className='font-semibold'
                                type='number'
                            />
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Alternate Email</p>
                            <Input
                                defaultValue={Data.alternate_email_id}
                                onChange={(e) => setFormData({ ...FormData, ["alternate_email_id"]: e.target.value })}
                                placeholder="Enter Alternate Email"
                                className='font-semibold'
                                type='email'
                            />
                        </div>
                    </div>
                    <p className="mt-8 ml-4 text-gray-400 text-sm">Product Details:</p>
                    <div className="grid grid-cols-4 mt-4 mx-3 gap-5 mb-5">
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Product Type</p>
                            <select
                                style={{ borderRadius: "5px" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, ["type"]: e.target.value })} >
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
                                defaultValue={Data.sub_model}
                                onChange={(e) => setFormData({ ...FormData, ["sub_model"]: e.target.value })}

                                className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                type="text"
                            />
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">NCB</p>
                            <select
                                style={{ borderRadius: "5px", border: "1px solid red" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, ["NCB"]: e.target.value })}

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
                            <p className="text-gray-400 text-sm ">Previous Insurance</p>
                            <select
                                style={{ borderRadius: "5px", border: "1px solid red" }}
                                id="gender"
                                onChange={(e) => setFormData({ ...FormData, ["previous_insurance"]: e.target.value })}
                                className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                            >
                                <option
                                    className="text-gray-400 font-extralight"
                                    selected
                                    value={Data.previous_insurance}
                                >
                                    {Data.previous_insurance}
                                </option>
                                <option className="text-gray-400 font-extralight" value="Acko General Insurance Limited">
                                    Acko General Insurance Limited
                                </option>
                                <option className="text-gray-400 font-extralight" value="Bajaj Allianz General Insurance Co Ltd">
                                    Bajaj Allianz General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Bharti AXA General Insurance Co Ltd">
                                    Bharti AXA General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Cholamandalam MS General Insurance">
                                    Cholamandalam MS General Insurance
                                </option>
                                <option className="text-gray-400 font-extralight" value="ZUNO General Insurance Co Ltd">
                                    ZUNO General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Future Generali India Insurance Co Ltd">
                                    Future Generali India Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Go Digit General Insurance Limited">
                                    Go Digit General Insurance Limited
                                </option>
                                <option className="text-gray-400 font-extralight" value="HDFC Ergo General Insurance Co Ltd">
                                    HDFC Ergo General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="ICICI Lombard General Insurance Co Ltd">
                                    ICICI Lombard General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="IFFCO-Tokio General Insurance Co Ltd">
                                    IFFCO-Tokio General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Kotak Mahindra General Insurance Co Ltd">
                                    Kotak Mahindra General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Liberty General Insurance Ltd">
                                    Liberty General Insurance Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Magma HDI General Insurance Co Ltd">
                                    Magma HDI General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Navi General Insurance Ltd">
                                    Navi General Insurance Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Raheja QBE General Insurance Co Ltd">
                                    Raheja QBE General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Reliance General Insurance Co Ltd">
                                    Reliance General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Royal Sundaram General Insurance Co Ltd">
                                    Royal Sundaram General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="SBI General Insurance Co Ltd">
                                    SBI General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Shriram General Insurance Co Ltd">
                                    Shriram General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Tata AIG General Insurance Co Ltd">
                                    Tata AIG General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="Universal Sompo General Insurance Co Ltd">
                                    Universal Sompo General Insurance Co Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="National Insurance Co. Ltd.">
                                    National Insurance Co. Ltd.
                                </option>
                                <option className="text-gray-400 font-extralight" value="The New India Assurance Co. Ltd">
                                    The New India Assurance Co. Ltd
                                </option>
                                <option className="text-gray-400 font-extralight" value="The Oriental Insurance Co. Ltd.">
                                    The Oriental Insurance Co. Ltd.
                                </option>
                                <option className="text-gray-400 font-extralight" value="United India Insurance Co. Ltd.">
                                    United India Insurance Co. Ltd.
                                </option>
                            </select>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Registration Date</p>
                            <input
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    border: "1px solid red",
                                }}
                                defaultValue={Data.Registration_date}
                                onChange={(e) => setFormData({ ...FormData, ["Registration_date"]: e.target.value })}

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
                                defaultValue={Data.IDV}
                                onChange={(e) => setFormData({ ...FormData, ["IDV"]: e.target.value })}

                                className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                type="number"
                            />
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Previous Policy Type</p>
                            <select
                                style={{ borderRadius: "5px" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, ["previous_policy_type"]: e.target.value })}

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
                            <p className="text-gray-400 text-sm ">Address</p>
                            <input
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                                defaultValue={Data.address}
                                onChange={(e) => setFormData({ ...FormData, ["address"]: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, ["RTO"]: e.target.value })}

                                defaultValue={Data.RTO}
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
                                defaultValue={Data.expiry_date}
                                placeholder="Enter Expiry Date"
                                className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                type="date"
                                onChange={(e) => setFormData({ ...FormData, ["expiry_date"]: e.target.value })}

                            />
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">PA Limit</p>
                            <select
                                style={{ borderRadius: "5px" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, ["pa_limit"]: e.target.value })}
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
                            <select
                                style={{ borderRadius: "5px" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, ["customer_type"]: e.target.value })}
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
                                <option
                                    className="text-gray-400 font-extralight"
                                    value="Company"
                                >
                                    Company
                                </option>
                            </select>
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">CPA</p>
                            <select
                                style={{ borderRadius: "5px" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, ["CPA"]: e.target.value })}

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
                    </div>
                    <div className="mt-9 rounded-2xl w-full mb-2" style={{ height: "auto" }}>
                        {Data.Quotesdata && Data.Quotesdata.map((ol, index) => {
                            return (
                                <div className="bg-white rounded-2xl p-3 mb-2" key={index}>
                                    <div className="mb-2">
                                        {
                                            Data.Quotesdata.lenght === 1 ? "" :
                                                <input type="radio" name='radioinput' value={ol.quote_id} onChange={handleSelectCheckbox} className='float-right mr-5' style={{ width: "23px", height: "22px" }} />
                                        }
                                        <div className="grid grid-cols-3 mt-5 mx-5">
                                            <div
                                                className=" grid items-center"
                                                style={{ gridTemplateColumns: "27% auto" }} >
                                                <img src={MediaBase_Url + ol.QuoteImage} width="60px" />
                                                <div className="flex justify-center flex-col items-center text-sm">
                                                    <p className="font-semibold">{ol.QuoteName}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center flex-col items-center f02">
                                                <p className="text-gray-400">Net Premium</p>
                                                <Input placeholder="Enter Net Discount" name="net_premium" type="number" readOnly value={ol.net_premium} />
                                            </div>
                                            <div className="flex justify-center flex-col items-center  f02">
                                                <p className="text-gray-400 ">Gross Premium</p>
                                                <p>
                                                    <Input placeholder="Enter Gross Premium" type="number" name="gross_premium" readOnly value={ol.gross_premium} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 mt-5 mx-5">
                                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                                                <p className="text-gray-500 f02">
                                                    OD Rate
                                                </p>
                                                <p className="text-gray-600 f02 font-semibold">
                                                    <Input placeholder="Enter OD Rate" type="number" name="od_rate" readOnly value={ol.od_rate} />
                                                </p>
                                            </div>
                                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                                                <p className="text-gray-500 f02">
                                                    ADDON Rate
                                                </p>
                                                <p className="text-gray-600 f02 font-semibold">
                                                    <Input placeholder="Enter ADDON Rate" type="number" name="addon_rate" readOnly value={ol.addon_rate} />
                                                </p>
                                            </div>
                                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2">
                                                <p className="text-gray-500 f02">
                                                    TP Rate
                                                </p>
                                                <p className="text-gray-600 f02 font-semibold">
                                                    <Input placeholder="Enter TP Rate" type="number" name="tp_rate" readOnly value={ol.tp_rate} />
                                                </p>
                                            </div>
                                            <div className="bg-gray-100 flex-col px-5 py-4 flex justify-center items-center ">
                                                <p className="text-gray-500 f02">
                                                    Tariff Discount %
                                                </p>
                                                <p className="text-gray-600 f02 font-semibold">
                                                    <Input placeholder="Enter Tariff Discount" type="number" name="tariif_descount" readOnly value={ol.tariif_descount} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='grid grid-cols-4 gap-5 mx-3'>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Status</p>
                                <select
                                    style={{ borderRadius: "5px" }}
                                    id="gender"
                                    className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                    onChange={(e) => setStatus(e.target.value)}
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
                                    <option
                                        className="text-gray-400 font-extralight"
                                        value="QUOTE Explained"
                                    >
                                        QUOTE Explained
                                    </option>
                                    <option
                                        className="text-gray-400 font-extralight"
                                        value="CONVINCE"
                                    >
                                        CONVINCE
                                    </option>
                                    <option
                                        className="text-gray-400 font-extralight"
                                        value="QUOTE But Lost"
                                    >
                                        QUOTE But Lost
                                    </option>
                                </select>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 f02">Sub Status</p>
                                <select
                                    style={{ borderRadius: "5px" }}
                                    id="gender"
                                    className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                    onChange={(e) => setSubStatus(e.target.value)}
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
                                    {
                                        Status == "CONVINCE" ?
                                            <>
                                                <option
                                                    className="text-gray-400 font-extralight"
                                                    value="Appointment"
                                                >
                                                    Appointment
                                                </option>
                                            </>
                                            : Status == "QUOTE But Lost" ?
                                                <>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Not Reachable"
                                                    >
                                                        Not Reachable
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="No Response"
                                                    >
                                                        No Response
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Ringing"
                                                    >
                                                        Ringing
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Own agent"
                                                    >
                                                        Own agent
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Call Blocked"
                                                    >
                                                        Call Blocked
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Switched Off"
                                                    >
                                                        Switched Off
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Higher Premium"
                                                    >
                                                        Higher Premium
                                                    </option>
                                                    <option
                                                        className="text-gray-400 font-extralight"
                                                        value="Renewed from Other"
                                                    >
                                                        Renewed from Other
                                                    </option>
                                                </>
                                                : <option
                                                    className="text-gray-400 font-extralight"
                                                    value="Followoup">
                                                    Followoup
                                                </option>
                                    }
                                </select>
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">{Status == "QUOTE Explained" ? "Reminder Date" : "Appointment Date"}</p>
                                <input
                                    style={{
                                        borderRadius: "5px",
                                        width: "100%",
                                    }}
                                    defaultValue={Data.reminder_date}
                                    className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                    type="date"

                                    onChange={(e) => setFormData({ ...FormData, ["reminder_date"]: e.target.value })}
                                />
                            </div>
                            <div className='flex justify-center items-center my-3 flex-col'>
                                <p className="text-gray-400 text-sm ">{Status == "QUOTE Explained" ? "Reminder Time" : "Appointment Time"}</p>
                                <input type="time" className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm " onChange={(e) => setFormData({ ...FormData, reminder_time: e.target.value })} />
                            </div>
                            <div className="flex justify-center items-center my-3 flex-col">
                                <p className="text-gray-400 text-sm ">Remarks</p>
                                <input
                                    style={{
                                        borderRadius: "5px",
                                        width: "100%",
                                    }}
                                    defaultValue={Data.Allocation_Remarks}
                                    placeholder='Enter Remarks If Any'
                                    className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                    type="text"
                                    onChange={(e) => setFormData({ ...FormData, ["remark"]: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-6 mb-8 flex justify-center items-center gap-5">
                            <CustomButton type={1} Onclick={() => navigate("/MyTask")} Title="Go Back" BgColor="#2ab86a" />
                            <CustomButton type={1} Onclick={handleOnSubmit} Title="Save" BgColor="#2ab86a" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ViewQuoteData