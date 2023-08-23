import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";

function CSRReport() {
    const Token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const [data, setdata] = useState([])
    const [BranchData, setBranchData] = useState([])
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [loader, setloader] = useState(false);
    const { Base_Url } = useStateContext();
    const UserData = JSON.parse(localStorage.getItem("data"));




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
            title: <div className="text-center f01 ">EmployeeID</div>,
            dataIndex: "employee_id",
            key: "employee_id",
            ...getColumnSearchProps("employee_id"),
            sorter: (a, b) => a.employee_id.length - b.employee_id.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Total</div>,
            dataIndex: "Total",
            key: "Total",
            render: (text) => (
                <div className="text-center text-blue-600 f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Connect</div>,
            dataIndex: "Connect",
            key: "Connect",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Convience</div>,
            dataIndex: "Convience",
            key: "Convience",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Appointment</div>,
            dataIndex: "Appointment",
            key: "Appointment",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Convert</div>,
            dataIndex: "Convert",
            key: "Convert",
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Lost</div>,
            dataIndex: "Lost",
            key: "Lost",
            render: (text) => (
                <div className="text-center text-red-500 f01">{text}</div>
            ),
        },
    ];
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

        fetch(`${Base_Url}GetCsrReport/${UserData.branch_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setdata(result.Data)
                }
                setloader(false)
            })
            .catch(error => console.log('error', error));
    }
    const Url = `https://myfiinbox.com/Rest/gbZc1bkumA/laravel8/public/api/GetCsrReportsByBranch/${UserData.id}`
    return (
        <>
            {loader === true ? (
                <CustomLoader />
            ) : (
                <div>
                    <div className="m-5 p-5 bg-slate-200 rounded-2xl">
                        <div className="text-sm mb-5 mt-1 text-blue-500 font-semibold flex justify-start items-center gap-1 ">
                            <a className="inline-flex cursor-pointer gap-2 items-center" href={Url}>Download Csr Report <FaArrowDown /> </a>
                        </div>
                        <div className="overflow-y-scroll">
                            <Table
                                columns={columns}
                                dataSource={data}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CSRReport