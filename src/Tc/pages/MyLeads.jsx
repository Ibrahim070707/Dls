import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaPhoneAlt, FaRegClock } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, TimePicker } from "antd";
import Highlighter from "react-highlight-words";

import { Toaster, toast } from "react-hot-toast";
import Reminders from "../components/Reminders";

function MyLeads({ RemindersData }) {
    const navigate = useNavigate()
    const UserData = JSON.parse(localStorage.getItem("data"));
    const { Base_Url } = useStateContext();
    const [loader, setloader] = useState(false);
    const [data, setdata] = useState([]);
    const Token = localStorage.getItem("token");
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [ModelOpen, setModelOpen] = useState(false);
    const [CaseID, setCaseID] = useState("");
    const [ApiFormData, setApiFormData] = useState({});

    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetLead/${UserData.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setdata(result.data)
                }
                setloader(false)

            })
            .catch(error => console.log('error', error));
    };
    useEffect(() => {
        setloader(true);
        ApiFetch();
    }, []);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: <div className="text-center f01 ">Case ID</div>,
            dataIndex: "case_id",
            key: "case_id",
            render: (text) => (
                <div
                    onClick={() => navigate(`/ViewCaseDetails/${text}`)}
                    className="text-center f01 cursor-pointer hover:underline hover:text-blue-600 "
                >
                    {text}
                </div>
            ),
        },
        {
            title: <div className="text-center f01 ">Customer</div>,
            dataIndex: "customer_name",
            key: "customer_name",   
            ...getColumnSearchProps("customer_name"),
            sorter: (a, b) => a.customer_name.length - b.customer_name.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
        {
            title: <div className="text-center f01 ">Vehicle</div>,
            dataIndex: "vehicle",
            key: "vehicle",
            ...getColumnSearchProps("vehicle"),
            sorter: (a, b) => a.vehicle.length - b.vehicle.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
        {
            title: <div className="text-center f01 ">VehicleType</div>,
            dataIndex: "vehicle_type",
            key: "vehicle_type",
            ...getColumnSearchProps("vehicle_type"),
            sorter: (a, b) => a.vehicle_type.length - b.vehicle_type.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div className="text-center f01">
                    {text === 1 ? "PVT" : text === 2 ? "GCV" : "Health"}
                </div>
            ),
        },
        {
            title: <div className="text-center f01 ">Sub Status</div>,
            dataIndex: "sub_Status",
            key: "sub_Status",
            ...getColumnSearchProps("sub_Status"),
            sorter: (a, b) => a.sub_Status.length - b.sub_Status.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div className="text-center f01">
                    {text ? (
                        <span className="bg-green-300 text-green-700 py-1 px-4 rounded-3xl">
                            {text}
                        </span>
                    ) : (
                        <span className="bg-amber-300 text-amber-700 py-1 px-4 rounded-3xl">
                            Pending
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: <div className="text-center f01 ">YOM</div>,
            dataIndex: "YM",
            key: "YM",
            ...getColumnSearchProps("YM"),
            sorter: (a, b) => a.YM.length - b.YM.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
        {
            title: <div className="text-center f01 ">ExpiryDate</div>,
            dataIndex: "expiry_date",
            key: "expiry_date",
            ...getColumnSearchProps("expiry_date"),
            sorter: (a, b) => a.expiry_date.length - b.expiry_date.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
    ];

    const handleModelOpenClose = (id) => {
        setModelOpen(true);
        setCaseID(id);
    };
    const handleAddReminder = () => {
        setModelOpen(false);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var raw = JSON.stringify({
            case_id: CaseID,
            emp_id: UserData.id,
            time: ApiFormData.time,
            date: ApiFormData.date,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${Base_Url}Employee/AddReminder`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 200) {
                    toast.success("Reminder Added Successfully");
                } else {
                    toast.error("Reminder Not Added Successfully");
                }
            })
            .catch((error) => console.log("error", error));
    };
    const paginationConfig = {
        pageSize: 6, // Number of rows to display per page
    };
    return (
        <>
            {ModelOpen ? (
                <Modal
                    open={true}
                    onCancel={() => setModelOpen(false)}
                    footer=""
                    className="mt-44"
                >
                    <p>Select Date And Time</p>
                    <div className="mx-5 py-3 grid grid-cols-2 gap-5">
                        <Input
                            type="date"
                            required
                            onChange={(e) =>
                                setApiFormData({ ...ApiFormData, ["date"]: e.target.value })
                            }
                        />
                        <TimePicker
                            required
                            className="w-full"
                            use12Hours
                            onChange={(time) => {
                                const formattedTime = new Date(time).toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                });

                                setApiFormData({ ...ApiFormData, time: formattedTime });
                            }}
                            format="h:mm a"
                        />
                    </div>
                    <div className="flex justify-end mt-2 mx-5 mb-2">
                        <Button onClick={handleAddReminder}>Submit</Button>
                    </div>
                </Modal>
            ) : (
                ""
            )}
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    id: "25663",
                    duration: 7000,
                }}
            />
            {loader === true ? (
                <CustomLoader />
            ) : (
                <div className="bg-gray-200" style={{ height: "auto", minHeight: "95vh" }}>
                    <div className="grid mx-5" style={{ gridTemplateColumns: "72% auto" }}>
                        <div>
                            <div className="mx-3 mt-5 bg-white rounded-xl shadow-md">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="p-5">
                                        <p className="text-xl">My Leads</p>
                                    </div>
                                    <Link to="/AddMyLeads">
                                        <button className="px-1 mr-3 py-2 rounded-lg  bg-[#1677ff] text-white hover:text-[#1677ff] hover:bg-white font-bold w-40 f02">
                                            Add Lead
                                        </button>
                                    </Link>
                                </div>
                                <div className="overflow-y-scroll">
                                    <Table columns={columns} dataSource={data} pagination={paginationConfig} className="overflow-x-scroll" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Reminders Height="auto" MaxHeight="663px" Data={RemindersData} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyLeads;
