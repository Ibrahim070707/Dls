import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import { Input, Modal } from "antd";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import { toast } from "react-hot-toast";
// import printJS from 'print-js';

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

        fetch(`${Base_Url}get/Employee/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    setData(result.Data);
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
            basic_salary: FormData.basic_salary,
            house_allowances: FormData.house_allowances,
            conveyance_allowances: FormData.conveyance_allowances,
            medical_allowances: FormData.medical_allowances,
            special_allowances: FormData.special_allowances,
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
            basic_salary: FormData.basic_salary,
            house_allowances: FormData.house_allowances,
            conveyance_allowances: FormData.conveyance_allowances,
            medical_allowances: FormData.medical_allowances,
            special_allowances: FormData.special_allowances,
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
                console.log(result);
                if (result.Status === 200) {
                    setEmployeeTime({ ...EmployeeTime, ["Salary"]: result.Salary, ["FullDays"]: result.FullDays, ["HalfDays"]: result.HalfDays, ["Absent"]: result.Absent, ["workingDays"]: result.workingDays })
                }
            })
            .catch(error => console.log('error', error));
    }

    // const handlePrint = () => {
    //     const contentToPrint = document.getElementById('content-to-print');
    //     const printOptions = {
    //         printable: contentToPrint.innerHTML,
    //         type: 'html',
    //     };
    //     printJS(printOptions);
    // };


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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                            <div>
                                <Label label="EmployeeID" />
                                <Input
                                    readOnly
                                    placeholder="Enter EmployeeID"
                                    type="text"
                                    className="font-semibold"
                                    name="branchName"
                                    value={Data?.employee_id}
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
                                <Label label="Total Salary Till Now" />
                                <div className="date-picker">
                                    <Input
                                        value={EmployeeTime.Salary}
                                        className="font-semibold"
                                        readOnly
                                        placeholder="Enter Monthly Salary"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Total Working Days" />
                                <div className="date-picker">
                                    <Input
                                        className="font-semibold"
                                        id="salary"
                                        value={EmployeeTime.workingDays}
                                        readOnly
                                        placeholder="--"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Full Days" />
                                <div className="date-picker">
                                    <Input
                                        className="font-semibold text-green-600"
                                        id="salary"
                                        value={EmployeeTime.FullDays}
                                        readOnly
                                        placeholder="--"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Half Days" />
                                <div className="date-picker">
                                    <Input
                                        className="font-semibold text-amber-600"
                                        id="salary"
                                        value={EmployeeTime.HalfDays}
                                        readOnly
                                        placeholder="--"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Absent" />
                                <div className="date-picker">
                                    <Input
                                        className="font-semibold text-red-600 "
                                        id="salary"
                                        value={EmployeeTime.Absent}
                                        readOnly
                                        placeholder="--"
                                    />
                                </div>
                            </div>
                            <div>
                                <p onClick={() => setShowMonthlyReport(true)} className="text-sm font-semibold cursor-pointer mt-[1.6rem]" >Click Here To View Monthly</p>
                            </div>
                        </div>
                        <div id="pdf-content" className="bg-white rounded-lg mx-5" >
                            <div className="grid grid-cols-2 mx-5 gap-5">
                                <div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Employee Name</p>
                                        <p className="f02">{Data.first_name + " " + Data.last_name}</p>
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">EmployeeID</p>
                                        <p className="f02">{Data?.employee_id}</p>
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Department</p>
                                        <p className="f02">{Data?.Branch?.employee_id}</p>
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Date Of Joining</p>
                                        <p className="f02">{Data.date_of_joining}</p>
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Gross Salary</p>
                                        <input
                                            className="border f01 px-3 py-1"
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
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Bank Name</p>
                                        <input
                                            className="border f01 px-3 py-1"
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
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Bank A/c No</p>
                                        <input
                                            className="border f01 px-3 py-1"
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
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Pan Card Number</p>
                                        <input
                                            className="border f01 px-3 py-1"
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
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Total Working Days</p>
                                        <p className="f02">{EmployeeTime.workingDays}</p>
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Paid Days</p>
                                        <p className="f02">Half Days({EmployeeTime.HalfDays}) + Full Days({EmployeeTime.FullDays}) = {EmployeeTime.HalfDays + EmployeeTime.FullDays}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[1px] bg-black mx-5" />
                            <div className="grid grid-cols-1 mx-5 gap-5">
                                <div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Basic Salary</p>
                                        <input type="text" value={BankData.basic_salary} placeholder="Enter Basic Salary" className="border f01 px-3 py-1" onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["basic_salary"]: e.target.value,
                                            })
                                        } />

                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">House Rent Allowances</p>
                                        <input type="text" placeholder="Enter House Rent Allowances" className="border f01 px-3 py-1"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...FormData,
                                                    ["house_allowances"]: e.target.value,
                                                })
                                            }
                                            value={BankData.house_allowances}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Conveyance Allowances</p>
                                        <input type="text" onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["conveyance_allowances"]: e.target.value,
                                            })
                                        } placeholder="Enter Conveyance Allowances" className="border f01 px-3 py-1" value={BankData.conveyance_allowances}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Medical Allowances</p>
                                        <input type="text" placeholder="Enter Medical Allowances" className="border f01 px-3 py-1" onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["medical_allowances"]: e.target.value,
                                            })

                                        }
                                            value={BankData.medical_allowances}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Special Allowances</p>
                                        <input type="text" placeholder="Enter Special Allowances" className="border f01 px-3 py-1" onChange={(e) =>
                                            setFormData({
                                                ...FormData,
                                                ["special_allowances"]: e.target.value,
                                            })
                                        }
                                            value={BankData.special_allowances}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Gross Salary</p>
                                        <p className="f02">₹{BankData.salary}/-</p>
                                    </div>
                                    <div className="h-[1px] bg-black " />
                                    <div className="flex justify-between items-center my-2">
                                        <p className="f02">Net Salary:</p>
                                        <p className="f02">₹{BankData.salary}/-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <button onClick={handlePrint}>Print</button> */}
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
