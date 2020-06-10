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
import DetailUser from "../pages/dashboard/userDetail";
import IdeasComponent from "../pages/dashboard/ideas";
import AboutComponent from "../pages/dashboard/about";
import AddNewIdea from "../pages/dashboard/addNewIdea";
import NotFoundComponent from "../pages/dashboard/notFound";

import { APP_CONSTANTS } from "../constants";
import IdeaDetailComponent from "../pages/dashboard/ideaDetail";

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
                path={`${APP_CONSTANTS.routes.ABOUT}`}
                render={() => <AboutComponent />}
              />
            )}

            {isAuth && (
              <LayoutDashboard>
                <AuthWrapper>
                  {/* <Suspense fallback={<Skeleton />}> */}
                  <Switch>
                    <Route exact={true} path={"/"}>
                      <Redirect to={"/ideas"} />
                    </Route>

                    <Route path={`${APP_CONSTANTS.routes.IDEAS}`}>
                      <IdeasComponent />
                    </Route>

                    <Route path={`${APP_CONSTANTS.routes.ADD_NEW_IDEA}`}>
                      <AddNewIdea />
                    </Route>

                    <Route
                      path={`${APP_CONSTANTS.routes.USER_DETAIL}/:username`}
                    >
                      <DetailUser />
                    </Route>
                    {/* <Route path={`${APP_CONSTANTS.routes.IDEAS}/:topicId`}>
                      <IdeaDetailComponent />
                    </Route> */}
                    {/* <Route>
                      <NotFoundComponent />
                    </Route> */}
                  </Switch>
                </AuthWrapper>
              </LayoutDashboard>
            )}

            {!isAuth && <Redirect to={"/login"} />}
            {/* <Redirect exact={true} to={"/notfound"} /> */}
          </Switch>
        </Suspense>
      </Router>
    );
  })
);

export default RouterComponent;
