import logger from '../helpers/logger';

let cookie;

try {
  cookie = require('cookie');
} catch (e) {
  logger.error(
    '`cookie` was not found in your dependencies list' +
      ', please install yourself for this feature working properly'
  );
}

export default (req, cookies) => {
  if (!cookie || !cookie.parse) {
    return undefined;
  }
  const { headers } = req;
  const headerCookie =
    (headers && headers.cookie) || (req && req.getHeader('Cookie'));

  if (headerCookie) {
    if (cookies) {
      const parsedCookie = cookie.parse(headerCookie);
      for (const cookie in parsedCookie) {
        cookies[cookie] = parsedCookie[cookie];
      }
    } else if (!cookies) {
      cookies = cookie.parse(headerCookie);
    }
  }
  return cookies;
};
