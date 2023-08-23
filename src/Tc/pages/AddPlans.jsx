import React, { useState } from "react";
import { Header } from "../components";
import Input from "../components/AddProductForm/Input";
import TextArea from "../components/AddProductForm/TextArea";
import Label from "../components/AddProductForm/Label";
import SingleUpload from "../components/AddProductForm/SingleUpload";
import { useStateContext } from "../contexts/ContextProvider";
// import { useNavigate } from "react-router-dom";

const AddPlans = () => {

  // const navigate = useNavigate();

  // function handleCaseUpdate() {
  //   navigate('/CaseUpdate');
  // }


  const { currentColor } = useStateContext();

  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [desc, setdesc] = useState("");
  const [StandardPrice, setStandardPrice] = useState("");
  const [DiscountedPrice, setDiscountedPrice] = useState("");
  const [ActualPrice, setActualPrice] = useState("");
  const [Tags, setTags] = useState("");
  const [Guestlimit, setGuestlimit] = useState("");
  const [AddCharges, setAddCharges] = useState("");
  const [BaseImage, setBaseImage] = useState("");



  return (
    <>
      <div className="m-2 p-5 bg-gray-200 rounded-3xl">
        <div className="p-5">
          <Header category="Form" title="Add Plan" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 p-6  md:grid-cols-2 lg:grid-cols-2 gap-10 ">
            <div>
              <p className="font-semibold text-xl">Plan Name</p>
              <Input
                placeholder="Enter Plan Name"
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
            </div>
            <div>
              <p className="font-semibold text-xl">Plan Type</p>
              <Input
                placeholder="Enter type of Plan"
                // onChange={(e) => setLocation(e.target.value)}
                // value={Location}
              />
            </div>


            {/* Code for adding a dropdown  */}
            {/* <div>
              <label htmlFor="planType" className="font-semibold text-xl">Plan Type</label>
              <select id="planType" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select a plan type</option>
                <option value="health">Health Insurance</option>
                <option value="car">Car Insurance</option>
                <option value="life">Life Insurance</option>
              </select>
            </div> */}


            <div>
              <p className="font-semibold text-xl">Plan Duration</p>
              <Input
                placeholder="Enter type of Plan"
                // onChange={(e) => setLocation(e.target.value)}
                // value={Location}
              />
            </div>

            <div>
              <p className="font-semibold text-xl">Plan Offer</p>
              <Input
                placeholder="Enter type of Plan"
                // onChange={(e) => setLocation(e.target.value)}
                // value={Location}
              />
            </div>

            <div>
              <p className="font-semibold text-xl">Plan Price</p>
              <Input
                placeholder="Enter type of Plan"
                // onChange={(e) => setLocation(e.target.value)}
                // value={Location}
              />
            </div>
          </div>



          <div className="p-6">
            <p className="font-semibold text-xl">Plan Description</p>
            <TextArea
              placeholder="Plan Description"
              // onChange={(e) => setdesc(e.target.value)}
              // value={desc}
            />
          </div>




          <div className="flex justify-center gap-6">
            <button
              className="bg-[#23b8e6] p-2 rounded text-white font-bold"
            // onClick={handleAddVilla}
            >
              Add Plan
            </button>

            {/* <button
              className="bg-[#23b8e6] p-2 rounded text-white font-bold "
              onClick={handleCaseUpdate}
            >
              <Update></Update>
            </button> */}

          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default AddPlans;

