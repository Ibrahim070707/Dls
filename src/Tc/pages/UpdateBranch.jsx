import React, { useEffect, useState } from "react";
import Input from "../components/AddProductForm/Input";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast, ToastBar } from "react-hot-toast";
import { useStateContext } from "../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBranch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Base_Url, MediaBase_Url } = useStateContext();
  const [loader, setloader] = useState(false);
  const [Countries, setCountries] = useState([]);
  const [CountryID, setCountryID] = useState("");
  const [ApiFormData, setApiFormData] = useState({})
  const [States, setStates] = useState([]);
  const Token = localStorage.getItem("token");
  const [Cities, setCities] = useState([]);


  const [Photo, setPhoto] = useState("")
  const [IdProof, setIdProof] = useState("")
  const [AddressProof, setAddressProof] = useState("")
  const [ApplicationForm, setApplicationForm] = useState("")
  const [CancelationForm, setCancelationForm] = useState("")
  const [ImagesAreUpdated, setImagesAreUpdated] = useState(false)



  const [ParmanetsStates, setParmanetsStates] = useState([]);
  const [ParmanentCities, setParmanentCities] = useState([]);
  const genders = [
    { name: "male" },
    { name: "female" },
  ]
  const userType = [
    { id: 1, name: "BM" },
    { id: 2, name: "CS" },
  ]
  const education = [
    { name: "10th pass" },
    { name: "12th pass" },
    { name: "Diploma" },
    { name: "Bachelor's degree" },
    { name: "Master's degree" },
    { name: "Ph.D." },
    { name: "Professional certification" },
    { name: "Vocational training" },
    { name: "Other" },
  ];
  const GetAllCountries = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "X-CSCAPI-KEY",
      "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ=="
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Make the API request when the component mounts
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const countryData = data.map((country) => ({
          id: country.iso2,
          name: country.name,
        }));
        setCountries(countryData);
      })
      .catch((error) => console.log("error", error));
  };
  const handleCountryChange = (e) => {
    let iso = e.target.value;
    Countries.map((el) => {
      if (iso === el.id) {
        setApiFormData({ ...ApiFormData, ["corresponding_country_name"]: el.name });
        setCountryID(el.id);
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
      `https://api.countrystatecity.in/v1/countries/${iso}/states`,
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
        setApiFormData({ ...ApiFormData, ["coresponding_state_name"]: el.name });
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
      `https://api.countrystatecity.in/v1/countries/${CountryID}/states/${iso}/cities`,
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
    setApiFormData({ ...ApiFormData, ["coresponding_city_name"]: e.target.value });
  };

  const ApiFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Base_Url}get/Hub/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setApiFormData({
          ...ApiFormData,
          ["first_name"]: result.data[0].first_name,
          ["last_name"]: result.data[0].last_name,
          ["email"]: result.data[0].email,
          ["password"]: result.data[0].password,
          ["gender"]: result.data[0].gender,
          ["date_of_birth"]: result.data[0].date_of_birth,
          ["user_type"]: result.data[0].user_type,
          ["coresponding_address1"]: result.data[0].coresponding_address1,
          ["coresponding_address2"]: result.data[0].coresponding_address2,
          ["coresponding_address3"]: result.data[0].coresponding_address3,
          ["coresponding_address4"]: result.data[0].coresponding_address4,
          ["coresponding_city_name"]: result.data[0].coresponding_city_name,
          ["coresponding_state_name"]: result.data[0].coresponding_state_name,
          ["corresponding_country_name"]: result.data[0].corresponding_country_name,
          ["coresponding_pincode"]: result.data[0].coresponding_pincode,
          ["permanent_address1"]: result.data[0].permanent_address1,
          ["permanent_address2"]: result.data[0].permanent_address2,
          ["permanent_address3"]: result.data[0].permanent_address3,
          ["permanent_address4"]: result.data[0].permanent_address4,
          ["permanent_city_name"]: result.data[0].permanent_city_name,
          ["permanent_state_name"]: result.data[0].permanent_state_name,
          ["permanent_country_name"]: result.data[0].permanent_country_name,
          ["permanent_pincode"]: result.data[0].permanent_pincode,
          ["Education"]: result.data[0].Education,
          ["Qualification"]: result.data[0].Qualification,
          ["Experience_in_year"]: result.data[0].Experience_in_year,
          ["Industry"]: result.data[0].Industry,
          ["employee_id"]: result.data[0].employee_id,
          ["department"]: result.data[0].department,
          ["personal_mobile_no"]: result.data[0].personal_mobile_no,
          ["office_mobile_no"]: result.data[0].office_mobile_no,
          ["alternate_email_id"]: result.data[0].alternate_email_id,
          ["date_of_joining"]: result.data[0].date_of_joining,
          ["branch_id"]: result.data[0].branch_id,
          ["photo"]: result.data[0].photo,
          ["Id_proof"]: result.data[0].Id_proof,
          ["Address_proof"]: result.data[0].Address_proof,
          ["Application_form"]: result.data[0].Application_form,
          ["cancellation_form"]: result.data[0].cancellation_form,
          ["reporting_emp_name"]: result.data[0].reporting_emp_name,
          ["effective_start_date"]: result.data[0].effective_start_date,
          ["effective_end_date"]: result.data[0].effective_end_date,
          ["status"]: result.data[0].status,
          ["BranchName"]: result.data[0].Branch.branch_name
        })
        setPhoto(result.data[0].photo)
        setIdProof(result.data[0].Id_proof)
        setAddressProof(result.data[0].Address_proof)
        setApplicationForm(result.data[0].Application_form)
        setCancelationForm(result.data[0].cancellation_form)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    GetAllCountries();
    ApiFetch()
    document.getElementById("EmployeeCreation").classList.add("activenav");
    document.getElementById("ListBranch").classList.add("activenavLinks");
    return () => {
      document.getElementById("ListBranch").classList.remove("activenavLinks");
      document.getElementById("EmployeeCreation").classList.remove("activenav");
    };
  }, []);
  const handleCheckboxAddressChange = (e) => {
    if (e.target.checked) {
      setApiFormData({
        ...ApiFormData,
        permanent_address1: ApiFormData.coresponding_address1,
        permanent_address2: ApiFormData.coresponding_address2,
        permanent_country_name: ApiFormData.corresponding_country_name,
        permanent_state_name: ApiFormData.coresponding_state_name,
        permanent_city_name: ApiFormData.coresponding_city_name,
        permanent_pincode: ApiFormData.coresponding_pincode,
      });
    } else {
      setApiFormData({
        ...ApiFormData,
        permanent_address1: "",
        permanent_address2: "",
        permanent_country_name: "",
        permanent_state_name: "",
        permanent_city_name: "",
        permanent_pincode: "",
      });

    }
  };
  const handleParmanentCountryChange = (e) => {
    let iso = e.target.value;
    Countries.map((el) => {
      if (iso === el.id) {
        setApiFormData({ ...ApiFormData, ["permanent_country_name"]: el.name });
        setCountryID(el.id);
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
      `https://api.countrystatecity.in/v1/countries/${iso}/states`,
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
        setApiFormData({ ...ApiFormData, ["permanent_state_name"]: el.name });
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
      `https://api.countrystatecity.in/v1/countries/${CountryID}/states/${iso}/cities`,
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
    setApiFormData({ ...ApiFormData, ["permanent_city_name"]: e.target.value });
  };
  const handleOnSubmit = () => {
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
            <div>
              <Label label="Basic Details" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <Label label="USER TYPE *" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["user_type"]: e.target.value,
                    });
                  }}
                  id="gender"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.user_type ?
                      <option className="text-gray-400 font-bold" selected value={ApiFormData.user_type}>
                        {ApiFormData.user_type === 1 ? "BM" : "CS"}
                      </option> : <option className="text-gray-400 font-bold" disabled selected>
                        --Select--
                      </option>
                  }
                  {userType.map((user, index) => (
                    <option
                      key={index}
                      className="text-gray-400 font-bold"
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* first name */}
              <div>
                <Label label="First Name" />
                <Input
                  placeholder="Enter First Name"
                  type="text"
                  name="branchName"
                  value={ApiFormData.first_name}
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
                <Label label="Last Name" />
                <Input
                  placeholder="Enter Last Name"
                  type="text"
                  name="branchName"
                  value={ApiFormData.last_name}

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
                <Label label="Select Gender" />
                <select
                  style={{ borderRadius: "5px" }}

                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["gender"]: e.target.value,
                    });
                  }}
                  id="gender"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.gender ?
                      <option className="text-gray-400 font-bold" value={ApiFormData.gender}
                        selected>
                        {ApiFormData.gender}
                      </option> : <option className="text-gray-400 font-bold" value={ApiFormData.gender}
                        selected>
                        Select Gender
                      </option>
                  }
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
                <Label label="Date Of Birth" />
                <div className="date-picker">
                  <Input
                    type="date"
                    name="branchName"
                    value={ApiFormData.date_of_birth}
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
            {/* Corespondence Address */}
            <div>
              <Label label="Corespondence Address" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* address in row 4 */}
              <div>
                <Label label="Adress1" />
                <Input
                  placeholder="Enter Adress1"
                  value={ApiFormData.coresponding_address1}

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
                <Label label="Adress2" />
                <Input
                  placeholder="Enter Adress2"
                  value={ApiFormData.coresponding_address2}

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
              {/* country */}
              <div>
                <Label label="Select Country" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleCountryChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.corresponding_country_name ?
                      <option className="text-gray-400 font-bold" value={ApiFormData.corresponding_country_name} selected>
                        {ApiFormData.corresponding_country_name}
                      </option>
                      : <option className="text-gray-400 font-bold" disabled selected>
                        Select Country
                      </option>
                  }
                  {Countries.map((country, index) => (
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
              {/* state */}
              <div>
                <Label label="Select State" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleStateChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {ApiFormData.coresponding_state_name ?
                    <option className="text-gray-400 font-bold" value={ApiFormData.coresponding_state_name} selected>
                      {ApiFormData.coresponding_state_name}
                    </option> : <option className="text-gray-400 font-bold" disabled selected>
                      Select State
                    </option>
                  }
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
                <Label label="Select City" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleCityChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {ApiFormData.coresponding_city_name ?
                    <option className="text-gray-400 font-bold" value={ApiFormData.coresponding_city_name} selected>
                      {ApiFormData.coresponding_city_name}
                    </option>
                    : <option className="text-gray-400 font-bold" disabled selected>
                      Select City

                    </option>}
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
                <Label label="Pincode" />
                <Input
                  placeholder="Enter Pincode"
                  value={ApiFormData.coresponding_pincode}
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
            {/* permanent address */}
            <div>
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
              <Label label="Permanent Address" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* address in row 4 */}
              <div>
                <Label label="Adress1" />
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
                <Label label="Adress2" />
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

              {/* country */}
              <div>
                <Label label="Select Country" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleParmanentCountryChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.permanent_country_name ?
                      <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_country_name}>
                        {ApiFormData.permanent_country_name}
                      </option>
                      : <option className="text-gray-400 font-bold" disabled selected>
                        Select Country
                      </option>
                  }
                  {Countries.map((country, index) => (
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

              {/* state */}
              <div>
                <Label label="Select State" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleParmanrntStateChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.permanent_state_name ?
                      <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_state_name}>
                        {ApiFormData.permanent_state_name}
                      </option>
                      : <option className="text-gray-400 font-bold" disabled selected>
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
                <Label label="Select City" />
                <select
                  style={{ borderRadius: "5px" }}
                  onChange={handleParmanentCityChange}
                  id="countries"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.permanent_city_name ?
                      <option className="text-gray-400 font-bold" selected value={ApiFormData.permanent_city_name}>
                        {ApiFormData.permanent_city_name}
                      </option>
                      : <option className="text-gray-400 font-bold" disabled selected>
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
                <Label label="Pincode" />
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

            {/* Educactional qualification */}
            <div>
              <Label label="Educactional qualification" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              <div>
                <Label label="Select Qualification" />
                <select
                  style={{ borderRadius: "5px" }}

                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["Qualification"]: e.target.value,
                    });
                  }}
                  id="gender"
                  className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight"
                >
                  {
                    ApiFormData.Qualification ?
                      <option className="text-gray-400 font-bold" value={ApiFormData.Qualification} selected>
                        {ApiFormData.Qualification}
                      </option> : <option className="text-gray-400 font-bold" disabled selected>
                        Select Qualification
                      </option>
                  }
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
                <Label label="Education*" />
                <Input
                  placeholder="Enter Education"
                  type="text"
                  name="branchName"
                  value={ApiFormData.Education}
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["Education"]: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* total work experience */}
            <div>
              <Label label="Total Work Experience" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              <div>
                <Label label="Experience in Year" />
                <Input
                  placeholder="Enter Experience in Year"
                  type="number"
                  value={ApiFormData.Experience_in_year}

                  name="branchName"
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["Experience_in_year"]: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label label="Industry" />
                <Input
                  placeholder="Enter Industry"
                  type="text"

                  value={ApiFormData.Industry}

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
            <div>
              <Label label="Internal Details" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <Label label="Department" />
                <Input
                  placeholder="Enter Department"
                  value={ApiFormData.department}

                  type="text"
                  name="branchName"
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["department"]: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label label="Personal Mobile Number" />
                <Input
                  placeholder="Enter Personal Mobile Number"
                  type="number"
                  maxLength="10"
                  name="branchName"
                  value={ApiFormData.personal_mobile_no}

                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["personal_mobile_no"]: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label label="Official Mobile Number" />
                <Input
                  placeholder="Enter Official Mobile Number"
                  type="number"
                  name="branchName"
                  maxLength="10"
                  value={ApiFormData.office_mobile_no}

                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["office_mobile_no"]: e.target.value,
                    });
                  }}
                />
              </div>
              {/* email id */}
              <div>
                <Label label="Email ID" />
                <Input
                  placeholder="Enter Email ID"
                  type="email"
                  name="branchName"
                  value={ApiFormData.email_id}

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
                <Label label="Alternate Email ID" />
                <Input
                  placeholder="Enter Alternate Email ID"
                  type="email"
                  name="branchName"
                  value={ApiFormData.alternate_email_id}

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
                <Label label="Date of Joining" />
                <Input
                  placeholder="Enter Date of Joining"
                  type="date"
                  name="branchName"
                  value={ApiFormData.date_of_joining}
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["date_of_joining"]: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* basic details of employee */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* employee id */}
              <div>
                <Label label="Branch Name" />
                <Input
                  value={ApiFormData.BranchName}
                  placeholder="Enter Branch Name"
                  type="text"
                  name="branchName"
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["branch_name"]: e.target.value,
                    });
                  }}
                />
              </div>
              {/* department */}
              <div>
                <Label label="Reporting Employee Name" />
                <Input
                  placeholder="Enter Reporting Employee Name"
                  type="text"
                  name="branchName"
                  value={ApiFormData.reporting_emp_name}

                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["reporting_emp_name"]: e.target.value,
                    });
                  }}
                />
              </div>
              {/* effective start date */}
              <div>
                <Label label="Effective Start Date" />
                <Input
                  type="date"
                  name="branchName"
                  value={ApiFormData.effective_start_date}
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["effective_start_date"]: e.target.value,
                    });
                  }}
                />
              </div>
              {/* effective end date */}

              <div>
                <Label label="Effective End Date" />
                <Input
                  type="date"
                  value={ApiFormData.effective_end_date}

                  name="branchName"
                  onChange={(e) => {
                    setApiFormData({
                      ...ApiFormData,
                      ["effective_end_date"]: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* document upload */}
            <div>
              <Label label="Basic Details of Employee" />
            </div>
            <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-col">
                <Label label="Photo" />
                <div className="relative">
                  <input
                    className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                    id="multiple_files"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0])
                      setImagesAreUpdated(true)
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <img src={MediaBase_Url + ApiFormData.photo} width="200px" alt="" />
              </div>
            </div>
            <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-col">
                <Label label="ID Proof" />
                <div className="relative">
                  <input
                    className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                    id="multiple_files"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setIdProof(e.target.files[0])
                      setImagesAreUpdated(true)
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <img src={MediaBase_Url + ApiFormData.Id_proof} width="200px" alt="" />
              </div>
            </div>
            <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-col">
                <Label label="Address Proof" />
                <div className="relative">
                  <input
                    className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                    id="multiple_files"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setAddressProof(e.target.files[0])
                      setImagesAreUpdated(true)
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <img src={MediaBase_Url + ApiFormData.Address_proof} width="200px" alt="" />
              </div>
            </div>
            <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-col">
                <Label label="Application Form" />
                <div className="relative">
                  <input
                    className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                    id="multiple_files"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setApplicationForm(e.target.files[0])
                      setImagesAreUpdated(true)
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <img src={MediaBase_Url + ApiFormData.Application_form} width="200px" alt="" />
              </div>
            </div>
            <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-col">
                <Label label="Cancellation Form" />
                <div className="relative">
                  <input
                    className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                    id="multiple_files"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      setCancelationForm(e.target.files[0])
                      setImagesAreUpdated(true)
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <embed src={MediaBase_Url + ApiFormData.cancellation_form} width="200px" alt="" />
              </div>
            </div>
            <div className="flex gap-5 justify-center">
              <CustomButton
                Onclick={() => navigate("/ListBranch")}
                Title="Go Back"
                BgColor="#fa5b05"
              />
              <CustomButton
                Onclick={handleOnSubmit}
                Title="Submit"
                BgColor="#fa5b05"
              />
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default UpdateBranch