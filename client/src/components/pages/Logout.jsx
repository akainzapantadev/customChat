import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function Logout() {
  React.useEffect(() => {
    localStorage.clear();
    Swal.fire({
      title: "Logout Successful",
      icon: "success",
      text: "We will miss you!",
    }).then(function () {
      window.location.reload();
    });
  });

  return <Navigate to="/" />;
}

export default Logout;
