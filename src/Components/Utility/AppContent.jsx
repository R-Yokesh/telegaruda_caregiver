import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../Utility/RouteConstants';

const AppContent = () => {
  return (
    <Suspense >
      <Routes>
        {routes.map((route, idx) => {
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
  )
}

export default AppContent