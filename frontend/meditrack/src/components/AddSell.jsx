import React, { useState, useRef, useEffect } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { retrieveToken } from "../constants/token";

export default function AddSell({ open, closeDrawer, updateTable }) {
  const token = retrieveToken();

  const formDataRef = useRef({
    customer: {
      name: "",
      gender: "",
      phone: "",
    },
    medicine: {
      medicineID: 0,
    },
    quantity: 0,
  });
  const [medicines, setMedicines] = useState([]); // Store the fetched medicines here
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/medicines",{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Split the name by '.' to handle nested objects
    const nameParts = name.split(".");
    const topProperty = nameParts[0];
    const subProperty = nameParts[1];

    if (topProperty === "customer") {
      formDataRef.current.customer[subProperty] = value;
    } else if (topProperty === "medicine") {
      formDataRef.current.medicine[subProperty] = value;
    } else {
      formDataRef.current[topProperty] = value;
    }
    console.log(name + " : " + value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formDataRef.current);
    axios
      .post("http://localhost:8080/api/sell/add", formDataRef.current, {
        headers : {
          Authorization : `Bearer ${token}`,
        }
      })
      .then((response) => {
        console.log("Data posted successfully", response.data);
        updateTable(response.data);
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
      <Drawer placement="left" open={open} onClose={closeDrawer}>
        <ToastContainer />
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Add Sell
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
            Fill the sell details.
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Customer Name"
            name="customer.name"
            //  value={formData.medicineName}
            onChange={handleInputChange}
          />

          <select
            name="customer.gender"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <Input
            type="number"
            label="Phone"
            name="customer.phone"
            // value={formData.quantity}
            onChange={handleInputChange}
          />

          <select
            name="medicine.medicineID"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
            onChange={handleInputChange}
          >
            <option value={0}>Select Medicine</option>
            {medicines.map((medicine) => (
              <option key={medicine.medicineID} value={medicine.medicineID}>
                {medicine.medicineName}
              </option>
            ))}
          </select>

          <Input
            type="number"
            label="Quantity"
            name="quantity"
            // value={formData.quantity}
            onChange={handleInputChange}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Drawer>
    </>
  );
}
