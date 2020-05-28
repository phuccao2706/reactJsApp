import { APP_CONSTANTS } from "../constants";
const { routes } = APP_CONSTANTS;

export const authenticateRoutes = [
  {
    path: routes.ABOUT,
    exact: true,
    component: `dashboard${routes.ABOUT}`,
  },
  {
    path: routes.IDEAS,
    component: `dashboard${routes.IDEAS}`,
  },
  {
    path: routes.NOT_FOUND,
    exact: true,
    component: `dashboard${routes.NOT_FOUND}`,
  },
  {
    path: routes.ADD_NEW_IDEA,
    exact: true,
    component: `dashboard${routes.ADD_NEW_IDEA}`,
  },
];

export const unauthenticateRoutes = [
  {
    path: "/register",
    exact: true,
    component: "register",
  },
  {
    path: "/login",
    exact: true,
    component: "login",
  },
];
