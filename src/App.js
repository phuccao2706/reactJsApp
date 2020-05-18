import React from "react";
// import { StoreProvider } from "./stores/UserStore";
import Random from "./random/Random";
import AnotherRandom from "./random/AnotherRandom";
import YetAnotherRandom from "./random/YetAnotherRandom";
import { observer } from "mobx-react";

const App = observer((props) => {
  return (
    <div className="App">
      <Random />
      {/* <YetAnotherRandom /> */}
    </div>
  );
});

export default App;
