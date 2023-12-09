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
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { retrieveToken } from "../constants/token";
import AddSell from "./AddSell";

const TABLE_HEAD = [
  "sellID",
  "customerName",
  "medicineName",
  "quantity",
  "amount",
  "date",
  "",
];

export default function SellTable() {
  const token = retrieveToken();

  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const sellAdded = (sell) => {
    const updatedData = [...tableData, { ...sell }];
    setTableData(updatedData);
  };
  const allSell = () => {
    axios
      .get("http://localhost:8080/api/sell/getall",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          customer: item.customer.name,
          medicine: item.medicine.medicineName
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
      callFun: allSell,
    },
  ];

  useEffect(() => {
    //console.log("table-data : " + tableData.length);
    axios
      .get("http://localhost:8080/api/sell/getall",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          customer: item.customer.name,
          medicine: item.medicine.medicineName
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
      // Fetch all sells
      allSell();
    } else {
      // Filter the entire dataset based on customerName and medicineName
      const filteredData = tableData.filter((sell) =>
        sell.customer.toLowerCase().includes(inputValue.toLowerCase()) ||
        sell.medicine.toLowerCase().includes(inputValue.toLowerCase()) ||
        sell.date.toLowerCase().includes(inputValue.toLowerCase())
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
                Sells List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Sells.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {/* <Button variant="outlined" size="sm">
                view all
              </Button> */}
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={openDrawer}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Sell
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
                    { sellID, customer, medicine, quantity, amount, date },
                    index
                  ) => {
                    const isLast = index === tableData.length - 1;
                    const classes = isLast
                      ? "p-2"
                      : "p-2 border-b border-blue-gray-50";

                    return (
                      <tr key={sellID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sellID}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {customer}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {medicine}
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
                            {amount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
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
      <AddSell open={open} closeDrawer={closeDrawer} updateTable={sellAdded} />
    </>
  );
}
