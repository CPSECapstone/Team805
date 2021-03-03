const getCookie = (key) => {
  const keyEQ = key + '=';
  const ca = document.cookie.split(';');
  for (let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(keyEQ) == 0) {
      return c.substring(keyEQ.length, c.length);
    }
  }
  return null;
};

export const deleteCookie = (key) => {
  document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const isLogin = () => {
  return getCookie('loggedIn');
};
