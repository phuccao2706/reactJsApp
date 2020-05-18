import React from "react";
import { observer } from "mobx-react";

const YetAnotherRandom = observer((props) => {
  console.log(props);
  return <div>something</div>;
});
export default YetAnotherRandom;
