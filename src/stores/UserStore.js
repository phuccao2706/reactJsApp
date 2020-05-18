import { observable, decorate } from "mobx";

export class AnotherStore {
  counter = 0;

  @observable anotherCounter = 1;
}

decorate(AnotherStore, {
  counter: observable,
});
