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

export const setToken = (token) => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    window.localStorage.setItem(APP_CONSTANTS.TOKEN, token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem(APP_CONSTANTS.TOKEN);
  }
};

export const call = async (method, path, data) => {
  try {
    const token = window.localStorage.getItem(APP_CONSTANTS.TOKEN);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios[method](`http://localhost:4000/${path}`, data);
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

export default { call, setToken, openNotification };
