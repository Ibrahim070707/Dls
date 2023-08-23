import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Select, Space, Switch, Table, Button, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../contexts/ContextProvider";
import { FaEye, FaPen, FaTasks, FaTrash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

function ListBranch() {
  const { Base_Url } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [loader, setloader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productAsc, setproductAsc] = useState([]);

  const [CardData, setCardData] = useState({});
  const Token = localStorage.getItem("token");

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}get/Hub`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 201) {
          setCardData({
            TotalHub: result.TotalHub,
            ActiveHub: result.ActiveHub,
            InActiveHub: result.InActiveHub,
          })
          setproductAsc(result.data);
          setloader(false);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    document.getElementById("EmployeeCreation").classList.add("activenav");
    document.getElementById("ListBranch").classList.add("activenavLinks");
    setloader(true);
    ApiFetch();
    return () => {
      document.getElementById("ListBranch").classList.remove("activenavLinks");
      document.getElementById("EmployeeCreation").classList.remove("activenav");
    };
  }, []);

  const columns = [
    {
      title: <div className="text-center">Employee id</div>,
      dataIndex: "employee_id",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Branch Name</div>,
      dataIndex: "branch_name",
      render: (text) => <div className="text-center">{text}</div>,
      key: "id",
    },
    {
      title: <div className="text-center">Employee Name</div>,
      dataIndex: "name",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Contact Number</div>,
      dataIndex: "personal_mobile_no",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },

    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      key: "id",
      render: (text) => (
        <div className="text-center">
          {text == 1 ? (
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          ) : (
            <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Inactive
            </span>
          )}
        </div>
      ),
    },

    {
      title: <div className="text-center">Action</div>,
      key: "action",
      dataIndex: "id",
      render: (text, record) => (
        <div className="text-center flex flex-row gap-3 justify-center">
          <Link to={`/UpdateBranch/${text}`} className="hover:text-green-600">
            <FaPen className="text-xl hover:text-green-600 text-center font-bold " />
          </Link>
        </div>
      ),
    },
  ];
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = productAsc.filter((product) =>
    product.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [perPage, setPerPage] = useState(5); // new state variable for selected value from dropdown

  const handlePerPageChange = (value) => {
    setPerPage(value); // update state with selected value from dropdown
    setProductsPerPage(value); // update productsPerPage state variable
  };

  const perPageOptions = [5, 10, 25, 50, 100, 300, 600]; // options for dropdown

  // dropdown component
  const perPageDropdown = (
    <Select
      value={perPage}
      onChange={handlePerPageChange}
      style={{ width: "10%" }}
    >
      {perPageOptions.map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </Select>
  );

  return (
    <>
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
        <div>
          <div className="h-200 bg-green-200 text-black rounded-2xl p-5 m-5 shadow ">
            <div className="flex items-center mb-4">
              <FaTasks className="text-2xl" />&nbsp;&nbsp;
              <h2 className="text-xl font-bold">Available Hub(count)</h2>
            </div>
            <div className="grid grid-cols-3">
              <div className="w-full flex justify-center text-green-700 items-center flex-col">
                <p>Total Hubs</p>
                <p>{CardData.TotalHub ? CardData.TotalHub : 0}</p>
              </div>
              <div className="w-full flex justify-center text-green-700 items-center flex-col">
                <p>Active</p>
                <p>{CardData.ActiveHub ? CardData.ActiveHub : 0}</p>
              </div>
              <div className="w-full flex justify-center text-green-700 items-center flex-col">
                <p>Inactive</p>
                <p>{CardData.InActiveHub ? CardData.InActiveHub : 0}</p>
              </div>
            </div>
          </div>

          <div className="m-5 p-5 bg-slate-200  rounded-2xl">
            <div className="flex flex-row justify-between items-center">
              <Header title="List Branch" />
              <button className="p-2 rounded-lg text-black hover:text-white font-bold w-40 hovernav">
                <Link to="/AddBranch">Add Branch</Link>
              </button>
            </div>
            <div className="overflow-y-scroll">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchTermChange}
                suffix={<SearchOutlined />}
                className="mb-10 w h-12 text-lg text-gray-500 font-bold"
              />
              <Table
                dataSource={currentProducts}
                columns={columns}
                pagination={{
                  current: currentPage,
                  pageSize: productsPerPage,
                  total: filteredProducts.length,
                  onChange: handlePageChange,
                  showSizeChanger: false,
                }}
                rowKey="id"
                footer={() => (
                  <div className="flex justify-end">
                    <span className="mr-2 font-semibold text-[#008000] mt-1">
                      Products per page:
                    </span>
                    {perPageDropdown}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListBranch;
