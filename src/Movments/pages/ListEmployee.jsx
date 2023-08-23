import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Select, Space, Switch, Table, Button, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
import { useStateContext } from "../../contexts/ContextProvider";


function ListEmployee() {
    const { Base_Url } = useStateContext();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [loader, setloader] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [productAsc, setproductAsc] = useState([])


    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}crmuser`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setproductAsc(result.data)
                    setloader(false)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        setloader(true)
        ApiFetch()
    }, [])

    const columns = [
        {
            title: (
                <div className="text-center">
                    Name
                </div>
            ),
            dataIndex: "Name",
            key: "id",
            render: (text) => <div className="text-center">{text}</div>,

        },
        {
            title: (
                <div className="text-center">
                    Contact
                </div>
            ),
            dataIndex: "Contact",
            key: "id",
            render: (text) => <div className="text-center">{text}</div>,

        },
        {
            title: (
                <div className="text-center">
                    Gender
                </div>
            ),
            dataIndex: 'Gender',
            key: "id",
            render: (text) => <div className="text-center">{text}</div>,

        },
        {
            title: (
                <div className="text-center">
                    UserType
                </div>
            ),
            dataIndex: "user_type",
            key: "id",
            render: (text) => <div className="text-center">{(text == 1) ? "BM" : (text == 2) ? "TC" : "MIS"}</div>,

        },
        {
            title: (
                <div className="text-center">
                    Branch
                </div>
            ),
            dataIndex: "BranchName",
            key: "id",
            render: (text) => <div className="text-center">{text}</div>,
        },
        {
            title: (
                <div className="text-center">
                    Action
                </div>
            ),
            key: "action",
            dataIndex: "id",
            render: (text, record) => (
                <div className="text-center">
                    <Link to={`/UpdateEmployee/${text}`}>
                        <EditOutlined className="text-xl hover:text-[#fa5b05] text-center font-bold " />
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
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const [perPage, setPerPage] = useState(5);

    const handlePerPageChange = (value) => {
        setPerPage(value);
        setProductsPerPage(value);
    };

    const perPageOptions = [5, 10, 25, 50, 100, 300, 600];

    const perPageDropdown = (
        <Select
            value={perPage}
            onChange={handlePerPageChange}
            style={{ width: "10%" }}>
            {perPageOptions.map((el, i) => (
                <option key={i} value={el}>{el}</option>
            ))}
        </Select>
    )
    return (
        <>
            {
                loader === true ?
                    <CustomLoader />
                    :
                    <div className="m-5 p-5 bg-slate-200  rounded-2xl">
                        <Header title="List Branch" />
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
                                className="text-center"
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
            }
        </>

    )
}

export default ListEmployee