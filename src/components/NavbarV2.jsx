"use client";
import React from "react";
import { BellRing, Coins } from "lucide-react";
import { Tooltip, IconButton } from "@mui/material";
import { getCookie } from "cookies-next";

const NavbarV2 = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = getCookie("is_admin") === "true" ? "Admin" : user.fname+" "+user.lname;
  return (
    <div className="sticky top-0 right-0 border h-[60px] bg-white flex justify-end items-center ml-[16vw]">
      <div className="mr-14 flex gap-5 items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={
              getCookie("is_admin") === "true"
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4kv6PteA44WDU6e58u4VtAqulfVn7lbkjZpM08xmWTQ&s"
                : user.photo
            }
            alt=""
            className="w-9 h-9 rounded-full"
          ></img>
          <p className="font-bold capitalize">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarV2;
