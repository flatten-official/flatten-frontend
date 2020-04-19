import React from "react";
const NotFoundPage = () => {
  return (
    <div className="NotFoundContainer">
      <h1 className="title">Oops!</h1>
      <h3 className="body">We can't find the page you are looking for. The address that you entered does not exist, or has been moved to another location.</h3>
      <h3 className="body">Please use the links in the header or footer to navigate away from this page.</h3>
      <p className="body">Error code: 404</p>
    </div>
  );
};
export default NotFoundPage;
