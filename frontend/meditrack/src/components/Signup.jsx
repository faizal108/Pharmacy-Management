import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();
  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

// React component

const createAccount = async () => {
  try {

    const user = {
      username: signupState.username,
      password: signupState.password,
      phone: signupState.phone,
      role: signupState.role, 
    };
    console.log(user);
    // Make a POST request to the server
    const response = await axios.post('http://localhost:8080/api/auth/register', user);

    if (response.status === 200) {
      console.log("Register Successfull :)")

      toast.success("Registration Successful", {
        position: "top-center",
        autoClose: 2000, 
      });
      setTimeout(() => {
        navigate("/")
      }, 2000);

    } else {
      console.log("Register Fail :(");
      toast.error("Registration Failed", {
        position: "top-center",
        autoClose: 2000, 
      });
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
    toast.error("Network Error", {
      position: "top-center",
      autoClose: 2000,
    });
  }
};


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}