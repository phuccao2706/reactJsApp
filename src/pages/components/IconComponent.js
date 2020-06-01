import React from "react";
import { APP_CONSTANTS } from "../../constants";

export default function AvatarComponent({ type = "solid" || "duotone", icon }) {
  return type === "solid" ? (
    <i className={`fas fa-${icon}`}></i>
  ) : (
    <i {...APP_CONSTANTS.dualToneStyle} className={`fad fa-${icon}`}></i>
  );
}
