const getCookie = (key) => {
  const keyEQ = key + '=';
  const ca = document.cookie.split(';');
  for (let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1, c.length);
    if (c.indexOf(keyEQ) == 0) return c.substring(keyEQ.length, c.length);
  }
  return null;
};

export const isLogin = () => {
  if (getCookie('LoggedInUser')) {
    return true;
  }
  return false;
};
