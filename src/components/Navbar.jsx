import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="Navbar">
      <span className="Logo">iChat</span>
      {currentUser && (
        <div className="User">
          {currentUser.displayName && <span>{currentUser.displayName}</span>}
          {currentUser.photoURL && <img src={currentUser.photoURL} alt="" />}
        </div>
      )}
    </div>
  );
};

export default Navbar;
