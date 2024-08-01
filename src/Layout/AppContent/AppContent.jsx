import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../../routes";

const AppContent = () => {
  return (
    <Suspense>
      <Routes>
        {routes.map((route, idx) => {
          // console.log("path", routes.path)
          if (route.element) {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                element={<route.element />}
              />
            );
          }
          return null;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppContent;
