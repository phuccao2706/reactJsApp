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
                exact
                path={[
                  ...authenticateRoutes.map((item) => item.path),
                  "/ideas/:topicId",
                  "/userDetail/:topicId/",
                  "/userDetail/:topicId/:type",
                  "/userDetail/:topicId/idea/:topicId",
                ]}
              >
                <LayoutDashboard>
                  <AuthWrapper>
                    <Suspense fallback={<Skeleton />}>
                      <Route
                        path={`${APP_CONSTANTS.routes.IDEAS}`}
                        render={() => <IdeasComponent />}
                      />

                      <Route
                        path={`${APP_CONSTANTS.routes.ADD_NEW_IDEA}`}
                        render={() => <AddNewIdea />}
                      />

                      <Route
                        path={`${APP_CONSTANTS.routes.ABOUT}`}
                        render={() => <AboutComponent />}
                      />

                      <Route
                        path={`${APP_CONSTANTS.routes.USER_DETAIL}/:username`}
                        render={() => <DetailUser />}
                      />

                      <Route
                        exact
                        path={`${APP_CONSTANTS.routes.IDEAS}/:topicId`}
                        render={() => (
                          <IdeaDetailComponent
                          // fromUserDetail={true}
                          // getUser={() => this.getUser(userDetail.username)}
                          />
                        )}
                      ></Route>
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
