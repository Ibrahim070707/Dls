import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaRegClock } from "react-icons/fa";

function QuoteGaneration({ data, RemindersFunctionCall, Text }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();

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
      title: <div className="text-center f01">Case ID</div>,
      dataIndex: "case_id",
      key: "case_id",
      render: (text) => (
        <div
          onClick={() => navigate(`/ViewCaseDetails/${text}`)}
          className="text-center f01 cursor-pointer hover:underline hover:text-blue-600"
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
          <span className="bg-amber-300 text-amber-700 py-1 px-4 rounded-3xl">
            {Text}
          </span>
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
  const paginationConfig = {
    pageSize: 6, // Number of rows to display per page
  };
  return (
    <Table
      pagination={paginationConfig}
      columns={columns}
      dataSource={data}
      className="overflow-x-scroll overflow-y-scroll"
    />
  );
}

export default QuoteGaneration;
