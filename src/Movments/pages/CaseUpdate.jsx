import React, { useEffect, useState } from "react";
import { Header } from "../components";
import Input from "../components/AddProductForm/Input";
import Label from "../components/AddProductForm/Label";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../components/AddProductForm/CustomButton";
import { Toaster, toast } from "react-hot-toast";
import CustomLoader from "../components/CustomLoader";

const CaseUpdate = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { Base_Url } = useStateContext();
  const Token = localStorage.getItem("token");
  const [FormData, setFormData] = useState({});
  const [loader, setloader] = useState(false);

  const ApiFetch = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}getCase/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setloader(false);
          setFormData({
            ...FormData,
            ["type"]: result.data[0].type,
            ["customer_name"]: result.data[0].customer_name,
            ["address"]: result.data[0].address,
            ["mobile_no"]: result.data[0].mobile_no,
            ["email_id"]: result.data[0].email_id,
            ["vehicle_no"]: result.data[0].vehicle_no,
            ["expiry_date"]: result.data[0].expiry_date,
            ["year_of_manufacturing"]: result.data[0].year_of_manufacturing,
            ["make"]: result.data[0].make,
            ["model"]: result.data[0].model,
            ["seating_capacity"]: result.data[0].seating_capacity,
            ["CC_GVW"]: result.data[0].CC_GVW,
            ["zone"]: result.data[0].zone,
            ["location"]: result.data[0].location,
            ["Mobile1"]: result.data[0].Mobile1,
            ["Mobile2"]: result.data[0].Mobile2,
            ["IDV"]: result.data[0].IDV,
            ["Registration_date"]: result.data[0].Registration_date,
            ["previous_policy_type"]: result.data[0].previous_policy_type,
            ["sub_model"]: result.data[0].sub_model,
            ["RTO"]: result.data[0].RTO,
            ["previous_insurance"]: result.data[0].previous_insurance,
            ["NCB"]: result.data[0].NCB,
            ["new_policy_type"]: result.data[0].new_policy_type,
            ["OD_start_date"]: result.data[0].OD_start_date,
            ["OD_end_date"]: result.data[0].OD_end_date,
            ["TP_start_date"]: result.data[0].TP_start_date,
            ["TP_end_date"]: result.data[0].TP_end_date,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleOnSumbit = () => {
    setloader(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify(FormData);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}UpdateCase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === 200) {
          setloader(false);
          toast.success("Case Updated Successfully");
        } else {
          setloader(false);
          toast.error("Case Not Updated");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setFormData({
      ...FormData,
      ["id"]: id,
    });
    document.getElementById("DataBank").classList.add("activenav");
    document.getElementById("CaseList").classList.add("activenavLinks");
    setloader(true);
    ApiFetch();
    return () => {
      document.getElementById("CaseList").classList.remove("activenavLinks");
      document.getElementById("DataBank").classList.remove("activenav");
    };
  }, []);
  const Year = [
    {
      id: 2000,
    },
    {
      id: 2001,
    },
    {
      id: 2002,
    },
    {
      id: 2003,
    },
    {
      id: 2004,
    },
    {
      id: 2005,
    },
    {
      id: 2006,
    },
    {
      id: 2007,
    },
    {
      id: 2008,
    },
    {
      id: 2009,
    },
    {
      id: 2010,
    },
    {
      id: 2011,
    },
    {
      id: 2012,
    },
    {
      id: 2013,
    },
    {
      id: 2014,
    },
    {
      id: 2015,
    },
    {
      id: 2016,
    },
    {
      id: 2017,
    },
    {
      id: 2018,
    },
    {
      id: 2019,
    },
    {
      id: 2020,
    },
    {
      id: 2021,
    },
    {
      id: 2022,
    },
    {
      id: 2023,
    },
    {
      id: 2023,
    },
  ];
  console.log("FormData", FormData);
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
        <div className="m-5 p-5 rounded-2xl bg-slate-200">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div>
                <Label label="Type" />
                <select
                  className="bg-white border text-gray-400 border-gray-200 font-bold text-sm rounded focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["type"]: e.target.value,
                    });
                  }}
                  placeholder="Select Year"
                >
                  {FormData.type ? (
                    <option
                      className="text-gray-400 font-bold"
                      value={FormData.type}
                    >
                      {FormData.type == 1
                        ? "PVT CAR"
                        : FormData.type == 2
                          ? "GCV"
                          : "HEALTH"}
                    </option>
                  ) : (
                    <option
                      className="text-gray-400 font-bold"
                      disabled
                      selected
                    >
                      Select Type
                    </option>
                  )}
                  <option value="1" className="text-black font-bold">
                    PVT CAR
                  </option>
                  <option value="2" className="text-black font-bold">
                    GCV
                  </option>
                  <option value="3" className="text-black font-bold">
                    HEALTH
                  </option>
                </select>
              </div>
              <div>
                <Label label="Customer Name" />
                <Input
                  required="true"
                  placeholder="Enter Customer Name"
                  value={FormData.customer_name}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["customer_name"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="Address" />
                <Input
                  required="true"
                  value={FormData.address}
                  placeholder="Enter Address"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["address"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="Mobile No" />
                <Input
                  required="true"
                  value={FormData.mobile_no}
                  placeholder="Enter Mobile No"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["mobile_no"]: e.target.value,
                    });
                  }}
                  type="number"
                />
              </div>
              <div>
                <Label label="Email" />
                <Input
                  value={FormData.email_id}
                  required="true"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["email_id"]: e.target.value,
                    });
                  }}
                  type="email"
                />
              </div>
              <div>
                <Label label="Vehicle No" />
                <Input
                  required="true"
                  value={FormData.vehicle_no}
                  placeholder="Enter Vehicle No"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["vehicle_no"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="Expiry Date" />
                <Input
                  required="true"
                  value={FormData.expiry_date}
                  placeholder="Enter Expiry Date"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["expiry_date"]: e.target.value,
                    });
                  }}
                  type="date"
                />
              </div>
              <div>
                <Label label="Year Of Manufacturing" />
                <select
                  className="bg-white border text-gray-400 border-gray-200 font-bold text-sm rounded focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["year_of_manufacturing"]: e.target.value,
                    });
                  }}
                  placeholder="Select Year"
                >
                  {FormData.year_of_manufacturing ? (
                    <option
                      className="text-gray-400 font-bold"
                      selected
                      value={FormData.year_of_manufacturing}
                    >
                      {FormData.year_of_manufacturing}
                    </option>
                  ) : (
                    <option
                      className="text-gray-400 font-bold"
                      disabled
                      selected
                    >
                      Select Year
                    </option>
                  )}
                  {Year &&
                    Year.map((el, map) => {
                      return (
                        <option className="text-black font-bold" value={el.id}>
                          {el.id}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <Label label="Select Make" />
                <select
                  className="bg-white border text-gray-400 border-gray-200 font-bold text-sm rounded focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["make"]: e.target.value });
                  }}
                  placeholder="Select Make"
                >
                  {FormData.make ? (
                    <option
                      className="text-black font-bold"
                      selected
                      value={FormData.make}
                    >
                      {FormData.make}
                    </option>
                  ) : (
                    <option className="text-black font-bold" disabled selected>
                      Select Make
                    </option>
                  )}
                  <option
                    value="Maruti Suzuki"
                    className="text-black font-bold"
                  >
                    Maruti Suzuki
                  </option>
                  <option value="Hyundai" className="text-black font-bold">
                    Hyundai
                  </option>
                  <option value="Tata Motors" className="text-black font-bold">
                    Tata Motors
                  </option>
                  <option
                    value="Mahindra & Mahindra"
                    className="text-black font-bold"
                  >
                    Mahindra & Mahindra
                  </option>
                  <option value="Kia" className="text-black font-bold">
                    Kia
                  </option>
                  <option value="Toyota" className="text-black font-bold">
                    Toyota
                  </option>
                  <option value="Honda" className="text-black font-bold">
                    Honda
                  </option>
                  <option value="Renault" className="text-black font-bold">
                    Renault
                  </option>
                  <option value="Skoda" className="text-black font-bold">
                    Skoda
                  </option>
                  <option value="MG" className="text-black font-bold">
                    MG
                  </option>
                </select>
              </div>
              <div>
                <Label label="Model" />
                <select
                  className="bg-white border text-gray-400 border-gray-200 font-bold text-sm rounded focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["model"]: e.target.value });
                  }}
                  placeholder="Select Model"
                >
                  {FormData.model ? (
                    <option
                      className="text-gray-400 font-bold"
                      selected
                      value={FormData.model}
                    >
                      {FormData.model}
                    </option>
                  ) : (
                    <option
                      className="text-gray-400 font-bold"
                      disabled
                      selected
                    >
                      Select Model
                    </option>
                  )}
                  <option value="Venue " className="text-black font-bold">
                    Venue
                  </option>
                  <option value="Alcazar " className="text-black font-bold">
                    Alcazar
                  </option>
                  <option value="Ioniq 5" className="text-black font-bold">
                    Ioniq 5
                  </option>
                  <option value="Tucson " className="text-black font-bold">
                    Tucson
                  </option>
                </select>
              </div>
              <div>
                <Label label="Seating Capacity" />
                <Input
                  required="true"
                  value={FormData.seating_capacity}
                  placeholder="Enter Seating Capacity"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["seating_capacity"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="CC_GVW" />
                <Input
                  required="true"
                  value={FormData.CC_GVW}
                  placeholder="Enter CC_GVW"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["CC_GVW"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="Zone" />
                <Input
                  value={FormData.zone}
                  required="true"
                  placeholder="Enter Zone"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["zone"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="Location" />
                <Input
                  required="true"
                  value={FormData.location}
                  placeholder="Enter Location"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["location"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="IDV" />
                <Input
                  required="true"
                  value={FormData.IDV}
                  placeholder="Enter IDV"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["IDV"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="Registration Date" />
                <Input
                  required="true"
                  value={FormData.Registration_date}
                  placeholder="Enter Registration Date"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["Registration_date"]: e.target.value,
                    });
                  }}
                  type="date"
                />
              </div>
              <div>
                <Label label="Previous Policy Type" />
                <Input
                  value={FormData.previous_policy_type}
                  required="true"
                  placeholder="Enter Previous Policy Type"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["previous_policy_type"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="Sub Model" />
                <Input
                  value={FormData.sub_model}
                  required="true"
                  placeholder="Enter Sub Model"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["sub_model"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="RTO" />
                <Input
                  required="true"
                  placeholder="Enter RTO"
                  value={FormData.RTO}
                  onChange={(e) => {
                    setFormData({ ...FormData, ["RTO"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="Previous Insurance" />
                <Input
                  required="true"
                  placeholder="Enter Previous Insurance"
                  value={FormData.previous_insurance}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["previous_insurance"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="NCB" />
                <Input
                  required="true"
                  placeholder="Enter NCB"
                  value={FormData.NCB}
                  onChange={(e) => {
                    setFormData({ ...FormData, ["NCB"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="New Policy Type" />
                <Input
                  required="true"
                  value={FormData.new_policy_type}
                  placeholder="Enter New Policy Type"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["new_policy_type"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label label="New TP Start Date" />
                <Input
                  value={FormData.TP_start_date}
                  required="true"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["TP_start_date"]: e.target.value,
                    });
                  }}
                  type="date"
                />
              </div>
              <div>
                <Label label="New TP End Date" />
                <Input
                  required="true"
                  value={FormData.TP_end_date}
                  placeholder="Enter TP End Date"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["TP_end_date"]: e.target.value,
                    });
                  }}
                  type="date"
                />
              </div>
            </div>
            <div className="flex mt-5 justify-center gap-5 items-center">
              <CustomButton
                Onclick={() => {
                  navigate("/CaseList");
                }}
                Title="Go Back"
                BgColor="#fa5b05"
              />
              <CustomButton
                Onclick={handleOnSumbit}
                Title="Submit"
                BgColor="#fa5b05"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseUpdate;
