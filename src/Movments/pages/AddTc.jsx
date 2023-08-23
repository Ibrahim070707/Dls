import React from 'react'

function AddTc() {
    const [loader, setloader] = useState(false)
    const [FormData, setFormData] = useState({
        branchName: "",
        branchContact: "",
        branchAddress: "",
        branchCountry: "",
        branchState: "",
        branchCity: "",
        branchDesc: "",
        ManegerName: "",
        ManegerEmail: "",
        ManegerContact: "",
        ManegerGender: "",
    })
    const handleOnSumbit = () => {
        setloader(true)
    }
    return (
        loader === true ?
            <CustomLoader />
            :
            <div className="m-5 p-5 rounded-2xl bg-slate-200" >
                {/* <ToastContainer ></ToastContainer> */}
                <div className="flex flex-col gap-5">
                    <i className="font-semibold">Branch Details:-</i>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        <div>
                            <p className="font-semibold text-xl">Branch Name</p>
                            <Input
                                placeholder="Enter Branch Name"
                                type="text"
                                name="branchName"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchName"]: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Branch Contact No</p>
                            <Input
                                placeholder="Enter Branch Contact No"
                                type="text"
                                name="branchContact"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchContact"]: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Address</p>
                            <Input
                                placeholder="Enter Branch Address"
                                type="text"
                                name="branchAddress"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchAddress"]: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Select Country</p>
                            <Input
                                placeholder="Enter Branch Country"
                                type="text"
                                name="branchCountry"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchCountry"]: e.target.value })
                                }} />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Select State</p>
                            <Input
                                placeholder="Enter Branch Country"
                                type="text"
                                name="branchState"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchState"]: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Select City</p>
                            <Input
                                placeholder="Enter Branch Country"
                                type="text"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchCity"]: e.target.value })
                                }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5">
                        <div>
                            <p className="font-semibold text-xl">Branch Description</p>
                            <TextArea
                                placeholder="Enter Branch Description"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["branchDesc"]: e.target.value })
                                }}
                            />
                        </div>
                    </div>
                    <i className="font-semibold">Maneger Details:-</i>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        <div>
                            <p className="font-semibold text-xl">Name</p>
                            <Input
                                placeholder="Enter Name"
                                type="text"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["ManegerName"]: e.target.value })
                                }} />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Email</p>
                            <Input
                                placeholder="Enter Email"
                                type="text"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["ManegerEmail"]: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Contact No</p>
                            <Input
                                placeholder="Enter Contact Number"
                                type="number"
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["ManegerContact"]: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-xl">Select Gender</p>
                            <select
                                style={{ borderRadius: "5px" }}
                                onChange={(e) => {
                                    setFormData({ ...FormData, ["ManegerGender"]: e.target.value })
                                }}
                                id="countries"
                                className="bg border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-black w-full py-3 px-4 mb-3 leading-tight">
                                <option className="text-gray-400 font-bold" disabled selected>
                                    Select Gender
                                </option>
                                <option value="Male" className="text-gray-700 font-bold">
                                    Male
                                </option>
                                <option value="Female" className="text-gray-700 font-bold">
                                    Female
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <CustomButton Onclick={handleOnSumbit} Title="Submit" BgColor="#fa5b05" />
                    </div>
                </div>
            </div >
    )
}

export default AddTc