import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useEffect } from "react";
import { FaArrowDown, FaDownload } from "react-icons/fa";

function BusinessReports() {
    const Token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const [data, setdata] = useState([])
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [loader, setloader] = useState(false);
    const UserData = JSON.parse(localStorage.getItem("data"));
    const [QuotesData, setQuotesData] = useState([])
    const { Base_Url } = useStateContext();
    const [ShowBox, setShowBox] = useState(false)
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
            title: <div className="text-center f01 ">Month</div>,
            dataIndex: "Month",
            key: "Month",
            ...getColumnSearchProps("Month"),
            sorter: (a, b) => a.Month.length - b.Month.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => (
                <div className="text-center f01">{text}</div>
            ),
        },
        {
            title: <div className="text-center f01 ">Year</div>,
            dataIndex: "Year",
            key: "Year",
            ...getColumnSearchProps("Year"),
            sorter: (a, b) => a.Year.length - b.Year.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <div className="text-center f01">{text}</div>,
        },
        {
            title: <div className="text-center f01 ">Action</div>,
            dataIndex: "expiry_date",
            key: "expiry_date",
            render: (text) => <div className="flex justify-center items-center cursor-pointer f01">
                <FaArrowDown className="hover:text-blue-600 text-lg" /></div>,
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

        fetch(`${Base_Url}GetBusinessReportByBranchId/${UserData.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setdata(result.Data)
                    console.log("result.Data", result.Data);
                    setQuotesData(result.Data.Quote)
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
            "nop": data?.Pvt?.NOP,
            "premium": data?.Pvt?.Amount,
        },
        {
            "name": "Gcv",
            "nop": data?.Gcv?.NOP,
            "premium": data?.Gcv?.Amount,
        },
        {
            "name": "Health",
            "nop": data?.health?.NOP,
            "premium": data?.health?.Amount,
        },
    ];
    return (
        <>
            {loader === true ? (
                <CustomLoader />
            ) : (
                <div>
                    <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                        <div className="grid grid-cols-2 gap-10">
                            {
                                ShowBox ?
                                    <div className="bg-white rounded-lg">
                                        <p className="text-center font-bold mt-2">Product Wise</p>
                                        <div className="grid grid-cols-3 text-center mt-2">
                                            <p className="text-sm font-semibold">Product</p>
                                            <p className="text-sm font-semibold">No. Of Policy</p>
                                            <p className="text-sm font-semibold">Total Premium</p>
                                        </div>
                                        {ProductWise && ProductWise.map((ela, i) => {
                                            return (
                                                <div className="grid grid-cols-3 text-center mt-1 mb-3" key={i}>
                                                    <p className="f01">{ela.name}</p>
                                                    <p className="f01">{ela.nop}</p>
                                                    <p className="f01">₹{ela.premium}/-</p>
                                                </div>
                                            )
                                        })}
                                    </div> : ""
                            }
                            <div className="bg-white rounded-lg" style={{ maxHeight: "150px", overflowY: "scroll" }}>
                                <p className="text-center font-bold mt-2">Insurance Co Wise</p>
                                <div className="grid grid-cols-3 text-center mt-2">
                                    <p className="text-sm font-semibold">Insurer</p>
                                    <p className="text-sm font-semibold">No. Of Policy</p>
                                    <p className="text-sm font-semibold">Total Premium</p>
                                </div>
                                {QuotesData && QuotesData.map((el, index) => {
                                    return (
                                        <div className="grid grid-cols-3 text-center mt-1 mb-3" key={index}>
                                            <p className="f01">{el.Name}</p>
                                            <p className="f01">{el.Premuim}</p>
                                            <p className="f01">₹{el.Amount}/-</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="text-sm mt-5 text-blue-500 font-semibold flex justify-start items-center gap-1 ">
                            <span className="inline-flex cursor-pointer gap-2 items-center" onClick={() => window.open(`https://myfiinbox.com/Rest/gbZc1bkumA/laravel8/public/api/DownloadBusinessReportsByBranch/${UserData.id}`)} >Download Business Report <FaArrowDown /> </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BusinessReports