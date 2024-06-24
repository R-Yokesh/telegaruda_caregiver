import { element } from "prop-types";
import React from "react";

const DashboardView = React.lazy(() =>
  import("./Views/Dashboard/DashboardView")
);
const MyAccountView = React.lazy(() => import("./Views/Account/MyAccountView"));
const SettingView = React.lazy(() => import("./Views/Settings/SettingsView"));
const PatientDetailsView = React.lazy(() =>
  import("./Views/Dashboard/PatientDetails/PatientDetailsView")
);
const ExistingPatientView = React.lazy(() => import("./Views/ExistingPatient/ExistingPatientView"));
const url = "";
const routes = [
  // { path: url + "/", name: "Home" },
  // { path: url + "/dashboard", name: "Dashboard", element: DashboardView },
  { path: url + "/account", name: "Account", element: MyAccountView },
  { path: url + "/settings", name: "Setting", element: SettingView },
  {
    path: url + "/patient/details",
    name: "Patient",
    element: PatientDetailsView,
  },
  { path: "/patients", name: "ExistingPatients", element: ExistingPatientView }
];

export default routes;