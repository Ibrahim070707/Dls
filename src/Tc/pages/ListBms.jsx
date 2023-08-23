import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Input, Select, Space, Switch, Table, Button, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "../components";
import CustomLoader from "../components/CustomLoader";
function ListBms() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [loader, setloader] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");



    const productAsc = [
        {
            id: 1,
            name: 'ibrahim Nadaf',
            email: 'ibrahim@gmail.com',
            address: 'Pune Kondwa',
            gender: 'Male',
        },
        {
            id: 2,
            name: 'Mujtaba Sarwer',
            email: 'mujtaba@gmail.com',
            address: 'Pune NIBM',
            gender: 'Male',
        },
    ]
    const columns = [
        {
            title: "Sr No",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "id",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "id",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "id",
        },
    ];
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredProducts = productAsc.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            style={{ width: "10%" }}>
            {perPageOptions.map((el, i) => (
                <option key={i}>{el}</option>
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
    );
}

export default ListBms