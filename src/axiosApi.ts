import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://bss94js25-default-rtdb.europe-west1.firebasedatabase.app/'
});
export default axiosApi;