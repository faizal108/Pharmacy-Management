import React, { createElement } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  Typography,
  TabPanel,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import { HiCube } from "react-icons/hi";
import { CgOrganisation } from "react-icons/cg";
import { BsPeopleFill } from "react-icons/bs";
import MedicineTable from "./MedicineTable";
import CompanyTable from "./CompanyTable";
import SellTable from "./SellTable";
import CustomerTable from "./CustomerTable";
import Logout from "./Logout";

export default function MultiTabs() {

  const data = [
    {
      label: "Medicine",
      value: "medicine",
      icon: HiCube,
      component: MedicineTable,
    },
    {
      label: "Customer",
      value: "customer",
      icon: BsPeopleFill,
      component: CustomerTable,
    },
    {
      label: "Company",
      value: "company",
      icon: CgOrganisation,
      component: CompanyTable,
    },
    {
      label: "Sell",
      value: "sell",
      icon: PresentationChartBarIcon,
      component: SellTable,
    },
    {
      label: "Logout",
      value: "logout",
      icon: PowerIcon,
      component: Logout,
    },
  ];

  return (
    <Tabs value="medicine" orientation="vertical" className="w-screen h-screen">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 w-2/12 p-4 shadow-xl shadow-blue-gray-900/5 z-[0]">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
            alt="brand"
            className="h-8 w-8"
          />
          <Typography variant="h5" color="blue-gray">
            Meditrack
          </Typography>
        </div>
        <TabsHeader className="">
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value} className="justify-start">
              <div className="w-full flex h-full gap-x-6 my-2 items-center">
                {createElement(icon, { className: "h-5 w-5" })}
                <p className="">{label}</p>
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </div>
      <TabsBody>
        {data.map(({ value, component, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {component()}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
