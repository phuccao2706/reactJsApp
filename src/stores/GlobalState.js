import { observable, action, decorate } from "mobx";

export class GlobalState {
  isAuth = false;
  setState = (state, value) => (this[state] = value);
}

decorate(GlobalState, {
  counter: observable,
  setState: action,
});
