import React from "react";

const Loader = ({ text }) => {
  const message = text ? text : "Loading...";
  return (
    <div className="w-full min-h-[300px] flex flex-col justify-center items-center">
      <div className="loader self-center">Loading...</div>
      <h1>{message}</h1>
    </div>
  );
};

export default Loader;
