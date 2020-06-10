export const GLOBAL_STATE = {
  IS_AUTH: "isAuth",
  CURRENT_USER: "currentUser",
  GET_CURRENT_USER: "getCurrentUser",
  initDashboardFromCreate: "initDashboardFromCreate",
  visibleModalDelete: "visibleModalDelete",
};

export const APP_CONSTANTS = {
  BE_URI: "http://localhost:4000/",
  TOKEN: "TOKEN",
  VOTE_TYPE: {
    UP: "upvote",
    DOWN: "downvote",
  },
  dualToneStyle: {
    style: {
      "--fa-primary-color": "#95b4cc",
      "--fa-secondary-color": "#fec9c9",
    },
  },
  routes: {
    ABOUT: "/about",
    IDEAS: "/ideas",
    NOT_FOUND: "/notFound",
    ADD_NEW_IDEA: "/addNewIdea",
    USER_DETAIL: "/userDetail",
  },

  ideaPreviewParamsType: {
    ideas: "ideas",
    bookmarks: "bookmarks",
  },
};
