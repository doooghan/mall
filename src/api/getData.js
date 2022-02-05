import { SUCCESS_CODE, TIMEOUT } from "./config";
import { getJSON } from "./ajax";

export const getData = (url, options) => {
  return getJSON(url, { timeoutTime: TIMEOUT, ...options })
    .then((response) => {
      if (response.code != SUCCESS_CODE) {
        throw new Error(`出错了 ${response.code}`);
      }
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
