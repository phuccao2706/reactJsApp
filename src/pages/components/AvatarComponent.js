import React from "react";
import { Avatar } from "antd";

export default function AvatarComponent({
  avatarUrl,
  firstname = " ",
  lastname = " ",
  size = "large",
  backgroundColor = "#CCCCCC",
}) {
  const avatarProps = {
    style: {
      backgroundColor,
      verticalAlign: "middle",
      userSelect: "none",
    },
    size,
    shape: "square",
  };

  return avatarUrl ? (
    <Avatar {...avatarProps} src={avatarUrl} />
  ) : (
    <Avatar {...avatarProps}>
      {`${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`}
    </Avatar>
  );
}
