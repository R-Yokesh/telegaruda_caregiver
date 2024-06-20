import React from "react";
import { CTooltip } from "@coreui/react";
import { Assets } from "../../assets/Assets";

const url = "/telegaruda-provider";
export const Sidebar_Menus = [
  {
    name: "Patient",
    subName: "Update & Join Video Consult",
    to: "/patient/details",
    iconClass: Assets.teleconcult,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  {
    name: "Availability",
    subName: "Update Availability Detail and More",
    to: "/patient",
    iconClass: Assets.avilability,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  {
    name: "Account",
    subName: "Profile User Detail and More",
    to: "/account",
    iconClass: Assets.account,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  {
    name: "Settings",
    subName: "Password, 2FA & Preference",
    to: "/settings",
    iconClass: Assets.setting,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  {
    name: "Masters",
    subName: "Add Masters",
    to: "/patient",
    iconClass: Assets.masters,
    iconType: "solid", // Optional, defaults to 'regular'
  },
  // {
  //   name: 'Doctor',
  //   to: '/doctor',
  //   iconClass: 'fa fa-stethoscope', // FontAwesome icon class
  //   iconType: 'solid' // Optional, defaults to 'regular'
  // }
];
