import React, { useEffect, useState } from "react";
import Input from "../components/AddProductForm/Input";
import Label from "../components/AddProductForm/Label";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/AddProductForm/CustomButton";
import { Toaster, toast } from "react-hot-toast";
import CustomLoader from "../components/CustomLoader";

const Cases = () => {
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();
  const [ManualEntry, setManualEntry] = useState(false);
  const [FileUpload, setFileUpload] = useState(false);
  const [Selected, setSelected] = useState(true);

  const [FormData, setFormData] = useState({});
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const { Base_Url } = useStateContext();
  const Token = localStorage.getItem("token");
  useEffect(() => {
    document.getElementById("DataBank").classList.add("activenav");
    document.getElementById("CaseList").classList.add("activenavLinks");
    return () => {
      document.getElementById("CaseList").classList.remove("activenavLinks");
      document.getElementById("DataBank").classList.remove("activenav");
    };
  }, []);

  const handleOnSumbit = () => {
    setloader(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify(FormData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}CreateCase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.Status === 201) {
          // setloader(false);
          toast.success("Case Added Successfully");
          navigate("/CaseList")
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleChangeType = (e) => {
    if (e.target.value == 1) {
      setSelected(false);
      setManualEntry(true);
    } else {
      setSelected(false);
      setFileUpload(true);
    }
  };
  const handleGoBack = () => {
    setSelected(true);
    setManualEntry(false);
    setFileUpload(false);
  }
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
      ) : ManualEntry ? (
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
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select Type
                  </option>
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
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select Year
                  </option>
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
                  <option className="text-black font-bold" disabled selected>
                    Select Make
                  </option>
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
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select Model
                  </option>
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
                  placeholder="Enter Seating Capacity"
                  type="numric"
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
                  placeholder="Enter CC_GVW"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["CC_GVW"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="Zone" />
                <Input
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
                  type="numric"
                  placeholder="Enter NCB"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["NCB"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label label="New Policy Type" />
                <Input
                  required="true"
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
                  required="true"
                  placeholder="Enter TP Start Date"
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
            <div className="flex mt-5 gap-5 justify-center">
              <CustomButton
                Onclick={handleGoBack}
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
      ) : FileUpload ? (
        <div className="m-5 p-5 rounded-2xl bg-slate-200">
          <input
            className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
            id="multiple_files"
            type="file"
          />
          <div className="flex mt-5 gap-5 justify-center">
            <CustomButton
              Onclick={handleGoBack}
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
      ) : Selected ? (
        <div className="m-5 p-5 rounded-2xl bg-slate-200">
          <Label label="Select Uploading Type" />
          <select
            className="bg-white border text-gray-400 border-gray-200 font-bold text-sm rounded focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
            onChange={handleChangeType}
            defaultValue=""
          >
            <option className="text-black font-bold" disabled value="" selected>
              Select Type
            </option>
            <option value="1" className="text-black font-bold">
              Manual
            </option>
            <option value="2" className="text-black font-bold">
              File Upload
            </option>
          </select>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cases;
