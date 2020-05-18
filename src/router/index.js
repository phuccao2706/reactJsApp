import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { unauthenticateRoutes, authenticateRoutes } from "./routes";
import { GLOBAL_STATE } from "../appConstants";
import { observer, inject } from "mobx-react";

const RouterComponent = inject(({ stores }) => stores)(
  observer((props) => {
    const {
      globalState: { isAuth },
    } = props;

    return (
      <Router>
        <Suspense fallback={<div>Loading Component...</div>}>
          <Switch>
            {unauthenticateRoutes.map(({ component, ...routeProps }, index) => (
              <Route
                key={index}
                {...routeProps}
                render={() => {
                  const Component = React.lazy(() =>
                    import(`../pages/${component}`)
                  );
                  return <Component />;
                }}
              />
            ))}

            {!isAuth && <Redirect to={"/login"} />}

            <Redirect to={"/notfound"} />
          </Switch>
        </Suspense>
      </Router>
    );
  })
);

export default RouterComponent;
