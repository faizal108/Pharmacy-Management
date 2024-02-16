import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon,TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import AddMedicine from "./AddMedicine";
import { retrieveToken } from "../constants/token";

const TABLE_HEAD = [
  "medicineID",
  "category",
  "medicineName",
  "sellingPrice",
  "quantity",
  "expirationDate",
  "buyingDate",
  "buyingPrice",
  "company",
  "",
];

export default function MedicineTable() {
  const token = retrieveToken();
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const medicineAdded = (med) => {
    const updatedData = [
      ...tableData,
      { ...med, company: med.company.companyName },
    ];
    setTableData(updatedData);
  };

  const deleteMedicine = (id) => {
    axios
      .delete(`http://localhost:8080/api/medicines/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        allMedicines();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const allMedicines = () => {
    //console.log("\n\n\ntoken : "+token);
    axios
      .get("http://localhost:8080/api/medicines", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          company: item.company.companyName,
        }));
        setTableData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const lowStockMedicines = () => {
    axios
      .get("http://localhost:8080/api/medicines/low-stock-medicines",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          company: item.company.companyName,
        }));
        setTableData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const expiredMedicines = () => {
    axios
      .get("http://localhost:8080/api/medicines/expired",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          company: item.company.companyName,
        }));
        setTableData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const expiredInMonthMedicines = () => {
    axios
      .get("http://localhost:8080/api/medicines/expire-in-month",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          company: item.company.companyName,
        }));
        setTableData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const TABS = [
    {
      label: "All",
      value: "all",
      callFun: allMedicines,
    },
    {
      label: "Low Stock",
      value: "low stock",
      callFun: lowStockMedicines,
    },
    {
      label: "Expired",
      value: "expired",
      callFun: expiredMedicines,
    },
    {
      label: "Expired In Month",
      value: "expired in month",
      callFun: expiredInMonthMedicines,
    },
  ];

  useEffect(() => {
    //console.log("table-data : " + tableData.length);
    axios
      .get("http://localhost:8080/api/medicines",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          company: item.company.companyName,
        }));
        //console.log(modifiedData);
        setTableData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);

    // If the search input is empty, revert to the original data
    if (inputValue.trim() === '') {
      allMedicines();
    } else {
      // Filter the entire dataset based on multiple fields
      const filteredData = tableData.filter((medicine) =>
        medicine.company.toLowerCase().includes(inputValue.toLowerCase()) ||
        medicine.medicineName.toLowerCase().includes(inputValue.toLowerCase()) ||
        medicine.category.toLowerCase().includes(inputValue.toLowerCase())
      );

      // Set the filtered data to update the table
      setTableData(filteredData);
    }
  };
  
  return (
    <>
      <Card className="h-full w-full py-3">
        <CardHeader
          floated={false}
          shadow={false}
          className="relative h-40 bg-clip-border bg-white text-gray-700 rounded-none m-0 p-4"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Medicines List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all medicine.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={openDrawer}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Medicine
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value, callFun }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="w-fit"
                    onClick={callFun}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            {/* this is search bar */}
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchValue}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll h-[440px] p-0 my-3 no-scrollbar">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-0">
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {tableData.length > 0 ? (
              <tbody>
                {tableData.map(
                  (
                    {
                      medicineID,
                      category,
                      medicineName,
                      sellingPrice,
                      quantity,
                      expirationDate,
                      buyingDate,
                      buyingPrice,
                      company,
                    },
                    index
                  ) => {
                    const isLast = index === tableData.length - 1;
                    const classes = isLast
                      ? "p-2"
                      : "p-2 border-b border-blue-gray-50";

                    return (
                      <tr key={medicineID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {medicineID}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {medicineName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sellingPrice}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {quantity}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {expirationDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {buyingDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {buyingPrice}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {company}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit Medicine">
                            <IconButton variant="text">
                              <TrashIcon className="h-4 w-4" onClick={() => {
                                deleteMedicine(medicineID)
                              }}/>
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            ) : (
              <tbody className="text-center text-blue-gray-500 p-4">
                <tr>
                  <td>No medicines found.</td>
                </tr>
              </tbody>
            )}
          </table>
        </CardBody>
      </Card>
      <AddMedicine
        open={open}
        closeDrawer={closeDrawer}
        updateTable={medicineAdded}
      />
    </>
  );
}
