import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Skeleton } from "antd";
import { observer, inject } from "mobx-react";
import { unauthenticateRoutes, authenticateRoutes } from "./routes";

import LayoutDashboard from "../pages/dashboard/layoutDashboard";
import AuthWrapper from "../pages/dashboard/authWrapper";

const RouterComponent = inject(({ stores }) => stores)(
  observer((props) => {
    const {
      globalState: { isAuth },
    } = props;

    return (
      <Router>
        <Suspense fallback={<Skeleton />}>
          <Switch>
            {!isAuth &&
              unauthenticateRoutes.map(
                ({ component, ...routeProps }, index) => (
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
                )
              )}
            {isAuth && (
              <Route
                exact
                path={[
                  ...authenticateRoutes.map((item) => item.path),
                  "/ideas/:topicId",
                ]}
              >
                <LayoutDashboard>
                  <AuthWrapper>
                    <Suspense fallback={<Skeleton />}>
                      {authenticateRoutes.map(
                        ({ component, ...routeProps }, index) => (
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
                        )
                      )}
                    </Suspense>
                  </AuthWrapper>
                </LayoutDashboard>
              </Route>
            )}

            {!isAuth && <Redirect to={"/login"} />}
            <Redirect exact={true} to={"/notfound"} />
          </Switch>
        </Suspense>
      </Router>
    );
  })
);

export default RouterComponent;
