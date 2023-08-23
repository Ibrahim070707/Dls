import React from "react";

const SingleUpload = ({ onChange, value }) => {
  return (
    <input
      className="w-full appearance-none block bg-white text-#12406d-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
      id="multiple_files"
      type="file"
      onChange={onChange}
      value={value}
    />
  );
};

export default SingleUpload;
