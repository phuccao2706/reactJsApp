const routes = {
  ABOUT: "/about",
  IDEAS: "/ideas",
  NOT_FOUND: "/notFound",
  ADD_NEW_IDEA: "/addNewIdea",
};

// export const authenticateRoutes = [
//   {
//     path: "/about",
//     exact: true,
//     component: "dashboard/about",
//   },
//   {
//     path: "/ideas",
//     component: "dashboard/ideas",
//   },
//   {
//     path: "/notfound",
//     component: "dashboard/notfound",
//   },
//   {
//     path: "/addNewIdea",
//     component: "dashboard/addNewIdea",
//   },
// ];

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
