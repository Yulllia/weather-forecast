import React from "react";
import { Routes, Route, Link, useRoutes } from "react-router-dom";
import AuthGoogle from "./components/auth/AuthGoogle";
import TripList from "./components/tripList/TripList";
import Logout from "./components/logout/Logout";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {

  
  const routes = [
    {
      path: "/trips",
      element: (
        <>
          <Logout />
          <div>
            <TripList />
          </div>
        </>
      ),
    },
    {
      path: "/",
      element: <AuthGoogle />,
    },
  ];

  const element = useRoutes(routes);

  return <RecoilRoot>{element}</RecoilRoot>;
};

export default App;
