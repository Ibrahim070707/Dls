import React, { useEffect, useState } from "react";
import Input from "../components/AddProductForm/Input";
import TextArea from "../components/AddProductForm/TextArea";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast, ToastBar } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";


function CreateEmployee() {
  const { Base_Url } = useStateContext();
  const [loader, setloader] = useState(false);
  const UserData = JSON.parse(localStorage.getItem("data"));

  const [ApiFormData, setApiFormData] = useState({})

  const [States, setStates] = useState([]);
  const Token = localStorage.getItem("token");
  const [Cities, setCities] = useState([]);


  const [Photo, setPhoto] = useState("")
  const [IdProof, setIdProof] = useState("")
  const [AddressProof, setAddressProof] = useState("")
  const [Resume, setResume] = useState("")
  const [CancelationForm, setCancelationForm] = useState("")



  const [ParmanetsStates, setParmanetsStates] = useState([]);
  const [ParmanentCities, setParmanentCities] = useState([]);
  const genders = [
    { name: "Male" },
    { name: "Female" },
  ]
  const education = [
    { name: "12th pass" },
    { name: "10th pass" },
    { name: "Diploma" },
    { name: "Bachelor's degree" },
    { name: "Master's degree" },
    { name: "Ph.D." },
    { name: "Professional certification" },
    { name: "Vocational training" },
    { name: "Other" },
  ];
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
  const handleStateChange = (e) => {
    let iso = e.target.value;
    States.map((el) => {
      if (iso === el.id) {
        setApiFormData({ ...ApiFormData, ["coresponding_state"]: el.name });
      }
    });
    // CountryID
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
  const handleCityChange = (e) => {
    setApiFormData({ ...ApiFormData, ["coresponding_city"]: e.target.value });
  };


  useEffect(() => {
    GetStates()
    setApiFormData({ ...ApiFormData, ["branch_id"]: UserData.branch_id })
    getStatesParmanent()
  }, []);

  const handleCheckboxAddressChange = (e) => {
    if (e.target.checked) {
      setApiFormData({
        ...ApiFormData,
        permanent_address1: ApiFormData.coresponding_address1,
        permanent_address2: ApiFormData.coresponding_address2,
        permanent_state: ApiFormData.coresponding_state,
        permanent_city: ApiFormData.coresponding_city,
        permanent_pincode: ApiFormData.coresponding_pincode,
      });
    } else {
      setApiFormData({
        ...ApiFormData,
        permanent_address1: "",
        permanent_address2: "",
        permanent_state: "",
        permanent_city: "",
        permanent_pincode: "",
      });

    }
  };
  const getStatesParmanent = () => {
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
        const ParStateData = result.map((country) => ({
          id: country.iso2,
          name: country.name,
        }));
        setParmanetsStates(ParStateData);
      })
      .catch((error) => console.log("error", error));
  }
  const handleParmanrntStateChange = (e) => {
    let iso = e.target.value;
    ParmanetsStates.map((el) => {
      if (iso === el.id) {
        setApiFormData({ ...ApiFormData, ["permanent_state"]: el.name });
      }
    });
    // CountryID
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
        setParmanentCities(CityData);
      })
      .catch((error) => console.log("error", error));
  };
  const handleParmanentCityChange = (e) => {
    setApiFormData({ ...ApiFormData, ["permanent_city"]: e.target.value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setloader(true)
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append("first_name", ApiFormData.first_name);
    formdata.append("last_name", ApiFormData.last_name);
    formdata.append("gender", ApiFormData.gender);
    formdata.append("date_of_birth", ApiFormData.date_of_birth);
    formdata.append("coresponding_address1", ApiFormData.coresponding_address1);
    formdata.append("coresponding_address2", ApiFormData.coresponding_address2);
    formdata.append("coresponding_city", ApiFormData.coresponding_city);
    formdata.append("coresponding_state", ApiFormData.coresponding_state);
    formdata.append("coresponding_pincode", ApiFormData.coresponding_pincode);
    formdata.append("permanent_address1", ApiFormData.permanent_address1);
    formdata.append("permanent_address2", ApiFormData.permanent_address2);
    formdata.append("permanent_city", ApiFormData.permanent_city);
    formdata.append("permanent_state", ApiFormData.permanent_state);
    formdata.append("permanent_pincode", ApiFormData.permanent_pincode);
    formdata.append("Education", ApiFormData.Education);
    formdata.append("qualification", ApiFormData.qualification);
    formdata.append("experience_in_year", ApiFormData.experience_in_year);
    formdata.append("Industry", ApiFormData.Industry);
    formdata.append("personal_mobile_no", ApiFormData.personal_mobile_no);
    formdata.append("official_mobile_no", ApiFormData.official_mobile_no);
    formdata.append("email_id", ApiFormData.email_id);
    formdata.append("alternate_email_id", ApiFormData.alternate_email_id);
    formdata.append("date_of_joining", ApiFormData.date_of_joining);
    formdata.append("branch_id", ApiFormData.branch_id);
    formdata.append("Reporting_name", ApiFormData.Reporting_name);
    formdata.append("Id_proof", IdProof);
    formdata.append("address_proof", AddressProof);
    formdata.append("resume", Resume);
    formdata.append("photo", Photo);
    formdata.append("cancallation_form", CancelationForm);


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${Base_Url}create/employee`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === 200) {
          setloader(false)
          toast.success("Employee Created Succesfully")
        }
      })
      .catch(error => console.log('error', error));

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
        <div className="m-5 px-5 py-3 rounded-2xl bg-slate-200">
          <div className="flex flex-col gap-5">
            <form onSubmit={handleOnSubmit}>
              <div>
                <Label label="Basic Details :" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* first name */}
                <div>
                  <Label label="First Name" Required={true} />
                  <Input
                    placeholder="Enter First Name"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["first_name"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* Last name */}
                <div>
                  <Label label="Last Name" Required={true} />
                  <Input
                    placeholder="Enter Last Name"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["last_name"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* select gender */}
                <div>
                  <Label label="Select Gender" Required={true} />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["gender"]: e.target.value,
                      });
                    }}
                    id="gender"
                    className="bg border text-black border-gray-200 text-sm rounded focus:outline-none focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight f01 placeholder:text-gray-400"
                  >
                    <option className="text-gray-400" disabled selected>
                      Select Gender
                    </option>
                    {genders.map((gen, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={gen.name}
                      >
                        {gen.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* DATE OF BIRTH  */}

                <div>
                  <Label label="Date Of Birth" Required={true} />
                  <div className="date-picker">
                    <Input
                      type="date"
                      name="branchName"
                      onChange={(e) => {
                        setApiFormData({
                          ...ApiFormData,
                          ["date_of_birth"]: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Label label="Corespondence Address :" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {/* address in row 4 */}
                <div>
                  <Label label="Adress1" Required={true} />
                  <Input
                    placeholder="Enter Adress1"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["coresponding_address1"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Adress2" Required={true} />
                  <Input
                    placeholder="Enter Adress2"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["coresponding_address2"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* state */}
                <div>
                  <Label label="Select State" Required={true} />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleStateChange}
                    id="countries"
                    className="bg border text-black border-gray-200 text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 f01 px-4 mb-3 leading-tight"
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
                {/* city */}

                <div>
                  <Label label="Select City" Required={true} />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleCityChange}
                    id="countries"
                    className="bg border text-black border-gray-200 text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight f01"
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
                {/* pincode */}
                <div>
                  <Label label="Pincode" Required={true} />
                  <Input
                    placeholder="Enter Pincode"
                    type="number"
                    maxLength="6"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["coresponding_pincode"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="1"
                    onChange={handleCheckboxAddressChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2 text-sm font-bold">Same as above</span>
                </label>
              </div>
              <div>
                <Label label="Permanent Address :" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {/* address in row 4 */}
                <div>
                  <Label label="Adress1" Required={true} />
                  <Input
                    placeholder="Enter Adress1"
                    type="text"
                    name="branchName"
                    value={ApiFormData.permanent_address1}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["permanent_address1"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Adress2" Required={true} />
                  <Input
                    placeholder="Enter Adress2"
                    type="text"
                    name="branchName"
                    value={ApiFormData.permanent_address2}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["permanent_address2"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* state */}
                <div>
                  <Label label="Select State" Required={true} />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleParmanrntStateChange}
                    id="countries"
                    className="bg border text-black border-gray-200 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight f01"
                  >
                    {
                      ApiFormData.permanent_state ?
                        <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_state}>
                          {ApiFormData.permanent_state}
                        </option> :
                        <option className="text-gray-400 font-bold" disabled selected>
                          Select State
                        </option>
                    }
                    {ParmanetsStates.map((state, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={state.id}
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* city */}
                <div>
                  <Label label="Select City" Required={true} />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={handleParmanentCityChange}
                    id="countries"
                    className="bg border text-black border-gray-200  rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight f01"
                  >
                    {
                      ApiFormData.permanent_city ?
                        <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_city}>
                          {ApiFormData.permanent_city}
                        </option> :
                        <option className="text-gray-400 font-bold" disabled selected>
                          Select City
                        </option>
                    }
                    {ParmanentCities.map((city, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={city.name}
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* pincode */}
                <div>
                  <Label label="Pincode" Required={true} />
                  <Input
                    placeholder="Enter Picode"
                    type="text"
                    name="branchName"
                    maxLength="6"
                    value={ApiFormData.permanent_pincode}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["permanent_pincode"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label label="Educactional qualification :" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

                <div>
                  <Label label="Select Qualification" Required={true} />
                  <select
                    style={{ borderRadius: "5px" }}
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["qualification"]: e.target.value,
                      });
                    }}
                    id="gender"
                    className="bg border text-black border-gray-200 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight f01"
                  >
                    <option className="text-gray-400 font-bold" disabled selected>
                      Select Qualification
                    </option>
                    {education.map((edu, index) => (
                      <option
                        key={index}
                        className="text-gray-400 font-bold"
                        value={edu.name}
                      >
                        {edu.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label label="Education*" Required={true} />
                  <Input
                    placeholder="Enter Education"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Education"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Experience in Year" Required={true} />
                  <Input
                    placeholder="Enter Experience in Year"
                    type="number"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["experience_in_year"]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label label="Industry" Required={true} />
                  <Input
                    placeholder="Enter Industry"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Industry"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label label="Internal Details : " />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
                <div>
                  <Label label="Personal Mobile Number" Required={true} />
                  <Input
                    placeholder="Enter Personal Mobile Number"
                    type="number"
                    maxLength="10"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["personal_mobile_no"]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label label="Official Mobile Number" Required={true} />
                  <Input
                    placeholder="Enter Official Mobile Number"
                    type="number"
                    name="branchName"
                    maxLength="10"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["official_mobile_no"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* email id */}
                <div>
                  <Label label="Email ID" Required={true} />
                  <Input
                    placeholder="Enter Email ID"
                    type="email"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["email_id"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* alternate email id */}
                <div>
                  <Label label="Alternate Email ID" Required={true} />
                  <Input
                    placeholder="Enter Alternate Email ID"
                    type="email"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["alternate_email_id"]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* date of joining */}
                <div>
                  <Label label="Date of Joining" Required={true} />
                  <Input
                    placeholder="Enter Date of Joining"
                    type="date"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["date_of_joining"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label label="Reporting Employee Name"/>
                  <Input
                    placeholder="Enter Reporting Employee Name"
                    type="text"
                    name="branchName"
                    onChange={(e) => {
                      setApiFormData({
                        ...ApiFormData,
                        ["Reporting_name"]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label label="Basic Details of Employee :" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="text-center">
                  <Label label="Photo" Required={true} />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 f01"
                      id="multiple_files"
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Label label="ID Proof" Required={true} />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 f01"
                      id="multiple_files"
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setIdProof(e.target.files[0])}

                    />
                  </div>
                </div>
                <div className="text-center">
                  <Label label="Address Proof" Required={true} />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 f01"
                      id="multiple_files"
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setAddressProof(e.target.files[0])}
                    />
                  </div>
                </div >
                <div className="text-center">
                  <Label label="Resume" Required={true} />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 f01"
                      id="multiple_files"
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(e) => setResume(e.target.files[0])}

                    />
                  </div>
                </div>

                <div className="text-center">
                  <Label label="Application Form" Required={true} />
                  <div className="relative">
                    <input
                      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 f01"
                      id="multiple_files"
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(e) => setCancelationForm(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-3 justify-center">
                <CustomButton
                  Title="Submit"
                  BgColor="rgb(85, 44, 209)"
                  type="2"
                />
              </div>
            </form>
          </div>
        </div>
      )
      }
    </>
  );
}

export default CreateEmployee;
