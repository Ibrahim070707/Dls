import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";

function MyMovements() {
  const [loader, setLoader] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [Data, setData] = useState([]);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("data"));
  const { Base_Url } = useStateContext();
  const columns = [
    {
      title: <div className="text-center f01">VehicleNo</div>,
      dataIndex: "vehicle_no",
      key: "vehicle_no",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01">CustomerName</div>,
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01">Address</div>,
      dataIndex: "address",
      key: "address",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
    {
      title: <div className="text-center f01">Mobile</div>,
      dataIndex: "mobile_no",
      key: "mobile_no",
      render: (text) => <div className="text-center f01">{text}</div>,
    },

    {
      title: <div className="text-center f01">Premium</div>,
      dataIndex: "premium",
      key: "premium",
      render: (text) => <div className="text-center f01">₹{text}/-</div>,
    },
    {
      title: <div className="text-center f01">CreatedAt</div>,
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <div className="text-center f01">{text}</div>,
    },
  ];
  const paginationConfig = {
    pageSize: 6, // Number of rows to display per page
  };
  const GerData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}GetMovmentByBranchID/${UserData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setLoader(false)
          setData(result.Data)
        }
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    setLoader(true)
    GerData()
  }, [])
  return (
    <>
      {loader === true ?
        <CustomLoader />
        :
        <div className="m-5 p-5 rounded-2xl bg-slate-200" style={{ maxHeight: "90vh", overflowY: "scroll" }}>
          <div className="flex flex-col gap-5">
            <Table
              pagination={paginationConfig}
              columns={columns}
              dataSource={Data}
              className="overflow-x-scroll overflow-y-scroll"
            />
          </div>
        </div>
      }
    </>
  )
}

export default MyMovements
