import React, { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import { Header } from "../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaTasks } from "react-icons/fa";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import { Toaster, toast } from "react-hot-toast";
import Label from "../components/AddProductForm/Label";

function RenderAllocation() {
    const Token = localStorage.getItem("token");
    const UserData = JSON.parse(localStorage.getItem("data"));
    const { Base_Url } = useStateContext();
    const [MakeData, setMakeData] = useState([])
    const [ModelData, setModelData] = useState([])
    const [YearData, setYearData] = useState([])
    const [LocationData, setLocationData] = useState([])
    const [CasesCount, setCasesCount] = useState("---")
    const [TotalCasesToAllocate, setTotalCasesToAllocate] = useState("")
    const [loader, setloader] = useState(false);
    const [CardsData, setCardsData] = useState([])
    const [EmployeesData, SetEmployeesData] = useState([])

    const dataArrayRef = useRef([]);
    const MakeDataRef = useRef([]);
    const ModelDataRef = useRef([]);
    const YearDataRef = useRef([]);
    const LocationRef = useRef([]);
    const EmployeeRef = useRef([]);

    const ApiFetch = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);
        var raw = JSON.stringify({
            "branch_id": UserData.branch_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Base_Url}CountCases/Branch`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setCardsData({
                        CAR_Cases: result.PVT.Total,
                        CAR_Allocated: result.PVT.Allocated,
                        CAR_Nonallocate: result.PVT.UnAllocated,

                        GCV_Cases: result.GCV.Total,
                        GCV_Allocated: result.GCV.Allocated,
                        GCV_Nonallocate: result.GCV.UnAllocated,

                        HEALTH_TotalCases: result.Health.Total,
                        HEALTH_Allocated: result.Health.Allocated,
                        HEALTH_Nonallocate: result.Health.UnAllocated,
                    })
                }
            })
            .catch(error => console.log('error', error));
    };
    const GetEmplyeesData = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        await fetch(`${Base_Url}Get/Employees/ByBranchID/${UserData.branch_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    const filteredData = result.data.filter((el) => el.status === 1);
                    const Empdata = filteredData.map((el) => ({
                        value: el.id,
                        label: el.Reporting_name,
                    }));
                    SetEmployeesData(Empdata);
                }
            })
            .catch((error) => console.log("error", error));
    };
    useEffect(() => {
        GetEmplyeesData();
        ApiFetch();
    }, []);
    const handleTypeChange = async (values) => {
        if (values.includes('all')) {
            dataArrayRef.current = optionsWithSelectAll.map((option) => option.value);
        } else {
            dataArrayRef.current = values;
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        dataArrayRef.current.map((el, index) => {
            formdata.append(`type[]`, el);
        })
        formdata.append(`branch_id`, UserData.branch_id);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${Base_Url}Branch/getMake`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setMakeData(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    const handleMakeChange = async (values) => {
        if (values.includes('all')) {
            MakeDataRef.current = MakewithSelectAll.map((option) => option.value);
        } else {
            MakeDataRef.current = values;
        }
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        dataArrayRef.current.map((el, index) => {
            formdata.append(`type[]`, el);
        })
        MakeDataRef.current.map((ol, index) => {
            formdata.append("make[]", ol);
        })
        formdata.append(`branch_id`, UserData.branch_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${Base_Url}Branch/getModel`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setModelData(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    const handleModelChange = async (values) => {
        if (values.includes('all')) {
            ModelDataRef.current = ModelwithSelectAll.map((option) => option.value);
        } else {
            ModelDataRef.current = values;
        }
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        dataArrayRef.current.map((el, index) => {
            formdata.append(`type[]`, el);
        })
        MakeDataRef.current.map((ol, index) => {
            formdata.append("make[]", ol);
        })
        ModelDataRef.current.map((ul, index) => {
            formdata.append("model[]", ul);
        })
        formdata.append(`branch_id`, UserData.branch_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${Base_Url}Branch/getYear`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 200) {
                    setYearData(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    const handleYearChange = async (values) => {
        if (values.includes('all')) {
            YearDataRef.current = YearwithSelectAll.map((option) => option.value);
        } else {
            YearDataRef.current = values;
        }
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        dataArrayRef.current.map((el, index) => {
            formdata.append(`type[]`, el);
        })
        MakeDataRef.current.map((ol, index) => {
            formdata.append("make[]", ol);
        })
        ModelDataRef.current.map((ul, index) => {
            formdata.append("model[]", ul);
        })
        YearDataRef.current.map((ql, index) => {
            formdata.append("year[]", ql);
        })
        formdata.append(`branch_id`, UserData.branch_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${Base_Url}Branch/getLocation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setLocationData(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    const handleChangeLocation = async (values) => {
        if (values.includes('all')) {
            LocationRef.current = LocationwithSelectAll.map((option) => option.value);
        } else {
            LocationRef.current = values;
        }
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        dataArrayRef.current.map((el, index) => {
            formdata.append(`type[]`, el);
        })
        MakeDataRef.current.map((ol, index) => {
            formdata.append("make[]", ol);
        })
        ModelDataRef.current.map((ul, index) => {
            formdata.append("model[]", ul);
        })
        YearDataRef.current.map((ql, index) => {
            formdata.append("year[]", ql);
        })
        LocationRef.current.map((ql, index) => {
            formdata.append("location[]", ql);
        })
        formdata.append("branch_id", UserData.branch_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${Base_Url}Branch/GetAllocationCases`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setCasesCount(result.TotalCasesFound)
                } else {
                    setCasesCount("No Cases Found")
                }
            })
            .catch(error => console.log('error', error));
    }
    const handleChangeBranch = (values) => {
        if (values.includes('all')) {
            EmployeeRef.current = EmployeeswithSelectAll.map((option) => option.value);
        } else {
            EmployeeRef.current = values;
        }
    };
    const handleOnSubmit = async () => {

        if (dataArrayRef) {
            if (MakeDataRef) {
                if (ModelDataRef) {
                    if (YearDataRef) {
                        if (LocationRef) {
                            if (TotalCasesToAllocate) {
                                if (EmployeeRef) {
                                    setloader(true);
                                    var myHeaders = new Headers();
                                    myHeaders.append("Accept", "application/json");
                                    myHeaders.append("Authorization", `Bearer ${Token}`);

                                    var formdata = new FormData();
                                    dataArrayRef.current.map((el, index) => {
                                        formdata.append(`type[]`, el);
                                    })
                                    MakeDataRef.current.map((ol, index) => {
                                        formdata.append("make[]", ol);
                                    })
                                    ModelDataRef.current.map((ul, index) => {
                                        formdata.append("model[]", ul);
                                    })
                                    YearDataRef.current.map((ql, index) => {
                                        formdata.append("year[]", ql);
                                    })
                                    LocationRef.current.map((ql, index) => {
                                        formdata.append("location[]", ql);
                                    })
                                    formdata.append("To_Allocate", TotalCasesToAllocate);

                                    EmployeeRef.current.map((br, index) => {
                                        formdata.append("employee_id[]", br);
                                    })
                                    formdata.append("branch_id", UserData.branch_id);

                                    var requestOptions = {
                                        method: 'POST',
                                        headers: myHeaders,
                                        body: formdata,
                                        redirect: 'follow'
                                    };

                                    await fetch(`${Base_Url}Branch/SendAllocation`, requestOptions)
                                        .then(response => response.json())
                                        .then(result => {
                                            if (result.Status === 200) {
                                                ApiFetch()
                                                toast.success("Data Allocated Successfully");
                                                setCasesCount(null)
                                                setloader(false);
                                            } else {
                                                setloader(false);
                                            }
                                        })
                                        .catch(error => console.log('error', error));
                                } else {
                                    toast.error("Type Is Required");
                                }
                            } else {
                                toast.error("Make Is Required");
                            }
                        } else {
                            toast.error("Model Is Required");
                        }
                    } else {
                        toast.error("Year Is Required");
                    }
                } else {
                    toast.error("Location Is Required");
                }
            } else {
                toast.error("No Of Cases To Allocate Is Required");
            }
        } else {
            toast.error("Branch Is Required");
        }
    };

    const TypeOption = [
        {
            value: 1,
            label: "PVT CAR",
        },
        {
            value: 2,
            label: "GCV",
        },
        {
            value: 3,
            label: "HEALTH",
        },
    ];

    const allOption = {
        value: 'all',
        label: 'Select All',
    };

    const optionsWithSelectAll = [allOption, ...TypeOption];


    const MakeOptions = MakeData.map((item, index) => ({
        value: item.make,
        label: item.make
    }))
    const MakewithSelectAll = [allOption, ...MakeOptions];



    const ModelOptions = ModelData.map((el, index) => ({
        label: el.model,
        value: el.model
    }))
    const ModelwithSelectAll = [allOption, ...ModelOptions];



    const YearOptions = YearData.map((el, index) => ({
        label: el.year,
        value: el.year
    }))
    const YearwithSelectAll = [allOption, ...YearOptions];


    const LocationOption = LocationData.map((el, index) => ({
        label: el.location,
        value: el.location
    }))
    const LocationwithSelectAll = [allOption, ...LocationOption];


    const EmployeeswithSelectAll = [allOption, ...EmployeesData];

    return (
        <>
            {loader === true ?
                <CustomLoader /> :
                <div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        gutter={8}
                        toastOptions={{
                            id: "25663",
                            duration: 7000,
                        }}
                    />
                    <div className="bg-blue-200 text-black rounded-2xl p-5 m-5 shadow ">
                        <div className="flex items-center ">
                            <FaTasks className="text-lg" />&nbsp;&nbsp;
                            <h2 className="text-sm font-bold">Available Vehicles &amp; Other Details (count)</h2>
                        </div>

                        <div className="grid grid-cols-4 mb-3 ">
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p className="f01 font-bold text-center mb-2 text-blue-700">Private Car</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Total Cases</p>
                                <p>{CardsData.CAR_Cases ? CardsData.CAR_Cases : 0}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Allocated</p>
                                <p>{CardsData.CAR_Allocated ? CardsData.CAR_Allocated : 0}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Nonallocated</p>
                                <p>{CardsData.CAR_Nonallocate ? CardsData.CAR_Nonallocate : 0}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 mb-3">
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p className="f01 font-bold  text-center mb-2 text-blue-700">GCV</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Total Cases</p>
                                <p>{CardsData.GCV_Cases ? CardsData.GCV_Cases : 0}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Allocated</p>
                                <p>{CardsData.GCV_Allocated ? CardsData.GCV_Allocated : 0}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Nonallocated</p>
                                <p>{CardsData.GCV_Nonallocate ? CardsData.GCV_Nonallocate : 0}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4">
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p className="f01 font-bold  text-center mb-2 text-blue-700">Health</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Total Cases</p>
                                <p>{CardsData.HEALTH_TotalCases ? CardsData.HEALTH_TotalCases : 0}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Allocated</p>
                                <p>{CardsData.HEALTH_Allocated ? CardsData.HEALTH_Allocated : 0} </p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col  f01">
                                <p>Nonallocated</p>
                                <p>{CardsData.HEALTH_Nonallocate ? CardsData.HEALTH_Nonallocate : 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                        <div className="flex flex-row justify-between items-center">
                            <Header title="Data Allocation" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                            <div className="flex flex-col justify-center w-full">
                                <Label label="Select Product Type" />
                                <Select
                                    mode="multiple"
                                    allowClear
                                    onChange={handleTypeChange}
                                    style={{
                                        width: '100%',
                                    }}
                                    maxTagCount={2}
                                    placeholder="Please Select Product Type"
                                    options={optionsWithSelectAll}
                                />
                            </div>
                            <div className="flex flex-col justify-center w-full">
                                <Label label="Select Make" />
                                <Select
                                    className="placeholder:text-gray-400 h-8"
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                        overflowY: "scroll"
                                    }}
                                    placeholder="Please Select Make"
                                    maxTagCount={2}
                                    onChange={(values) => {
                                        handleMakeChange(values)
                                    }}
                                    options={MakewithSelectAll}
                                />
                            </div>
                            <div className="flex flex-col justify-center w-full">
                                <Label label="Select Model" />
                                <Select
                                    className="placeholder:text-gray-400 h-8 overflow-y-scroll"
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    maxTagCount={2}
                                    placeholder="Please Select Model"
                                    onChange={(values) => {
                                        handleModelChange(values)
                                    }}
                                    options={ModelwithSelectAll}
                                />
                            </div>
                            <div className="flex flex-col justify-center w-full">
                                <Label label="Select Year Of Manufacturing" />
                                <Select
                                    className="placeholder:text-gray-400 overflow-y-scroll h-8"
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    maxTagCount={2}
                                    placeholder="Please Select Year Of Manufacturing"
                                    onChange={(values) => {
                                        handleYearChange(values)
                                    }}
                                    options={YearwithSelectAll}
                                />
                            </div>
                            <div className="flex flex-col justify-center w-full">
                                <Label label="Select Location" />
                                <Select
                                    className="placeholder:text-gray-400 h-8 overflow-y-scroll"
                                    mode="multiple"
                                    allowClear
                                    maxTagCount={2}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please Select Location"
                                    onChange={(values) =>
                                        handleChangeLocation(values)
                                    }
                                    options={LocationwithSelectAll}
                                />
                            </div>
                            <div>
                                <Label label="Total Cases Found" />
                                <input
                                    style={{ borderRadius: "5px", width: "100%" }}
                                    className="appearance-none block bg-white text-black border border-gray-200 rounded-xl py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm placeholder:text-gray-400"
                                    type="text"
                                    disabled
                                    value={CasesCount}
                                    placeholder="Please Enter Case Qty"
                                />
                            </div>
                            <div>
                                <Label label="No Of Cases To Allocate" />
                                <input
                                    style={{ borderRadius: "5px", width: "100%" }}
                                    className="appearance-none block bg-white text-black border border-gray-200 rounded-xl py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-black placeholder:text-sm placeholder:text-gray-400"
                                    type="number"
                                    min={1}
                                    max={CasesCount}
                                    onChange={(e) => setTotalCasesToAllocate(e.target.value)}
                                    placeholder="Please Enter Case Qty"
                                />
                            </div>

                            <div className="flex flex-col justify-center w-full">
                                <Label label="To Employees" />
                                <Select
                                    mode="multiple"
                                    className="placeholder:text-gray-400 overflow-y-scroll h-8"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    maxTagCount={2}
                                    placeholder="Please Select Branch"
                                    onChange={(values) =>
                                        handleChangeBranch(values)
                                    }
                                    options={EmployeeswithSelectAll}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-5 mb-1">
                            <CustomButton
                                type={1}
                                Onclick={handleOnSubmit}
                                Title="Allocate"
                                BgColor="#fa5b05"
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RenderAllocation