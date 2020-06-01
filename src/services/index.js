import axios from "axios";
import { notification } from "antd";
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

export default { call, openNotification };
