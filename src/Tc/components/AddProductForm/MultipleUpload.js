import React from "react";

const MultipleUpload = ({ onChange }) => {
  return (
    <div>
      <input
        className="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
        id="multiple_files"
        type="file"
        onChange={onChange}
        multiple
      />
    </div>
  );
};

export default MultipleUpload;
