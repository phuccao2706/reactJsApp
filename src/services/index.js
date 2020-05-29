import React from "react";
import axios from "axios";
import { notification, Avatar, Tooltip } from "antd";
import { APP_CONSTANTS } from "../constants/";

export const openNotification = ({ description, message }, placement, type) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

export const call = async (method, path, data) => {
  try {
    const token = window.localStorage.getItem(APP_CONSTANTS.TOKEN);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios[method](
      `${APP_CONSTANTS.BE_URI}${path}`,
      data
    );
    return response.data;
  } catch ({ response }) {
    openNotification(
      { message: response.data.message, description: response.statusText },
      "bottomLeft",
      "error"
    );
    return response;
  }
};

export const AvatarComponent = ({
  imageUrl,
  firstname = " ",
  lastname = " ",
  size = "large",
  backgroundColor = "#CCCCCC",
  toolTip = false,
}) => {
  const avatarProps = {
    style: {
      backgroundColor,
      verticalAlign: "middle",
      userSelect: "none",
    },
    size,
  };

  return toolTip ? (
    imageUrl !== null && imageUrl !== undefined ? (
      <Avatar {...avatarProps} src={imageUrl} />
    ) : (
      <Avatar {...avatarProps}>
        {`${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`}
      </Avatar>
    )
  ) : (
    <Tooltip placement="bottom" title={`${firstname} ${lastname}`}>
      {imageUrl !== null && imageUrl !== undefined ? (
        <Avatar {...avatarProps} src={imageUrl} />
      ) : (
        <Avatar {...avatarProps}>
          {`${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`}
        </Avatar>
      )}
    </Tooltip>
  );
};

export default { call, openNotification, AvatarComponent };
