import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import DisabledInput from "../components/DisabledInput";
import CustomLoader from "../components/CustomLoader";
function PayRoll() {
    const UserData = JSON.parse(localStorage.getItem("data"));
    const [EmployeePrevoiusSalary, setEmployeePrevoiusSalary] = useState([])
    const [BankData, setBankData] = useState([])
    const { Base_Url } = useStateContext();
    const [loader, setLoader] = useState(false)
    const [Data, setData] = useState({})
    const Token = localStorage.getItem("token");
    const [MonthlyData, setMonthlyData] = useState({ TotalTime: "", Data: [] })
    const d = new Date();
    let month = d.getMonth();
    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}get/Employee/${UserData.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setData(result.Data)
                    setLoader(false)
                }
            })
            .catch(error => console.log('error', error));
    }
    const GetBankData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${Base_Url}GetEmployeeBankData/${UserData.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    setBankData(result.Data);
                    setLoader(false)
                }
            })
            .catch((error) => console.log("error", error));
    };
    const GetEmployeeMonthly = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            "emp_id": UserData.id,
            "month": month + 1
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Base_Url}CalculateEmployeeTotalTimeForEmployee`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setMonthlyData({ ...MonthlyData, ["TotalTime"]: result.TotalTime, ["Data"]: result.Monthly })
                    setLoader(false)
                }
            })
            .catch(error => console.log('error', error));
    }
    const onChnageGetEmployeeMonthly = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            "emp_id": UserData.id,
            "month": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Base_Url}CalculateEmployeeTotalTimeForEmployee`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setMonthlyData({ ...MonthlyData, ["TotalTime"]: result.TotalTime, ["Data"]: result.Monthly })
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        setLoader(true)
        ApiFetch()
        CalculateEmployeeSalary()
        GetBankData()
        GetEmployeeMonthly()
    }, []);
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const CalculateEmployeeSalary = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        formdata.append("emp_id", UserData.id);
        formdata.append("month[]", (month - 2 + 12) % 12 || 12);
        formdata.append("month[]", (month - 1 + 12) % 12 || 12);
        formdata.append("month[]", (month + 12) % 12 || 12);
        formdata.append("month[]", month + 1);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${Base_Url}PrevCountEmployeeSalary`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setEmployeePrevoiusSalary(result.Data)
                    setLoader(false)
                }
            })
            .catch(error => console.log('error', error));
    }



    return (
        <>
            {loader ? <CustomLoader /> :
                <div style={{ height: "93vh", overflowY: "scroll" }}>
                    <div className="p-5 mx-5 mb-3  rounded-2xl bg-slate-200">
                        <div className="flex flex-col gap-5">
                            <div>
                                <div className="grid grid-cols-4 gap-5 mt-5">
                                    <div>
                                        <Label label="First Name" />
                                        <DisabledInput
                                            placeholder="Enter First Name"
                                            value={Data.first_name}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Last Name" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.last_name}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Gender" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.gender}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Date Of Join" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.date_of_joining}
                                        />
                                    </div>

                                    <div>
                                        <Label label="Employee ID" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.employee_id}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Permanent Address1" />
                                        <DisabledInput
                                            placeholder="Permanent Address1"
                                            value={Data.permanent_address1}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Bank Name" />
                                        <div className="date-picker">

                                            <input
                                                className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white font-semibold focus:border-blue-500 f01"
                                                id="bank_name"
                                                defaultValue={BankData.bank_name}
                                                placeholder="Enter Bank Name"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label label="Pan Card Number" />
                                        <div className="date-picker">
                                            <input
                                                className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white font-semibold focus:border-blue-500 f01"
                                                id="pan_number"
                                                placeholder="Enter Pan Card Number"

                                                defaultValue={BankData.pan_number}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label label="Bank Account Number" />
                                        <div className="date-picker">

                                            <input
                                                className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 font-semibold rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                                id="account_number"
                                                placeholder="Enter Bank Account Number"
                                                defaultValue={BankData.account_number}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label label="Monthly Salary" />
                                        <div className="date-picker">
                                            <input
                                                className="w-full font-semibold appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                                id="salary"
                                                readOnly
                                                defaultValue={BankData.salary}
                                                placeholder="Enter Monthly Salary"

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid mx-5 p-5 rounded-2xl bg-slate-200" style={{ gridTemplateColumns: "30% auto" }}>
                        <div className="bg-white overflow-y-scroll mr-2 rounded-xl" style={{ height: "55vh" }}>
                            <p className="text-center f03 mt-3">Salary Details</p>
                            <div className="grid grid-cols-3 gap-5 mt-3">
                                <p className="f01 font-semibold text-center">Month</p>
                                <p className="f01 font-semibold text-center">Salary</p>
                                <p className="f01 font-semibold text-center">Credited</p>
                            </div>
                            {EmployeePrevoiusSalary && EmployeePrevoiusSalary.map((mo, index) => {
                                return (
                                    <div className="grid grid-cols-3 gap-5 mb-2 " key={index}>
                                        <p className="f01 text-center">{mo.Month}</p>
                                        <p className="f01 text-center">{BankData.salary}</p>
                                        <p className="f01 text-center">{mo.Number}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="bg-white rounded-xl">
                            <div className="mx-10 mt-4">
                                <select
                                    style={{ borderRadius: "5px" }}
                                    id="countries"
                                    className="bg border text-black border-gray-200 rounded  focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight f01" onChange={(e) => {
                                        onChnageGetEmployeeMonthly(e.target.value)
                                    }}>
                                    <option className="font-bold" value={(month - 2 + 12) % 12 || 12}>
                                        {months[month - 3]}
                                    </option>
                                    <option className="font-bold" value={(month - 1 + 12) % 12 || 12}>
                                        {months[month - 2]}
                                    </option>
                                    <option className="font-bold" value={(month + 12) % 12 || 12}>
                                        {months[month - 1]}
                                    </option>
                                    <option selected className="font-bold" value={month + 1}>
                                        {months[month]}
                                    </option>
                                </select>
                            </div>
                            <div className="mt-5 mx-10" style={{ height: "355px", overflowY: 'scroll' }}>
                                <div class="relative overflow-x-auto ">
                                    <table class="w-full text-sm text-left text-gray-500">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 border-r-1">
                                                    Date
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Worked Time
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MonthlyData && MonthlyData.Data.map((el, index) => {
                                                return (
                                                    <tr key={index} class="bg-white border-b ">
                                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r-1">{el.date}</th>
                                                        <td class="px-6 py-4" style={{ color: el.timeStatus === 2 ? "red" : el.timeStatus === 3 ? "blue" : "green" }}>{el.timeStatus === 3 ? "SunDay" : el.Time}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PayRoll
