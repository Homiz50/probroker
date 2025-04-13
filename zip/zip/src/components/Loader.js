// import React from "react";
// import "./loader.css";
// import { Spinner } from "reactstrap";

// const Loader = () => (
//   <Spinner animation="border" variant="primary" />
// );

// export default Loader;

import React from "react";

const Loader = () => (
  <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

export default Loader;
