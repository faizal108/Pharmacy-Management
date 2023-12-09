import React from "react";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Button,

} from "@material-tailwind/react";
import { setToken } from "../constants/token";
import { toast, ToastContainer } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = () => {
    setToken("");
    toast.success("logout Successful", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <Card className="h-full w-full py-3 ">
      <ToastContainer />
      <Typography variant="h5" color="blue-gray">
        Are you sure you want to logout ?
      </Typography>
      <Button className="flex py-3 w-fit h-10" size="sm" onClick={handleClick}>
        <CgLogOut strokeWidth={2} className="h-4 w-4" /> Logout
      </Button>
    </Card>
  );
}
