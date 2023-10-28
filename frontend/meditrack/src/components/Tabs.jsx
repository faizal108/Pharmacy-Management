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
} from "@heroicons/react/24/solid";
import MedicineTable from "./MedicineTable";
import SideBar from "./SideBar";

export default function MultiTabs() {
  const data = [
    {
      label: "Medicine",
      value: "medicine",
      icon: InboxIcon,
      component: MedicineTable,
    },
    {
      label: "Customer",
      value: "customer",
      icon: InboxIcon,
      component: SideBar,
    },
    {
      label: "Company",
      value: "company",
      icon: InboxIcon,
      component: MedicineTable,
    },
    {
      label: "Sell",
      value: "sell",
      icon: PresentationChartBarIcon,
      component: SideBar,
    },
    {
      label: "Buy",
      value: "buy",
      icon: ShoppingBagIcon,
      component: MedicineTable,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      component: SideBar,
    },
    {
      label: "Logout",
      value: "logout",
      icon: PowerIcon,
      component: MedicineTable,
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
