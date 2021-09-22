import { rest } from 'msw';

import { CookieManager } from 'utils/temp';

const fakeUser = { email: 'user@123', password: '123' };
const COOKIE_NAME = 'auth';
const generateAuthResponse = () => ({
  token: Math.random() * 10000,
  user: fakeUser.email,
});

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email !== fakeUser.email || password !== fakeUser.password) {
      return res(ctx.status(401));
    }

    CookieManager.setCookie({
      name: COOKIE_NAME,
      expiresIn: 10,
    });

    return res(ctx.status(200));
  }),

  rest.post('/logout', (req, res, ctx) => {
    CookieManager.deleteCookie(COOKIE_NAME);

    return res(ctx.status(200));
  }),

  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = !!CookieManager.getCookie(COOKIE_NAME);

    if (!isAuthenticated) {
      return res(ctx.delay(1000), ctx.status(401));
    }

    return res(ctx.delay(2000), ctx.set(200), ctx.json(generateAuthResponse()));
  }),
];
