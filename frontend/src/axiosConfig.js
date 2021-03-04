import axios from 'axios';
axios.defaults.withCredentials = true;
/**
 *
 */
function createInterceptor() {
  const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status == 401) {
          axios.interceptors.response.eject(interceptor);
          return refreshToken(error);
        }
        return Promise.reject(error);
      });

  /**
   * @return {Promise} - The AxiosPromise resolution,
   * reject promise if token refresh failed
   * retry the request if refresh succeeds.
   * @param {*} error - the unauthorized request
   */
  async function refreshToken(error) {
    await axios.post('/token')
        .then((res) => {
          if (res.status != 200) {
            return Promise.reject(error);
          }
        })
        .catch((err) => {
          return Promise.reject(error);
        })
        .finally(createInterceptor());
    return axios(error.config);
  }
}

export default createInterceptor;
