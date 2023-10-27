import React, {useState} from "react";
import axios from "axios";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
  Select,
  Option
} from "@material-tailwind/react";

export default function AddMedicine({ open, closeDrawer }) {
  const [formData, setFormData] = useState({
    medicineName: "",
    category: "",
    quantity: "",
    buyingPrice: "",
    sellingPrice: "",
    expirationDate: "",
    company: {
      companyID : ""
    } 
  });

  const handleInputChange = (event) => {
  const { name, value } = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.post("http://localhost:8080/api/medicines/add", formData)
    //   .then((response) => {
    //     console.log("Data posted successfully", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error posting data:", error);
    //   });
    console.log(formData)
  };

  return (
    <>
      <Drawer open={open} onClose={closeDrawer}>
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
           value={formData.medicineName}
           onChange={handleInputChange} 
           />

          <Select name="category" label="Category" value={formData.category} onChange={handleInputChange}>
            <Option value="" disabled>
              Select Category
            </Option>
            <Option value="Fever">Fever</Option>
            <Option value="Allergy">Allerge</Option>
          </Select>

          <Input type="number" label="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange}/>
          
          <Input type="text" label="buyingPrice" name="buyingPrice" value={formData.buyingPrice} onChange={handleInputChange}/>
          
          <Input type="text" label="sellingPrice" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange}/>
          
          <Input type="date" label="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange}/>
          
          <Select label="Company" name="company.companyID" value={formData.company.companyID} onChange={handleInputChange}>
            <Option value="" disabled>
              Select Category
            </Option>
            <Option value="1">MicroOrganic</Option>
            <Option value="2">macroOrg</Option>
          </Select>
          <Button type="submit">Submit</Button>
        </form>
      </Drawer>
    </>
  );
}
