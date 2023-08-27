import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import { Input, Modal } from "antd";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import { toast } from "react-hot-toast";

function EmployeePayroll() {
    const { id } = useParams();
    const Token = localStorage.getItem("token");

    const { Base_Url } = useStateContext();
    const [Data, setData] = useState([]);
    const [loader, setloader] = useState(false);
    const [FormData, setFormData] = useState({});
    const [BankData, setBankData] = useState({});
    const [EmployeeTimeMonthlyReport, setEmployeeTimeMonthlyReport] = useState([])
    const [EmployeeTime, setEmployeeTime] = useState({})
    const [ShowMonthlyReport, setShowMonthlyReport] = useState(false)
    const d = new Date();
    let month = d.getMonth();

    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${Base_Url}getEployeeByID/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    setData(result.data);
                    setloader(false);
                }
            })
            .catch((error) => console.log("error", error));
    };
    const GetBankData = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${Base_Url}GetEmployeeBankData/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    setBankData(result.Data);
                }
                setloader(false);
            })
            .catch((error) => console.log("error", error));
    };
    const GetEmployeeTime = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            "emp_id": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Base_Url}CalculateEmployeeTime`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setEmployeeTime({ ...EmployeeTime, ["Status"]: result.TimeStatus })
                GetEmployeeMonthSalary();
            })
            .catch(error => console.log('error', error));
    }
    const GetCallHistory = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetEmployeeMonthlyTimeReport/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setEmployeeTimeMonthlyReport(result.Data)
                }
                setloader(false);
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        setloader(true);
        ApiFetch();
        GetEmployeeTime();
        GetCallHistory();

        GetBankData(id)
    }, []);
    const handleOnSubmit = () => {
        setloader(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            type: 1,
            emp_id: Data.id,
            bank_name: FormData.bank_name,
            pan_number: FormData.pan_number,
            account_number: FormData.account_number,
            salary: FormData.salary,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${Base_Url}UpdateAddEmployeeBankDetails`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    toast.success("Data Updated Successfully");
                    GetBankData(id);
                }
            })
            .catch((error) => console.log("error", error));
    };
    const handleOnUpdate = async () => {
        setloader(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            type: 2,
            id: BankData.id,
            emp_id: Data.id,
            bank_name: FormData.bank_name,
            pan_number: FormData.pan_number,
            account_number: FormData.account_number,
            salary: FormData.salary,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(`${Base_Url}UpdateAddEmployeeBankDetails`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    toast.success("Data Updated Successfully");
                    GetBankData(id);

                }
            })
            .catch((error) => console.log("error", error));
    }
    const GetEmployeeMonthSalary = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            "emp_id": id,
            "month": month + 1
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Base_Url}CountEmployeeSalary`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setEmployeeTime({ ...EmployeeTime, ["Salary"]: result.Salary })
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            {loader ? (
                <CustomLoader />
            ) : (
                <div className="m-5 p-5 rounded-2xl bg-slate-200">
                    <Modal footer="" onCancel={() => setShowMonthlyReport(false)} open={ShowMonthlyReport} title="Employee Monthly Report">
                        <div className="flex justify-center  flex-col w-full">
                            {EmployeeTimeMonthlyReport && EmployeeTimeMonthlyReport.map((el, index) => (
                                <div className="bg-slate-200 rounded-lg my-2 w-full py-2 px-5 flex justify-between" key={index}>
                                    <p className="f01 font-semibold">Date:&nbsp;{el.date}</p>
                                    <p className="f01 font-semibold" style={{ color: el.timeStatus === 1 ? "green" : el.timeStatus === 3 ? "blue" : "red" }}>{el.timeStatus === 3 ? "Sunday" : `Total Worked Time: ${el.Time}`}</p>
                                </div>
                            ))
                            }
                        </div>
                    </Modal>
                    <div className="flex flex-col">
                        <div>
                            <Label label="Basic Details" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div>
                                <Label label="EmployeeID" />
                                <Input
                                    readOnly
                                    placeholder="Enter EmployeeID"
                                    type="text"
                                    className="font-semibold"
                                    name="branchName"
                                    value={Data.employee_id}
                                />
                            </div>
                            {/* first name */}
                            <div>
                                <Label label="First Name" />
                                <Input
                                    readOnly
                                    placeholder="Enter First Name"
                                    type="text"
                                    className="font-semibold"
                                    name="branchName"
                                    value={Data.first_name}
                                />
                            </div>
                            {/* Last name */}
                            <div>
                                <Label label="Last Name" />
                                <Input
                                    readOnly
                                    placeholder="Enter Last Name"
                                    type="text"
                                    className="font-semibold"
                                    name="branchName"
                                    value={Data.last_name}
                                />
                            </div>
                            {/* select gender */}

                            <div>
                                <Label label="Gender" />
                                <Input
                                    readOnly
                                    placeholder="Enter Last Name"
                                    className="font-semibold"
                                    type="text"
                                    name="branchName"
                                    value={Data.gender}
                                />
                            </div>

                            {/* DATE OF BIRTH  */}

                            <div>
                                <Label label="Date Of Birth" />
                                <div className="date-picker">
                                    <Input
                                        readOnly
                                        type="date"
                                        name="branchName"
                                        className="font-semibold"
                                        value={Data.date_of_birth}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Email" />
                                <div className="date-picker">
                                    <Input
                                        readOnly
                                        value={Data.email_id}
                                        className="font-semibold"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Mobile No" />
                                <div className="date-picker">
                                    <Input
                                        readOnly
                                        value={Data.official_mobile_no}
                                        className="font-semibold"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Date Of Joining" />
                                <div className="date-picker">
                                    <Input
                                        readOnly
                                        className="font-semibold"
                                        value={Data.date_of_joining}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Bank Name" />
                                <div className="date-picker">

                                    <input
                                        className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                        id="bank_name"
                                        defaultValue={BankData.bank_name}
                                        placeholder="Enter Bank Name"
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["bank_name"]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Pan Card Number" />
                                <div className="date-picker">
                                    <input
                                        className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                        id="pan_number"
                                        placeholder="Enter Pan Card Number"

                                        defaultValue={BankData.pan_number}
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["pan_number"]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Bank Account Number" />
                                <div className="date-picker">

                                    <input
                                        className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                        id="account_number"
                                        placeholder="Enter Bank Account Number"
                                        defaultValue={BankData.account_number}
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["account_number"]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Monthly Salary" />
                                <div className="date-picker">
                                    <input
                                        className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                        id="salary"
                                        defaultValue={BankData.salary}
                                        placeholder="Enter Monthly Salary"
                                        onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["salary"]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Total Salary Till Now" />
                                <div className="date-picker">
                                    <input
                                        className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded-md  py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 f01"
                                        id="salary"
                                        defaultValue={EmployeeTime.Salary}
                                        placeholder="Enter Monthly Salary"
                                    />
                                </div>
                            </div>
                            <div>
                                <p onClick={() => setShowMonthlyReport(true)} className="text-sm font-semibold cursor-pointer mt-[1.6rem]" >Click Here To View Monthly</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-6 mb-3">
                            {Object.keys(BankData).length === 0 ? (
                                <CustomButton
                                    Title="Submit"
                                    type={1}
                                    Onclick={handleOnSubmit}
                                />
                            ) : (
                                <CustomButton
                                    Title="Update"
                                    type={1}
                                    Onclick={handleOnUpdate}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EmployeePayroll;
