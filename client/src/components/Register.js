import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
//import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { email, password, name};
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"}
        ,
        body: JSON.stringify(body)
      });

      const parseRes = await response.json()
      localStorage.setItem("token", parseRes.token);
      setAuth(true);

    } catch (err) {
      console.error(err.message)
      
    }
    
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default Register;