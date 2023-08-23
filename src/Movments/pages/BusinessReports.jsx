import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";

function BusinessReports() {
    const Token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(false);
    const UserData = JSON.parse(localStorage.getItem("data"));
    const [QuotesData, setQuotesData] = useState([])
    const { Base_Url } = useStateContext();
    const [ShowBox, setShowBox] = useState(false)
    useEffect(() => {
        setloader(true);
        ApiFetch();
    }, []);
    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetMovmentBranchReport/${UserData.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setdata(result.Data)
                    setloader(false)
                } else {
                    setloader(false)
                }
            })
            .catch(error => console.log('error', error));
    }
    setTimeout(() => {
        setShowBox(true)
    }, 1000);
    const ProductWise = [
        {
            "name": "PVT Car",
            "nop": ShowBox ? data?.Pvt?.Nop : 0,
            "premium": ShowBox ? data?.Pvt?.Premium : 0,
        },
        {
            "name": "Gcv",
            "nop": ShowBox ? data?.Gcv?.Nop : 0,
            "premium": ShowBox ? data?.Gcv?.Premium : 0,
        },
        {
            "name": "Health",
            "nop": ShowBox ? data?.Health?.Nop : 0,
            "premium": ShowBox ? data?.Health.Premium : 0,
        },
        {
            "name": "Total",
            "nop": ShowBox ? data?.Total?.Nop : 0,
            "premium": ShowBox ? data?.Total.Premium : 0,
        },
    ];
    const url = `https://myfiinbox.com/Rest/gbZc1bkumA/laravel8/public/api/DownloadMovmentsDataById/${UserData.id}`;
    return (
        <>
            {loader === true ? (
                <CustomLoader />
            ) : (
                <div>
                    <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                        <div className="bg-white rounded-lg py-2">
                            <p className="text-center font-bold mt-2">Product Wise</p>
                            <div className="grid grid-cols-3 text-center mt-2">
                                <p className="text-sm font-semibold">Product</p>
                                <p className="text-sm font-semibold">No. Of Policy</p>
                                <p className="text-sm font-semibold">Total Premium</p>
                            </div>
                            {ProductWise && ProductWise.map((el, index) => {
                                return (
                                    <div className="grid grid-cols-3 text-center mt-1 mb-3" key={index}>
                                        <p className="f01">{el.name}</p>
                                        <p className="f01">{el.nop}</p>
                                        <p className="f01">₹{el.premium}/-</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="text-sm mt-5 text-blue-500 font-semibold flex justify-start items-center gap-1 ">
                            <a className="inline-flex cursor-pointer gap-2 items-center" href={url} >Download Business Report <FaArrowDown /> </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BusinessReports