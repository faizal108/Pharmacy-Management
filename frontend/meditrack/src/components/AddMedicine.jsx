import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  PlusIcon,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCompany from "./AddCompany";
import { retrieveToken } from "../constants/token";

export default function AddMedicine({ open, closeDrawer, updateTable }) {
  const token = retrieveToken();

  const formDataRef = useRef({
    medicineName: "",
    category: "",
    quantity: 0,
    buyingPrice: 0,
    sellingPrice: 0,
    expirationDate: "",
    company: {
      companyID: 0,
    },
  });

  const [openCom, setOpenCom] = useState(false);
  const [companies, setCompanies] = useState([]); // Store the fetched companies here

  // Fetch the companies data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/company", {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const openDrawerCom = () => setOpenCom(true);
  const closeDrawerCom = () => setOpenCom(false);
  const companyAdded = (cmp) => {
    // You can update the companies data or take any other action here if needed.
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "company") {
      formDataRef.current[name] = { companyID: value };
    } else {
      formDataRef.current[name] = value;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/medicines/add", formDataRef.current, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      .then((response) => {
        //console.log("Data posted successfully", response.data);
        updateTable(response.data);
        toast.success("Adding Successful", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
    //console.log(formDataRef.current);
    //console.log(formDataRef);
  };

  return (
    <>
      <Drawer open={open} onClose={closeDrawer} className="z-[9998]	">
        <ToastContainer />
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Add Medicine
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
            Fill the medicine details.
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Medicine Name"
            name="medicineName"
            onChange={handleInputChange}
          />

          <Input
            type="text"
            label="Category"
            name="category"
            onChange={handleInputChange}
          />

          <Input
            type="number"
            label="Quantity"
            name="quantity"
            onChange={handleInputChange}
          />

          <Input
            type="text"
            label="Buying Price"
            name="buyingPrice"
            onChange={handleInputChange}
          />

          <Input
            type="text"
            label="Selling Price"
            name="sellingPrice"
            onChange={handleInputChange}
          />

          <Input
            type="date"
            label="Expiration Date"
            name="expirationDate"
            onChange={handleInputChange}
          />
          <select
            name="company"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
            onChange={handleInputChange}
          >
            <option value={0}>Select Company</option>
            {companies.map((company) => (
              <option key={company.companyID} value={company.companyID}>
                {company.companyName}
              </option>
            ))}
          </select>
          <Button type="submit">Submit</Button>
        </form>
        <Button
          className="flex items-center mx-4 gap-3"
          size="sm"
          onClick={openDrawerCom}
        >
          Add Company
        </Button>
      </Drawer>
      <AddCompany open={openCom} closeDrawer={closeDrawerCom} updateTable={companyAdded} />
    </>
  );
}
