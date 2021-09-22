export const CookieManager = {
  getCookie(cookieName) {
    const name = `cookiename=${cookieName}`;
    const allCookies = document.cookie.split(';');

    return allCookies.find(cookie => cookie.trim().includes(name));
  },

  setCookie({ name, expiresIn = 1 }) {
    const date = new Date();

    date.setTime(date.getTime() + expiresIn * 60 * 1000);

    document.cookie = `cookiename=${name}; expires=${date.toGMTString()}`;
  },

  deleteCookie(name) {
    document.cookie = `cookiename=${name}; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};
