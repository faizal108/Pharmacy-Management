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
import AddCompany from "./AddCompany";

const TABLE_HEAD = [
  "companyID",
  "companyName",
  "phone",
  "email",
  "address",
  "status",
  "creationDate",
  "modifiedDate",
  "",
];

export default function CompanyTable() {
  const token = retrieveToken();

  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const companyAdded = (comp) => {
    const updatedData = [
      ...tableData,
        { ...comp },
    ];
    setTableData(updatedData);
  };
  const allCompany = () => {
    axios
      .get("http://localhost:8080/api/company",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const active = () => {
    axios
      .get("http://localhost:8080/api/company/active",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const deactive = () => {
    axios
      .get("http://localhost:8080/api/company/deactive",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const TABS = [
    {
      label: "All",
      value: "all",
      callFun: allCompany,
    },
    {
      label: "Active",
      value: "active",
      callFun: active
    },
    {
      label: "Deactive",
      value: "deactive",
      callFun: deactive
    }
  ];

  useEffect(() => {
    //console.log("table-data : " + tableData.length);
    axios
      .get("http://localhost:8080/api/company",{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        // const modifiedData = response.data.map((item) => ({
        //   ...item
        // }));
        //console.log(response.data);
        setTableData(response.data);
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
    allCompany();
  } else {
    // Filter the table data based on the partial match of the search value
    const filteredData = tableData.filter((company) =>
      company.companyName.toLowerCase().includes(inputValue.toLowerCase())
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
                Companys List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all companys.
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Company
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
                      companyID,
                      companyName,
                      phone,
                      email,
                      address,
                      status,
                      creationDate,
                      modifiedDate,
                    },
                    index
                  ) => {
                    const isLast = index === tableData.length - 1;
                    const classes = isLast
                      ? "p-2"
                      : "p-2 border-b border-blue-gray-50";

                    return (
                      <tr key={companyID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {companyID}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {companyName}
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
                            {email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {address}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {creationDate}
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
                  <td>No Company Found!</td>
                </tr>
              </tbody>
            )}
          </table>
        </CardBody>
      </Card>
      <AddCompany
        open={open}
        closeDrawer={closeDrawer}
        updateTable={companyAdded}
      />
    </>
  );
}
