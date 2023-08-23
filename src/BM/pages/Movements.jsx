import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tabs } from "antd";
import Highlighter from "react-highlight-words";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaCheck, FaRegBell, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

function Movements() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const Token = localStorage.getItem("token");
    const { Base_Url } = useStateContext();
    const UserData = JSON.parse(localStorage.getItem("data"));
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(false)
    const [DashboardData, setDashboardData] = useState({})
    const [Tabsid, setTabsid] = useState(1)
    const [FinalData, setFinalData] = useState([])


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const navigate = useNavigate();
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
            title: <div className="text-center f01 ">CaseID</div>,
            dataIndex: "case_id",
            key: "case_id",
            ...getColumnSearchProps("case_id"),
            sorter: (a, b) => a.case_id.length - b.case_id.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div
                    onClick={() => navigate(`/ViewCaseDetails/${text}`)}
                    className="text-center f01 cursor-pointer hover:underline  hover:text-blue-600" >
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
            dataIndex: "vehicle_no",
            key: "vehicle_no",
            ...getColumnSearchProps("vehicle_no"),
            sorter: (a, b) => a.vehicle_no.length - b.vehicle_no.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
        {
            title: <div className="text-center f01 ">VehicleType</div>,
            dataIndex: "type",
            key: "type",
            ...getColumnSearchProps("type"),
            sorter: (a, b) => a.type.length - b.type.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div className="text-center f01">
                    {text === 1 ? "PVT" : text === 2 ? "GCV" : "Health"}
                </div>
            ),
        },
        {
            title: <div className="text-center f01 ">YOM</div>,
            dataIndex: "year_of_manufacturing",
            key: "year_of_manufacturing",
            ...getColumnSearchProps("year_of_manufacturing"),
            sorter: (a, b) => a.year_of_manufacturing.length - b.year_of_manufacturing.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
        {
            title: <div className="text-center f01 ">CSE ID</div>,
            dataIndex: "Employee",
            key: "Employee",
            ...getColumnSearchProps("Employee"),
            sorter: (a, b) => a.Employee.length - b.Employee.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
    ];
    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}GetMovmentsData/${UserData.branch_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setdata(result.Data)
                    setFinalData(result.Final)
                }
                setloader(false)
            })
            .catch(error => console.log('error', error));



        fetch(`${Base_Url}GetMovmentsDataDashboard/${UserData.branch_id}`, requestOptions)
            .then(response => response.json())
            .then(resulta => {
                setDashboardData({
                    Total: resulta.Total,
                    Pending: resulta.Pending,
                    Final: resulta.Final
                })
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        ApiFetch()
        setloader(true)
    }, []);

    return (
        <>
            {loader === true ?
                <CustomLoader /> :
                <div>
                    <div className="bg-blue-200 text-black rounded-2xl p-5 m-5 shadow ">
                        <div className="flex items-center mb-4">
                            <FaTasks className="text-2xl" />&nbsp;&nbsp;
                            <h2 className="text-sm font-bold">Movments</h2>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                                <p className="font-semibold f01">Total Case</p>
                                <p className="f01">{DashboardData.Total}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                                <p className="font-semibold f01">Convert</p>
                                <p className="f01">{DashboardData.Pending}</p>
                            </div>
                            <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                                <p className="font-semibold f01">Final</p>
                                <p className="f01">{DashboardData.Final}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-7">
                        <Tabs defaultActiveKey="1" activeKey={String(Tabsid)} onChange={(key) => setTabsid(Number(key))}>
                            <Tabs.TabPane tab="Movement" key="1">
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Final" key="2">
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                    <div className="m-5 p-5 bg-slate-200 rounded-2xl overflow-x-scroll">
                        <Table columns={columns} dataSource={Tabsid === 1 ? data : FinalData} className="overflow-x-scroll" />
                    </div>
                </div>
            }
        </>
    )
}

export default Movements