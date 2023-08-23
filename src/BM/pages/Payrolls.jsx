import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaEye, FaTasks, FaUsers } from "react-icons/fa";

function Payrolls() {

  const { Base_Url } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [loader, setloader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productAsc, setproductAsc] = useState([]);
  const [CardsData, setCardsData] = useState({});
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    setloader(true);
    ApiFetch();
  }, []);

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}Get/Employees/ByBranchID/${UserData.branch_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.Status === 200) {
          setproductAsc(result.data);
        }
        setloader(false);
      })
      .catch((error) => console.log("error", error));





    fetch(`${Base_Url}getInActiveActiveByBID/${UserData.branch_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setCardsData({
            total: result.total,
            inactive: result.inactive,
            active: result.active,
          })
        }
        setloader(false);
      })
      .catch(error => console.log('error', error));





  };

  const BranchColums = [
    {
      title: <div className="text-center">EmployeeID</div>,
      dataIndex: "employee_id",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Address</div>,
      dataIndex: "coresponding_address1",
      render: (text) => <div className="text-center">{text}</div>,
      key: "id",
    },
    {
      title: <div className="text-center">State</div>,
      dataIndex: "coresponding_state",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">City</div>,
      dataIndex: "coresponding_city",
      key: "id",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      key: "id",
      render: (text) => (
        <div className="text-center">
          {text === 1 ? (
            <span class=" text-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          ) : (
            <span class="text-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
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
          <Link to={`/EmployeePayroll/${text}`} className="hover:text-green-600">
            <FaEye className="text-2xl hover:text-green-600 text-center font-bold " />
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
    product.Reporting_name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {loader === true ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="bg-blue-200 text-black rounded-2xl p-5 m-5 shadow ">
            <div className="flex items-center mb-4">
              <FaUsers className="text-2xl" />&nbsp;&nbsp;
              <h2 className="text-sm font-semibold">Available Employee(count)</h2>
            </div>
            <div className="grid grid-cols-3">
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold f01">Total Employees</p>
                <p>{CardsData.total ? CardsData.total : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold f01">Active Employee</p>
                <p>{CardsData.active ? CardsData.active : 0}</p>
              </div>
              <div className="w-full flex justify-center text-blue-700 items-center flex-col text-sm">
                <p className="font-semibold f01">Inactive Employee</p>
                <p>{CardsData.inactive ? CardsData.inactive : 0}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="m-5 p-5 bg-slate-200  rounded-2xl">
              <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-semibold my-2">List All ID's</p>
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
                  columns={BranchColums}
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
        </div>
      )}
    </>
  )
}

export default Payrolls
