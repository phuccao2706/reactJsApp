import axios from "axios";
import { notification } from "antd";

export const openNotification = (
  { statusText, data: { message } },
  placement,
  type
) => {
  notification[type]({
    message,
    description: statusText,
    placement,
  });
};

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const call = async (method, path, data) => {
  try {
    const response = await axios[method](`http://localhost:4000/${path}`, data);

    return response.data;
  } catch ({ response }) {
    openNotification(response, "bottomLeft", "error");
  }
};

export default { call, setToken, openNotification };
