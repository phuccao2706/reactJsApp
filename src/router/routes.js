export const authenticateRoutes = [];

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
