import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footers">
      <h5 className="text-center">All Right Reserved @SnapShop</h5>
      <p className="text-center mt-3">
        <Link to="/About">About </Link>
        <Link to="/Contact">Contact </Link>
        <Link to="/Privacypolicy">PrivacyPolicy </Link>
      </p>
    </div>
  );
};

export default Footer;
