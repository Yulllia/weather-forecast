import React from "react";
import { useRoutes } from "react-router-dom";
import AuthGoogle from "./components/pages/auth/AuthGoogle";
import TripList from "./components/pages/tripList/TripList";
import Logout from "./components/logout/Logout";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {

  
  const routes = [
    {
      path: "/trips",
      element: (
        < >
          <Logout>
            <TripList />
          </Logout>
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
