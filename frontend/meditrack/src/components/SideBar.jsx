import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  // ListItemSuffix,
  // Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export default function SideBar() {
  return (
    <>
    <Card className="h-[calc(100vh)] w-1/12max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315" alt="brand" className="h-8 w-8"/>
        <Typography variant="h5" color="blue-gray">
          Meditrack
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Medicine
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Company
        </ListItem>
        <ListItem>
          <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Customer
        </ListItem>
        <ListItem>
          <ListItemPrefix>
          <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Sell
        </ListItem>
        <ListItem>
          <ListItemPrefix>
          <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Buy
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    </>
  );
}
