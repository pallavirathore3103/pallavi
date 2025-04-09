import axios from "axios";
import { BASE_API_URL} from "./config"
// import secureLocalStorage from "react-secure-storage";

export const axiosInstance = (() => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: { "Content-Type": "application/json" },
  });

  // const token = secureLocalStorage.getItem("admin-token");
  // if (token) {
  //   instance.defaults.headers.common["Authorization"] = token;
  // }

  return instance;
})();








