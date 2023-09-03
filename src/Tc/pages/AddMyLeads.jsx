import React, { useEffect, useState } from "react";
import Input from "../components/AddProductForm/Input";
import Label from "../components/AddProductForm/Label";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/AddProductForm/CustomButton";
import { Toaster, toast } from "react-hot-toast";
import CustomLoader from "../components/CustomLoader";
import Reminders from "../components/Reminders";

const AddMyLeads = () => {
    const [loader, setloader] = useState(false);
    const navigate = useNavigate();
    const [FormData, setFormData] = useState({});
    const { Base_Url } = useStateContext();
    const Token = localStorage.getItem("token");
    const UserData = JSON.parse(localStorage.getItem("data"));

    useEffect(() => {
        setFormData({ ...FormData, ["employee_id"]: UserData.id })
    }, []);

    const handleOnSumbit = (e) => {
        e.preventDefault()
        setloader(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify(FormData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Base_Url}AddLead`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 201) {
                    toast.success("Lead Added Successfully");
                    navigate("/MyLeads")
                } else if (result.Status === 400) {
                    toast.error("Vehicle Number Already Existe");
                    // setTimeout(() => {
                    //     window.location.reload(false)
                    // }, 1000);
                }
            })
            .catch(error => console.log('error', error));
    };
    const Year = [
        {
            id: 2000,
        },
        {
            id: 2001,
        },
        {
            id: 2002,
        },
        {
            id: 2003,
        },
        {
            id: 2004,
        },
        {
            id: 2005,
        },
        {
            id: 2006,
        },
        {
            id: 2007,
        },
        {
            id: 2008,
        },
        {
            id: 2009,
        },
        {
            id: 2010,
        },
        {
            id: 2011,
        },
        {
            id: 2012,
        },
        {
            id: 2013,
        },
        {
            id: 2014,
        },
        {
            id: 2015,
        },
        {
            id: 2016,
        },
        {
            id: 2017,
        },
        {
            id: 2018,
        },
        {
            id: 2019,
        },
        {
            id: 2020,
        },
        {
            id: 2021,
        },
        {
            id: 2022,
        },
        {
            id: 2023,
        },
        {
            id: 2023,
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
            {loader === true ?
                <CustomLoader />
                :
                <div className="m-5 p-5 rounded-2xl bg-slate-200">
                    <div className="flex flex-col gap-5">
                        <form onSubmit={handleOnSumbit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                                <div>
                                    <Label label="Type" />
                                    <select
                                        className="bg-white border text-gray-400 border-gray-200 f01 rounded focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["type"]: e.target.value,
                                            });
                                        }}
                                        placeholder="Select Year"
                                        required
                                    >
                                        <option selected >--Select Product Type--</option>
                                        <option value="1" className="text-black font-bold">
                                            PVT CAR
                                        </option>
                                        <option value="2" className="text-black font-bold">
                                            GCV
                                        </option>
                                        <option value="3" className="text-black font-bold">
                                            HEALTH
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <Label label="Customer Name" />
                                    <Input
                                        placeholder="Enter Customer Name"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["customer_name"]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="Address" />
                                    <Input
                                        placeholder="Enter Address"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["address"]: e.target.value });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="Mobile No" />
                                    <input
                                        style={{ borderRadius: "5px", width: "100%" }}
                                        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black f01"
                                        type="number"
                                        minLength={10}
                                        maxLength={10}
                                        placeholder="Enter Mobile No"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["mobile_no"]: e.target.value,
                                            });
                                        }}

                                    />
                                </div>
                                <div>
                                    <Label label="Email" />
                                    <Input
                                        placeholder="Enter Email"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["email_id"]: e.target.value,
                                            });
                                        }}
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <Label label="Vehicle No" />
                                    <Input

                                        placeholder="Enter Vehicle No"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["vehicle_no"]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="Expiry Date" />
                                    <Input

                                        placeholder="Enter Expiry Date"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["expiry_date"]: e.target.value,
                                            });
                                        }}
                                        type="date"
                                    />
                                </div>
                                <div>
                                    <Label label="Year Of Manufacturing" />
                                    <select
                                        className="bg-white border text-gray-400 border-gray-200 f01 rounded focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["year_of_manufacturing"]: e.target.value,
                                            });
                                        }}
                                        placeholder="Select Year"
                                    >
                                        <option className="text-gray-400 font-bold" disabled selected>
                                            Select Year
                                        </option>
                                        {Year &&
                                            Year.map((el, map) => {
                                                return (
                                                    <option className="text-black font-bold" value={el.id}>
                                                        {el.id}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div>
                                    <Label label="Select Make" />
                                    <select
                                        className="bg-white border text-gray-400 border-gray-200 f01 rounded focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["make"]: e.target.value });

                                        }}

                                        placeholder="Select Make"
                                    >
                                        <option className="text-black font-bold" disabled selected>
                                            Select Make
                                        </option>
                                        <option
                                            value="Maruti Suzuki"
                                            className="text-black font-bold"
                                        >
                                            Maruti Suzuki
                                        </option>
                                        <option value="Hyundai" className="text-black font-bold">
                                            Hyundai
                                        </option>
                                        <option value="Tata Motors" className="text-black font-bold">
                                            Tata Motors
                                        </option>
                                        <option
                                            value="Mahindra & Mahindra"
                                            className="text-black font-bold"
                                        >
                                            Mahindra & Mahindra
                                        </option>
                                        <option value="Kia" className="text-black font-bold">
                                            Kia
                                        </option>
                                        <option value="Toyota" className="text-black font-bold">
                                            Toyota
                                        </option>
                                        <option value="Honda" className="text-black font-bold">
                                            Honda
                                        </option>
                                        <option value="Renault" className="text-black font-bold">
                                            Renault
                                        </option>
                                        <option value="Skoda" className="text-black font-bold">
                                            Skoda
                                        </option>
                                        <option value="MG" className="text-black font-bold">
                                            MG
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <Label label="Model" />
                                    <select

                                        className="bg-white border text-gray-400 border-gray-200 f01 rounded focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["model"]: e.target.value });
                                        }}
                                        placeholder="Select Model"
                                    >
                                        <option className="text-gray-400 font-bold" disabled selected>
                                            Select Model
                                        </option>
                                        <option value="Venue " className="text-black font-bold">
                                            Venue
                                        </option>
                                        <option value="Alcazar " className="text-black font-bold">
                                            Alcazar
                                        </option>
                                        <option value="Ioniq 5" className="text-black font-bold">
                                            Ioniq 5
                                        </option>
                                        <option value="Tucson " className="text-black font-bold">
                                            Tucson
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <Label label="Location" />
                                    <Input

                                        placeholder="Enter Location"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["location"]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="Customer Type" />
                                    <select
                                        className="bg-white border text-gray-400 border-gray-200 f01 rounded focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["customer_type"]: e.target.value });
                                        }}
                                        placeholder="Select Model"
                                    >
                                        <option className="text-gray-400 font-bold" disabled selected>
                                            Select Customer Type
                                        </option>
                                        <option value="Individual" className="text-black font-bold">
                                            Individual
                                        </option>
                                        <option value="Company" className="text-black font-bold">
                                            Company
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <Label label="Previous Insurance" />
                                    <select
                                        id="gender"
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["previous_insurance"]: e.target.value,
                                            })
                                        }
                                        className="bg border text-gray-400 border-gray-200 font-extralight f02rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-1 px-1 mb-3 leading-tight"
                                    >
                                        <option
                                            className="text-gray-400 font-extralight"
                                            selected
                                        >
                                            --Select Insurance --
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
                                <div>
                                    <Label label="NCB" />
                                    <Input
                                        type="number"
                                        placeholder="Enter NCB"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["NCB"]: e.target.value });
                                        }}
                                    />
                                </div>
                                {/* <div>
                                    <Label label="Seating Capacity" />
                                    <Input

                                        placeholder="Enter Seating Capacity"
                                        type="number"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["seating_capacity"]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="CC_GVW" />
                                    <Input

                                        placeholder="Enter CC_GVW"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["CC_GVW"]: e.target.value });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="Zone" />
                                    <Input

                                        placeholder="Enter Zone"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["zone"]: e.target.value });
                                        }}
                                    />
                                </div>
                            
                                <div>
                                    <Label label="IDV" />
                                    <Input

                                        placeholder="Enter IDV"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["IDV"]: e.target.value });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="Registration Date" />
                                    <Input

                                        placeholder="Enter Registration Date"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["Registration_date"]: e.target.value,
                                            });
                                        }}
                                        type="date"
                                    />
                                </div>
                                <div>
                                    <Label label="Previous Policy Type" />
                                    <select
                                        className="bg-white border text-gray-400 border-gray-200 f01 rounded focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["previous_policy_type"]: e.target.value });
                                        }}
                                        placeholder="Select Model"

                                    >
                                        <option className="text-gray-400 font-bold" disabled selected>
                                            Select Previous Policy Type
                                        </option>
                                        <option value="Comprehensive" className="text-black font-bold">
                                            Comprehensive
                                        </option>
                                        <option value="Third Party" className="text-black font-bold">
                                            Third Party
                                        </option>
                                        <option value="No Policy" className="text-black font-bold">
                                            No Policy
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <Label label="Sub Model" />
                                    <Input
                                        placeholder="Enter Sub Model"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["sub_model"]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="RTO" />
                                    <Input

                                        placeholder="Enter RTO"
                                        onChange={(e) => {
                                            setFormData({ ...FormData, ["RTO"]: e.target.value });
                                        }}
                                    />
                                </div>
                            
                               
                            
                                <div>
                                    <Label label="New Policy Type" />
                                    <Input
                                        placeholder="Enter New Policy Type"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["new_policy_type"]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label label="New TP Start Date" />
                                    <Input
                                        placeholder="Enter TP Start Date"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["TP_start_date"]: e.target.value,
                                            });
                                        }}
                                        type="date"
                                    />
                                </div>
                                <div>
                                    <Label label="New TP End Date" />
                                    <Input
                                        placeholder="Enter TP End Date"
                                        onChange={(e) => {
                                            setFormData({
                                                ...FormData,
                                                ["TP_end_date"]: e.target.value,
                                            });
                                        }}
                                        type="date"
                                    />
                                </div> */}
                            </div>
                            <div className="flex mt-5 gap-5 justify-center">
                                <CustomButton
                                    type={1}
                                    Onclick={() => navigate("/MyLeads")}
                                    Title="Go Back"
                                    BgColor="#1677ff"
                                />
                                <CustomButton
                                    Title="Submit"
                                    BgColor="#1677ff"
                                />
                            </div>
                        </form >
                    </div >
                </div >
            }
        </>
    );
};

export default AddMyLeads;
