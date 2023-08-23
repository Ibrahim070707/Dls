import React, { useEffect, useState } from 'react'
import { FaTasks } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';

function ViewTc({ EmpID }) {
    const { Base_Url } = useStateContext();
    const Token = localStorage.getItem("token");
    const [DashboardData, setDashboardData] = useState({})
    useEffect(() => {
        ApiFetch()
    }, [])
    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetEmpNopAndPremuimCount/${EmpID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setDashboardData({
                        Pvt: result.data.Pvt,
                        Gcv: result.data.Gcv,
                        Health: result.data.Health,
                        PremuimPvt: result.data.PremuimPvt,
                        PremuimGcv: result.data.PremuimGcv,
                        PremuimHealth: result.data.PremuimHealth,
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <div className="bg-blue-200 text-black rounded-2xl p-5 m-5 shadow ">
                <div className="grid grid-cols-3">
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f03">
                        <p className="font-bold text-center mb-2 text-blue-700">Product Type</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f03">
                        <p className="font-bold text-center mb-2 text-blue-700">No Of Policy</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f03">
                        <p className="font-bold text-center mb-2 text-blue-700">No Of Premium</p>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p className="f01 font-bold text-center mb-2 text-blue-700">Private Car</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.Pvt}</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.PremuimPvt}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p className="f01 font-bold text-center mb-2 text-blue-700">GCV</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.Gcv}</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.PremuimGcv}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p className="f01 font-bold text-center mb-2 text-blue-700">Health</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.Health}</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.PremuimHealth}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p className="f01 font-bold text-center mb-2 text-blue-700">Total</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.Pvt + DashboardData.Gcv + DashboardData.Health}</p>
                    </div>
                    <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                        <p>{DashboardData.PremuimPvt + DashboardData.PremuimGcv + DashboardData.PremuimHealth}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTc
