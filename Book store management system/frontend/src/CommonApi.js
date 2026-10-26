
import axios from "axios";

export const commonapi = async (httpmethod, url, reqbody) => {
  const reqConfig = {
    method: httpmethod,
    url: url,
    data: reqbody,
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await axios(reqConfig);
    return response.data;
  } catch (err) {
    throw err;
  }
};
