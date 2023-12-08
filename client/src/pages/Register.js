import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  //form function for auto refresh page
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.success("Register successfully");

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register-Ecommerce App">
      <div className="register">
        <h1 className="register-heading">Register </h1>

        <form
          style={{ maxWidth: "400px", margin: "auto" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name "
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Your phone no."
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <textarea
              className="form-control"
              id="address"
              rows="2"
              placeholder="Enter your Address"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
