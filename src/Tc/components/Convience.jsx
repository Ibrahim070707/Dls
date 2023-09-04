import React, { useEffect, useState } from 'react'
import CustomButton from './AddProductForm/CustomButton'
import { BsTelephoneForward } from 'react-icons/bs'
import { FaEnvelope } from 'react-icons/fa'
import { useStateContext } from "../../contexts/ContextProvider";
import { Input, TimePicker } from 'antd'
import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import CustomLoader from './CustomLoader';

function Convience({ Data, RemindersFunction }) {
    const Token = localStorage.getItem("token");
    const { Base_Url, MediaBase_Url } = useStateContext();
    const [FormData, setFormData] = useState({})
    const [Status, setStatus] = useState("")
    const [SubStatus, setSubStatus] = useState("")
    const [loader, setloader] = useState(false)
    const navigate = useNavigate();
    const UserData = JSON.parse(localStorage.getItem("data"));
    const handleOnSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            "case_id": Data.id,
            "emp_id": UserData.id,
            "sub_status": Status,
            "status": SubStatus,
            "remark": FormData.remark,
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
                    toast.error("Reminder Time Is Required");
                }
            } else {
                toast.error("Reminder Date Is Required");
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
    }, [])
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
                            <input
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                                onChange={(e) => setFormData({ ...FormData, Mobile2: e.target.value })}
                                defaultValue={Data.Mobile2}
                                placeholder="Enter Mobile 2"
                                className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                type="number"
                                maxLength={10}
                            />
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">Alternate Email</p>
                            <input
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                                onChange={(e) => setFormData({ ...FormData, alternate_email_id: e.target.value })}
                                defaultValue={Data.alternate_email_id}
                                placeholder="Enter Alternate Email ID"
                                className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm"
                                type="email"
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
                                onChange={(e) => setFormData({ ...FormData, type: e.target.value })}

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
                                defaultValue={Data.sub_model}
                                onChange={(e) => setFormData({ ...FormData, sub_model: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, NCB: e.target.value })}

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
                            <input
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    border: "1px solid red",
                                }}
                                onChange={(e) => setFormData({ ...FormData, previous_insurance: e.target.value })}
                                defaultValue={Data.previous_insurance}
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
                                defaultValue={Data.Registration_date}
                                onChange={(e) => setFormData({ ...FormData, Registration_date: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, IDV: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, previous_policy_type: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, address: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, RTO: e.target.value })}

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
                                onChange={(e) => setFormData({ ...FormData, expiry_date: e.target.value })}

                            />
                        </div>
                        <div className="flex justify-center items-center my-3 flex-col">
                            <p className="text-gray-400 text-sm ">PA Limit</p>
                            <select
                                style={{ borderRadius: "5px" }}
                                id="gender"
                                className="bg border text-gray-400 border-gray-200 font-extralight text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                onChange={(e) => setFormData({ ...FormData, pa_limit: e.target.value })}
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
                                onChange={(e) => setFormData({ ...FormData, customer_type: e.target.value })}
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
                                onChange={(e) => setFormData({ ...FormData, CPA: e.target.value })}

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
                                onChange={(e) => setStatus(e.target.value)}
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
                                    value="4"
                                >
                                    Appointment
                                </option>
                                <option
                                    className="text-gray-400 font-extralight"
                                    value="6"
                                >
                                    Lost
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
                                <option
                                    className="text-gray-400 font-extralight"
                                    selected
                                    disabled
                                >
                                    Select Status
                                </option>
                                <option
                                    className="text-gray-400 font-extralight"
                                    value={2}
                                >
                                    CallBack
                                </option>
                                <option
                                    className="text-gray-400 font-extralight"
                                    value={1}
                                >
                                    Connect
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
                                defaultValue={Data.reminder_date}
                                className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                                type="date"
                                onChange={(e) => setFormData({ ...FormData, reminder_date: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-center items-center my-3 flex-col mx-5'>
                            <p className="text-gray-400 text-sm ">Reminder Time</p>
                            <TimePicker
                                style={{ height: "30px", marginBottom: "13px" }}
                                required
                                use12Hours
                                defaultValue={Data.reminder_time}
                                onChange={(time) => {
                                    const formattedTime = new Date(time).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                    });
                                    setFormData({ ...FormData, reminder_time: formattedTime })

                                }}
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
                            onChange={(e) => setFormData({ ...FormData, remark: e.target.value })}

                            placeholder="Enter Remarks If Any"
                            className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm "
                        ></textarea>
                    </div>
                    <div className="mt-9 rounded-2xl w-full mb-2" style={{ height: "auto" }}>
                        {Data.Quotesdata && Data.Quotesdata.map((ol, index) => {
                            return (
                                <div className=' rounded-2xl p-3 mb-4' key={index}>
                                    <div className='mb-2'>
                                        <div className="grid grid-cols-3 mt-5 mx-5">
                                            <div className='border-r-2 grid items-center' style={{ gridTemplateColumns: "27% auto" }}>
                                                <img src={MediaBase_Url + ol.image} width="60px" />
                                                <div className='flex justify-center flex-col items-center text-sm'>
                                                    <p className='font-semibold'>{ol.title}</p>
                                                    <p className='text-sm text-center'>IDV:₹{ol.IDV}(min value:{ol.min_value}-max value:{ol.max_value})</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center flex-col items-center border-r-2' >
                                                <p className='text-gray-400'>Tariff Discount</p>
                                                <p>{ol.tariff_discount}</p>
                                            </div>
                                            <div className='flex justify-center flex-col items-center '>
                                                <p className='text-gray-400'>Total Premium</p>
                                                <p>{ol.total_premium}</p>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 mt-5 mx-5'>
                                            <div className='bg-gray-100 flex-col px-5 py-4 flex justify-center items-center border-r-2'>
                                                <p className='text-gray-500'>Without Addons Covers</p>
                                                <p className="text-gray-600 font-semibold">₹{ol.without_addon_covers}</p>
                                            </div>
                                            <div className='bg-gray-100 flex-col px-5 py-4 flex justify-center items-center '>
                                                <p className='text-gray-500'>With Addons Covers</p>
                                                <p className="text-gray-600 font-semibold">₹{ol.with_addon_covers}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="mt-6 mb-8 flex justify-center items-center gap-5">
                            <CustomButton type={1} Onclick={() => navigate("/MyTask")} Title="Go Back" BgColor="#2ab86a" />
                            <CustomButton type={1} Onclick={handleOnSubmit} Title="Submit" BgColor="#2ab86a" />
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Convience