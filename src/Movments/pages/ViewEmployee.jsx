import React, { useEffect, useState } from "react";
import Input from "../components/AddProductForm/Input";
import CustomButton from "../components/AddProductForm/CustomButton";
import CustomLoader from "../components/CustomLoader";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import { useNavigate, useParams } from "react-router-dom";
function ViewEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { Base_Url, MediaBase_Url } = useStateContext();
    const [loader, setloader] = useState(false);
    const [Countries, setCountries] = useState([]);
    const [CountryID, setCountryID] = useState("");
    const [ApiFormData, setApiFormData] = useState({})
    const [States, setStates] = useState([]);
    const Token = localStorage.getItem("token");
    const [isChecked, setIsChecked] = useState(false);
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
        { name: "Male" },
        { name: "Female" },
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

    const handleCountryChange = () => {
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

        fetch(`${Base_Url}getEployeeByID/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.Status === 200) {
                    setApiFormData({
                        ...ApiFormData,
                        ["first_name"]: result.data.first_name,
                        ["last_name"]: result.data.last_name,
                        ["email_id"]: result.data.email_id,
                        ["password"]: result.data.password,
                        ["gender"]: result.data.gender,
                        ["date_of_birth"]: result.data.date_of_birth,
                        ["coresponding_address1"]: result.data.coresponding_address1,
                        ["coresponding_address2"]: result.data.coresponding_address2,
                        ["coresponding_address3"]: result.data.coresponding_address3,
                        ["coresponding_address4"]: result.data.coresponding_address4,
                        ["coresponding_city_name"]: result.data.coresponding_city,
                        ["coresponding_state_name"]: result.data.coresponding_state,
                        ["coresponding_pincode"]: result.data.coresponding_pincode,
                        ["permanent_address1"]: result.data.permanent_address1,
                        ["permanent_address2"]: result.data.permanent_address2,
                        ["permanent_address3"]: result.data.permanent_address3,
                        ["permanent_address4"]: result.data.permanent_address4,
                        ["permanent_city_name"]: result.data.permanent_city,
                        ["permanent_state_name"]: result.data.permanent_state,
                        ["permanent_pincode"]: result.data.permanent_pincode,
                        ["Education"]: result.data.Education,
                        ["Qualification"]: result.data.qualification,
                        ["Experience_in_year"]: result.data.experience_in_year,
                        ["Industry"]: result.data.Industry,
                        ["employee_id"]: result.data.employee_id,
                        ["personal_mobile_no"]: result.data.personal_mobile_no,
                        ["office_mobile_no"]: result.data.official_mobile_no,
                        ["alternate_email_id"]: result.data.alternate_email_id,
                        ["date_of_joining"]: result.data.date_of_joining,
                        ["branch_id"]: result.data.branch_id,
                        ["reporting_emp_name"]: result.data.Reporting_name,
                        ["status"]: result.data.status,
                        ["photo"]: result.data.photo,
                        ["Id_proof"]: result.data.Id_proof,
                        ["address_proof"]: result.data.address_proof,
                        ["resume"]: result.data.resume,
                        ["cancallation_form"]: result.data.cancallation_form,

                    })
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        ApiFetch()
        handleCountryChange()
    }, []);
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
        setloader(true)
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var formdata = new FormData();
        formdata.append("id", id);
        formdata.append("first_name", ApiFormData.first_name);
        formdata.append("last_name", ApiFormData.last_name);
        formdata.append("email_id", ApiFormData.email_id);
        formdata.append("gender", ApiFormData.gender);
        formdata.append("date_of_birth", ApiFormData.date_of_birth);
        formdata.append("coresponding_address1", ApiFormData.coresponding_address1);
        formdata.append("coresponding_address2", ApiFormData.coresponding_address2);
        formdata.append("coresponding_city", ApiFormData.coresponding_city_name);
        formdata.append("coresponding_state", ApiFormData.coresponding_state_name);
        formdata.append("coresponding_pincode", ApiFormData.coresponding_pincode);
        formdata.append("permanent_address1", ApiFormData.permanent_address1);
        formdata.append("permanent_address2", ApiFormData.permanent_address2);
        formdata.append("permanent_city", ApiFormData.permanent_city_name);
        formdata.append("permanent_state", ApiFormData.permanent_state_name);
        formdata.append("permanent_pincode", ApiFormData.permanent_pincode);
        formdata.append("Education", ApiFormData.Education);
        formdata.append("qualification", ApiFormData.Qualification);
        formdata.append("experience_in_year", ApiFormData.Experience_in_year);
        formdata.append("Industry", ApiFormData.Industry);
        formdata.append("personal_mobile_no", ApiFormData.personal_mobile_no);
        formdata.append("official_mobile_no", ApiFormData.office_mobile_no);
        formdata.append("alternate_email_id", ApiFormData.alternate_email_id);
        formdata.append("date_of_joining", ApiFormData.date_of_joining);
        formdata.append("Reporting_name", ApiFormData.reporting_emp_name);
        formdata.append("status", ApiFormData.status);

        if (ImagesAreUpdated) {
            formdata.append("is_img", 1);
            if (IdProof) {
                formdata.append("Id_proof", IdProof)
            }
            if (Photo) {
                formdata.append("photo", Photo)
            }
            if (ApplicationForm) {
                formdata.append("resume", ApplicationForm)
            }
            if (AddressProof) {
                formdata.append("address_proof", AddressProof)
            }
            if (CancelationForm) {
                formdata.append("cancallation_form", CancelationForm)
            }
        } else {
            formdata.append("is_img", 2);
        }


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${Base_Url}update/employee`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.Status === 200) {
                    navigate("/AllIds")
                    toast.success("Employees Updated Successfully");
                }
                setloader(false)

            })
            .catch(error => console.log('error', error));
    };
    const handleRadioChange = (e) => {
        setApiFormData({ ...ApiFormData, ["status"]: e.target.value })
    };

    return (
        <>
            <Toaster
                position="top-right"
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
                    <div className="flex flex-col">
                        <div >
                            <Label label="Basic Details" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                                    className="bg border text-black border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
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
                        <div className="mt-3">
                            <Label label="Corespondence Address" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
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
                            {/* state */}
                            <div>
                                <Label label="Select State" />
                                <select
                                    style={{ borderRadius: "5px" }}
                                    onChange={handleStateChange}
                                    id="countries"
                                    className="bg border text-black border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
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
                                    className="bg border text-black border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
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
                        <div className="mt-3">
                            <Label label="Permanent Address" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
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

                            {/* state */}
                            <div>
                                <Label label="Select State" />
                                <select
                                    style={{ borderRadius: "5px" }}
                                    onChange={handleParmanrntStateChange}
                                    id="countries"
                                    className="bg border text-black border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
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
                                    className="bg border text-black border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
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
                        <div className="mt-3">
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
                                    className="bg border text-black border-gray-200 f01 rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-2 px-4 mb-3 leading-tight"
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
                        <div className="mt-3">
                            <Label label="Internal Details" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
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
                        </div>
                        <div>
                            {
                                ApiFormData.status === 1 ?
                                    <div className="flex gap-5">
                                        <div className="flex gap-1">
                                            <input onChange={handleRadioChange} type="radio" value="1" checked name="status" id="Active" /><label htmlFor="Active" >Active</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input onChange={handleRadioChange} type="radio" value="2" id="Inactive" name="status" /><label htmlFor="Inactive">Inactive</label>
                                        </div>
                                    </div> :
                                    <div className="flex gap-5">
                                        <div className="flex gap-1">
                                            <input onChange={handleRadioChange} type="radio" value="1" name="status" id="Active" /><label htmlFor="Active" >Active</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input onChange={handleRadioChange} type="radio" value="2" checked id="Inactive" name="status" /><label htmlFor="Inactive">Inactive</label>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="mt-3">
                            <Label label="Basic Details of Employee" />
                        </div>
                        <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="flex justify-center items-center flex-col-reverse gap-3">
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
                                <div className="flex justify-center items-center">
                                    <img src={MediaBase_Url + ApiFormData.photo} width="200px" alt="" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col-reverse gap-3">
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
                                <div className="flex justify-center items-center">
                                    <img src={MediaBase_Url + ApiFormData.Id_proof} width="200px" alt="" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col-reverse gap-3">
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
                                <div className="flex justify-center items-center">
                                    <img src={MediaBase_Url + ApiFormData.address_proof} width="200px" alt="" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col-reverse gap-3">
                                <Label label="Resume" />
                                <div className="relative">
                                    <input
                                        className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                                        id="multiple_files"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            setApplicationForm(e.target.files[0])
                                            setImagesAreUpdated(true)
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <embed src={MediaBase_Url + ApiFormData.resume} width="200px" alt="" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col-reverse gap-3">
                                <Label label="Application Form" />
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
                                <div className="flex justify-center items-center">
                                    <embed src={MediaBase_Url + ApiFormData.cancallation_form} width="200px" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-center">
                            <CustomButton
                                Onclick={() => navigate("/AllIds")}
                                Title="Go Back"
                                BgColor="#552cd1"
                                type={1}
                            />
                            <CustomButton
                                type={1}
                                Onclick={handleOnSubmit}
                                Title="Submit"
                                BgColor="#552cd1"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewEmployee