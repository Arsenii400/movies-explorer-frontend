import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoggedInContext } from "../../utils/Context";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {

  const loggedIn = useContext(LoggedInContext);

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
  );
};

export default ProtectedRoute;