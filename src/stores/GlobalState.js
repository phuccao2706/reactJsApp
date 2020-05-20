import { observable, action, decorate } from "mobx";
import { APP_CONSTANTS } from "../constants/";

export class GlobalState {
  isAuth = !!window.localStorage.getItem(APP_CONSTANTS.TOKEN);
  currentUser = null;
  setState = (object) => {
    Object.keys(object).map((key) => {
      this[key] = object[key];
      return key;
    });
  };
}

decorate(GlobalState, {
  isAuth: observable,
  currentUser: observable,
  setState: action,
});
