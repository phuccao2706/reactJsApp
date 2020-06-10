import React from "react";
import { APP_CONSTANTS } from "../../constants";

export default function AvatarComponent({
  type = "solid" || "regular" || "light" || "duotone",
  icon,
}) {
  const getType = (type) => {
    switch (type) {
      case "solid":
        return "fas";

      case "regular":
        return "far";

      case "light":
        return "fal";

      default:
        return "";
    }
  };
  return type === "duotone" ? (
    <i {...APP_CONSTANTS.dualToneStyle} className={`fad fa-${icon}`}></i>
  ) : (
    <i className={`${getType(type)} fa-${icon}`}></i>
  );
}
