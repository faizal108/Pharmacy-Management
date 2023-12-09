import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
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
import { retrieveToken } from "../constants/token";

const TABLE_HEAD = [
  "customerid",
  "name",
  "gender",
  "phone",
  "local_date",
  "modified_date",
  "",
];

export default function CustomerTable() {
  const token = retrieveToken();
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);

  
  const allCustomer = ()=>{
    axios
    .get("http://localhost:8080/api/customers",{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      //console.log(response.data);
      const modifiedData = response.data.map((item) => ({
        ...item
      }));
      setTableData(modifiedData);
      //console.log(modifiedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }
  const TABS = [
    {
      label: "All",
      value: "all",
      callFun: allCustomer,
    },
  ];
  useEffect(() => {
    //console.log("table-data : " + tableData.length);
    axios
      .get("http://localhost:8080/api/customers",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        const modifiedData = response.data.map((item) => ({
          ...item
        }));
        setTableData(modifiedData);
        //console.log(modifiedData);
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
      allCustomer();
    } else {
      // Filter the entire dataset based on name and phone
      const filteredData = tableData.filter((customer) =>
        customer.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        customer.phone.toLowerCase().includes(inputValue.toLowerCase())
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
                Customer List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Customers.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
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
                    { customerID, name, gender, phone, localDate, modifiedDate },
                    index
                  ) => {
                    const isLast = index === tableData.length - 1;
                    const classes = isLast
                      ? "p-2"
                      : "p-2 border-b border-blue-gray-50";

                    return (
                      <tr key={customerID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {customerID}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {gender}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {localDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {modifiedDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
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
                  <td>No Sells Found!</td>
                </tr>
              </tbody>
            )}
          </table>
        </CardBody>
      </Card>

    </>
  );
}
