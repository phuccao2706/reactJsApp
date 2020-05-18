import React from "react";
import { observer } from "mobx-react";

const Random = observer((props) => {
  console.log(props);
  return <div>some thing yay</div>;
});

export default Random;
