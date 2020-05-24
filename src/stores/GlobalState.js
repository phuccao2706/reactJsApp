import { observable, action, decorate } from "mobx";
import { APP_CONSTANTS } from "../constants/";

export class GlobalState {
  isAuth = !!window.localStorage.getItem(APP_CONSTANTS.TOKEN);

  currentUser = null;

  ideasToShow = [];

  setState = (object) => {
    // console.log(object);
    Object.keys(object).map((key) => {
      this[key] = object[key];
      return key;
    });
  };

  handleIdeaChange = (idea) => {
    const index = this.ideasToShow.map((item) => item._id).indexOf(idea._id);

    if (~index) {
      this.ideasToShow[index] = idea;
    }
  };
}

decorate(GlobalState, {
  isAuth: observable,
  currentUser: observable,
  ideasToShow: observable,
  setState: action,
  handleIdeaChange: action,
});
