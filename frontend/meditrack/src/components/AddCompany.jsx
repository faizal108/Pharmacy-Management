import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCompany({ open, closeDrawer, updateTable }) {
  const formDataRef = useRef({
    medicineName: "",
    phone: "",
    email: "",
    address: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'company') {
      formDataRef.current[name] = { companyID: value };
    } else {
      formDataRef.current[name] = value;
    }
    console.log(name + " : "+ value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/api/company/add", formDataRef.current)
      .then((response) => {
        console.log("Data posted successfully", response.data);
        updateTable(response.data)
        toast.success("Adding Successful", {
          position: "top-center",
          autoClose: 2000, 
        });
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
    console.log(formDataRef.current);
    console.log(formDataRef);
  };

  return (
    <>
      <Drawer placement="right" open={open} onClose={closeDrawer}>
      <ToastContainer />
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Add Company
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="mb-5 px-4">
          <Typography variant="small" color="gray" className="font-normal ">
            Fill the company details.
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Company Name"
            name="companyName"
            //  value={formData.medicineName}
            onChange={handleInputChange}
          />


          <Input
            type="number"
            label="Phone"
            name="phone"
            // value={formData.quantity}
            onChange={handleInputChange}
          />

          <Input
            type="email"
            label="Email"
            name="email"
            // value={formData.buyingPrice}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            label="Address"
            name="address"
            // value={formData.sellingPrice}
            onChange={handleInputChange}
          />
          <select
            name="status"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
            onChange={handleInputChange}
          >
            <option value="">
              select status
            </option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
          <Button type="submit">Submit</Button>
        </form>
      </Drawer>
    </>
  );
}
