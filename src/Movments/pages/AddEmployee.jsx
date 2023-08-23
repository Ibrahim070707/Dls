import React, { useEffect, useState } from "react";
import Input from "../components/AddProductForm/Input";
import CustomLoader from "../components/CustomLoader";
import CustomButton from "../components/AddProductForm/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
function AddEmployee() {
  const { Base_Url } = useStateContext();
  const [loader, setloader] = useState(false);
  const [FormData, setFormData] = useState({});
  const [BranchData, setBranchData] = useState([]);

  const [States, setStates] = useState([]);

  const [Cities, setCities] = useState([]);

  const GetStates = () => {
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/IN/states`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const StateData = result.map((country) => ({
          id: country.iso2,
          name: country.name,
        }));
        setStates(StateData);
      })
      .catch((error) => console.log("error", error));
  };

  const GetBranchData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Base_Url}readBranchIdName`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setBranchData(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    GetBranchData();
    GetStates();
  }, []);
  const handleStateChange = (e) => {
    let iso = e.target.value;
    States.map((el) => {
      if (iso === el.id) {
        setFormData({ ...FormData, ["coresponding_state_name"]: el.name });
      }
    });

    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/IN/states/${iso}/cities`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const CityData = result.map((country) => ({
          id: country.id,
          name: country.name,
        }));
        setCities(CityData);
      })
      .catch((error) => console.log("error", error));
  };

  const handleOnSumbit = () => {
    console.log("FormData", FormData);
    setloader(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(FormData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Base_Url}Users/register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success("Employee Created Successfully");
          setloader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [ParmanentsAddress, setParmanentsAddress] = useState("");
  const [ParmanentsAddressState, setParmanentsAddressState] = useState("");
  const [ParmanentsAddressCity, setParmanentsAddressCity] = useState("");
  const [ParmanentsAddressPincode, setParmanentsAddressPincode] = useState("");

  const handlePermanentAddress = () => {
    FormData.permanent_address1 = FormData.coresponding_address1;
    FormData.permanent_state_name = FormData.coresponding_state_name;
    FormData.permanent_city_name = FormData.coresponding_city_name;
    FormData.permanent_pincode = FormData.coresponding_pincode;

    setParmanentsAddress(FormData.coresponding_address1);
    setParmanentsAddressState(FormData.coresponding_state_name);
    setParmanentsAddressCity(FormData.coresponding_city_name);
    setParmanentsAddressPincode(FormData.coresponding_pincode);
  };
  
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
                <p className=" text-xl">First Name</p>
                <Input
                  placeholder="Enter First Name"
                  type="text"
                  name="first_name"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["first_name"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">Last Name</p>
                <Input
                  placeholder="Enter Last Name"
                  type="text"
                  name="last_name"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["last_name"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">Email</p>
                <Input
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["email"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">Select Gender</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setFormData({ ...FormData, ["gender"]: e.target.value });
                  }}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select Gender
                  </option>
                  <option value="Male" className="text-gray-400 font-bold">
                    Male
                  </option>
                  <option value="Female" className="text-gray-400 font-bold">
                    Female
                  </option>
                  <option
                    value="TransGender"
                    className="text-gray-400 font-bold"
                  >
                    TransGender
                  </option>
                </select>
              </div>
              <div>
                <p className=" text-xl">Select Branch</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setFormData({ ...FormData, ["branch_id"]: e.target.value });
                  }}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select Branch
                  </option>
                  {BranchData &&
                    BranchData.map((el, index) => {
                      return (
                        <option
                          key={index}
                          value={el.id}
                          className="text-gray-400 font-bold"
                        >
                          {el.branch_name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <p className=" text-xl">Select User Type</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setFormData({ ...FormData, ["user_type"]: e.target.value });
                  }}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select User Type
                  </option>
                  <option value="1" className="text-gray-400 font-bold">
                    BM
                  </option>
                  <option value="2" className="text-gray-400 font-bold">
                    TC
                  </option>
                  <option value="3" className="text-gray-400 font-bold">
                    MIS
                  </option>
                </select>
              </div>
              <div>
                <p className=" text-xl">Personal Mobile No</p>
                <Input
                  placeholder="Enter Personal Mobile No"
                  type="number"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["personal_mobile_no"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">DOB</p>
                <Input
                  placeholder="Enter Branch Name"
                  type="date"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["date_of_birth"]: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <i className="">Coresponding Address Details:-</i>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div>
                <p className=" text-xl">Coresponding Address</p>
                <Input
                  placeholder="Enter Coresponding Address"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["coresponding_address1"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p className="text-xl">Select Coresponding State</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleStateChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select State
                  </option>
                  {States.map((country, index) => (
                    <option
                      key={index}
                      className="text-gray-400 font-bold"
                      value={country.id}
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className=" text-xl">Select Coresponding City</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["coresponding_city_name"]: e.target.value,
                    });
                  }}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  <option className="text-gray-400 font-bold" disabled selected>
                    Select City
                  </option>
                  {Cities.map((country, index) => (
                    <option
                      key={index}
                      className="text-gray-400 font-bold"
                      value={country.name}
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className=" text-xl">Coresponding Pincode</p>
                <Input
                  placeholder="Enter Coresponding Pincode"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["coresponding_pincode"]: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <i className=" ">
              <span className="flex" style={{ alignItems: "center" }}>
                <label htmlFor="chechbox">Same As Coresponding Address</label>
                <input
                  onChange={handlePermanentAddress}
                  type="checkbox"
                  name=""
                  id="chechbox"
                  style={{ width: "20px", height: "20px", marginLeft: "7px" }}
                />
              </span>
              <br />
              Permanent Address Details:-{" "}
            </i>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div>
                <p className=" text-xl">Permanent Address</p>
                {ParmanentsAddress ? (
                  <Input
                    placeholder={ParmanentsAddress}
                    type="text"
                    name="email"
                    onChange={(e) => {
                      setFormData({
                        ...FormData,
                        ["permanent_address1"]: e.target.value,
                      });
                    }}
                    defaultValue={ParmanentsAddress}
                  />
                ) : (
                  <Input
                    placeholder="Enter Permanent Address"
                    type="text"
                    name="email"
                    onChange={(e) => {
                      setFormData({
                        ...FormData,
                        ["permanent_address1"]: e.target.value,
                      });
                    }}
                    defaultValue={ParmanentsAddress}
                  />
                )}
              </div>
              <div>
                <p className=" text-xl">Select Permanent State</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["permanent_state_name"]: e.target.value,
                    });
                  }}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {ParmanentsAddressState ? (
                    <option
                      value={ParmanentsAddressState}
                      className="text-gray-400 font-bold"
                      selected
                    >
                      {ParmanentsAddressState}
                    </option>
                  ) : (
                    <option
                      className="text-gray-400 font-bold"
                      disabled
                      selected
                    >
                      Select State
                    </option>
                  )}
                  <option
                    value="Maharashtra"
                    className="text-gray-400 font-bold"
                  >
                    Maharashtra
                  </option>
                </select>
              </div>
              <div>
                <p className=" text-xl">Select Permanent City</p>
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["permanent_city_name"]: e.target.value,
                    });
                  }}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {ParmanentsAddressCity ? (
                    <option
                      value={ParmanentsAddressCity}
                      className="text-gray-400 font-bold"
                      selected
                    >
                      {ParmanentsAddressCity}
                    </option>
                  ) : (
                    <option
                      className="text-gray-400 font-bold"
                      disabled
                      selected
                    >
                      Select City
                    </option>
                  )}

                  <option value="Pune" className="text-gray-400 font-bold">
                    Pune
                  </option>
                </select>
              </div>
              <div>
                <p className="text-xl">Permanent Pincode</p>
                {ParmanentsAddressPincode ? (
                  <Input
                    placeholder={ParmanentsAddressPincode}
                    type="number"
                    name="email"
                    onChange={(e) => {
                      setFormData({
                        ...FormData,
                        ["permanent_pincode"]: e.target.value,
                      });
                    }}
                    defaultValue={ParmanentsAddressPincode}
                  />
                ) : (
                  <Input
                    placeholder="Enter Permanent Pincode"
                    type="number"
                    name="email"
                    onChange={(e) => {
                      setFormData({
                        ...FormData,
                        ["permanent_pincode"]: e.target.value,
                      });
                    }}
                  />
                )}
              </div>
            </div>

            <i className="">Other Details:-</i>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div>
                <p className=" text-xl">Education</p>
                <Input
                  placeholder="Enter Education"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setFormData({ ...FormData, ["Education"]: e.target.value });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">Qualification</p>
                <Input
                  placeholder="Enter Qualification"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["Qualification"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">Experience</p>
                <Input
                  placeholder="Enter Experience"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["Experience_in_year"]: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p className=" text-xl">Date Of Joining</p>
                <Input
                  type="date"
                  name="email"
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      ["date_of_joining"]: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-center">
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
}

export default AddEmployee;
