import React, { useEffect, useState } from 'react'
import CustomButton from './AddProductForm/CustomButton'
import { BsTelephoneForward } from 'react-icons/bs'
import { FaEnvelope } from 'react-icons/fa'
import { useStateContext } from "../../contexts/ContextProvider";
import { Input, TimePicker } from 'antd'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Lost({ Data }) {
    const Token = localStorage.getItem("token");
    const { Base_Url, MediaBase_Url } = useStateContext();
    const [FormData, setFormData] = useState({})
    const navigate = useNavigate();

    return (
        <>
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
                            onChange={(e) => setFormData({ ...FormData, ["Mobile2"]: e.target.value })}
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
                            onChange={(e) => setFormData({ ...FormData, ["alternate_email_id"]: e.target.value })}
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
                            onChange={(e) => setFormData({ ...FormData, ["type"]: e.target.value })}

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
                            onChange={(e) => setFormData({ ...FormData, ["NCB"]: e.target.value })} >
                            <option
                                className="text-gray-400 font-extralight"
                                selected
                                value={Data.NCB} >
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
                        {/* <CustomButton type={1} Onclick={handleOnSubmit} Title="Submit" BgColor="#2ab86a" /> */}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Lost