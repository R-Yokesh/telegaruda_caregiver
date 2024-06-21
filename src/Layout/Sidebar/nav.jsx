import React from "react";
import { CTooltip } from "@coreui/react";
import { Assets } from "../../assets/Assets";

const url = "/telegaruda-caregiver";
export const Sidebar_Menus = [
  {
    name: "Patients",
    subName: "Update & Join Video Consult",
    to: "/patients",
    iconClass: Assets.teleconcult,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  {
    name: "Appointments",
    subName: "Update Availability Detail and More",
    to: "/patient",
    iconClass: Assets.avilability,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  {
    name: "Doctors",
    subName: "Profile User Detail and More",
    to: "/account",
    iconClass: Assets.account,
    iconType: "solid", // Optional, defaults to 'regular'
  },
];
