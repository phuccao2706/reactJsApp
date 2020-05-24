export const authenticateRoutes = [
  {
    path: "/",
    exact: true,
    component: "dashboard/ideas",
  },
  {
    path: "/about",
    exact: true,
    component: "dashboard/about",
  },
  {
    path: "/idea/:_id",
    exact: true,
    component: "dashboard/ideaDetail",
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
