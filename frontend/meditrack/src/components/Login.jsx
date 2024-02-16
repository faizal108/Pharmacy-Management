import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setToken, retrieveToken } from "../constants/token";


const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const token = retrieveToken;
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      const user = {
        email: loginState.email,
        password: loginState.password,
        role: loginState.role,
      };
      console.log(user);
      // Make a POST request to the server
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        user
      );

      if (response.status === 200) {
        console.log("Login Successfull :) token : "+ token);
        setToken(response.data.token)
        console.log("toekn : "+ response.data.token);
        console.log("seted token : "+ token);
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        console.log("Login Fail :(");
        toast.error("Login Failed", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
      toast.error("Network Error", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      {/* <FormExtra /> */}
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
