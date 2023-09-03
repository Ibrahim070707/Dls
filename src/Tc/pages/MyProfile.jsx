import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast, ToastBar } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
import Label from "../components/AddProductForm/Label";
import DisabledInput from "../components/DisabledInput";


function MyProfile() {
    const { Base_Url, MediaBase_Url } = useStateContext();
    const [loader, setloader] = useState(false);
    const UserData = JSON.parse(localStorage.getItem("data"));

    const [Data, setData] = useState({})
    const Token = localStorage.getItem("token");
    const [Photo, setPhoto] = useState("")
    const [IdProof, setIdProof] = useState("")
    const [AddressProof, setAddressProof] = useState("")
    const [Resume, setResume] = useState("")
    const [CancelationForm, setCancelationForm] = useState("")
    const [FullForm, setFullForm] = useState(false)


    const ApiFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Base_Url}get/Employee/${UserData.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Status === 200) {
                    setData(result.Data)
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        ApiFetch()
    }, []);



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
                <div style={{ height: "93vh", overflowY: "scroll" }}>
                    <div className="p-5 m-5 rounded-2xl bg-slate-200">
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-4" style={{ gridTemplateColumns: "28% auto" }}>
                                <div >
                                    <img src={MediaBase_Url + Data.photo} alt="" style={{
                                        width: '100%', /* Set a fixed width for the container */
                                        height: '250px', /* Set a fixed height for the container */
                                        objectFit: 'contain'
                                    }} />
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <Label label="First Name" />
                                        <DisabledInput
                                            placeholder="Enter First Name"
                                            value={Data.first_name}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Last Name" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.last_name}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Select Gender" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.gender}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Date Of Birth" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.date_of_birth}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Coresponding Address1" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.coresponding_address1}
                                        />
                                    </div>
                                    <div>
                                        <Label label="Coresponding Address2" />
                                        <DisabledInput
                                            placeholder="Enter Last Name"
                                            value={Data.coresponding_address2}
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="flex justify-end text-gray-600 cursor-pointer" onClick={() => FullForm === true ? setFullForm(false) : setFullForm(true)}>{FullForm === true ? "See Less" : "See More"}</span>
                            {
                                FullForm ?
                                    <>
                                        <div className="grid grid-cols-5 gap-5 mt-5">
                                            <div>
                                                <Label label="Coresponding State" />
                                                <DisabledInput
                                                    placeholder="Coresponding State"
                                                    value={Data.coresponding_state}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Coresponding City" />
                                                <DisabledInput
                                                    placeholder="Coresponding City"
                                                    value={Data.coresponding_city}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Coresponding Pincode" />
                                                <DisabledInput
                                                    placeholder="Enter Last Name"
                                                    value={Data.coresponding_pincode}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Permanent Address1" />
                                                <DisabledInput
                                                    placeholder="Permanent Address1"
                                                    value={Data.permanent_address1}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Permanent Address2" />
                                                <DisabledInput
                                                    placeholder="Permanent Address2"
                                                    value={Data.permanent_address2}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Permanent State" />
                                                <DisabledInput
                                                    placeholder="Permanent State"
                                                    value={Data.permanent_state}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Permanent City" />
                                                <DisabledInput
                                                    placeholder="Permanent City"
                                                    value={Data.permanent_city}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Permanent Pincode" />
                                                <DisabledInput
                                                    placeholder="Permanent Pincode"
                                                    value={Data.permanent_pincode}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Education" />
                                                <DisabledInput
                                                    placeholder="Education"
                                                    value={Data.Education}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Qualification" />
                                                <DisabledInput
                                                    placeholder="Qualification"
                                                    value={Data.qualification}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Experience" />
                                                <DisabledInput
                                                    placeholder="Experience"
                                                    value={Data.experience_in_year}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Industry" />
                                                <DisabledInput
                                                    placeholder="Industry"
                                                    value={Data.Industry}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Personal Mobile" />
                                                <DisabledInput
                                                    placeholder="Personal Mobile"
                                                    value={Data.personal_mobile_no}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Official Mobile" />
                                                <DisabledInput
                                                    placeholder="Official Mobile"
                                                    value={Data.official_mobile_no}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Email_id" />
                                                <DisabledInput
                                                    placeholder="Email_id"
                                                    value={Data.email_id}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Alternate Email_id" />
                                                <DisabledInput
                                                    placeholder="Alternate Email_id"
                                                    value={Data.alternate_email_id}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Date Of Joining" />
                                                <DisabledInput
                                                    placeholder="Date Of Joining"
                                                    value={Data.date_of_joining}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Employee Reporting Name" />
                                                <DisabledInput
                                                    placeholder="Employee Reporting Name"
                                                    value={Data.Reporting_name}
                                                />
                                            </div>
                                            <div>
                                                <Label label="Employee Reporting Name" />
                                                <DisabledInput
                                                    placeholder="Employee Reporting Name"
                                                    value={Data.Reporting_name}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-5 mt-5">
                                            <div className="flex items-center flex-col gap-5">
                                                <Label label="Id Proof" />
                                                <img src={MediaBase_Url + Data.Id_proof} alt="" width="250px" />
                                            </div>
                                            <div className="flex items-center flex-col gap-5">
                                                <Label label="Address Proof" />
                                                <img src={MediaBase_Url + Data.address_proof} alt="" width="250px" />
                                            </div>
                                            <div className="flex items-center flex-col gap-5">
                                                <Label label="Resume" />
                                                <embed src={MediaBase_Url + Data.resume} alt="" height="100%" width="250px" />
                                            </div>
                                            <div className="flex items-center flex-col gap-5">
                                                <Label label="Application Form" />
                                                <embed src={MediaBase_Url + Data.cancallation_form} alt="" height="100%" width="250px" />
                                            </div>
                                        </div>
                                    </> : null
                            }
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}

export default MyProfile;
