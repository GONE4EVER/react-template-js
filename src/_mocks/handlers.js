import { rest } from 'msw';

import { CookieManager } from 'utils/temp';

const fakeUser = { email: 'user@123', password: '123' };

const COOKIE_NAME = 'auth';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email !== fakeUser.email || password !== fakeUser.password) {
      return res(ctx.status(403), ctx.json({ message: 'invalid creds' }));
    }

    CookieManager.setCookie({
      name: COOKIE_NAME,
      value: `${email}&&&${new Date()}`,
    });

    return res(
      ctx.set(200),
      ctx.json({
        token: Math.random() * 10000,
        user: fakeUser.email,
      }),
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = !!CookieManager.getCookie(COOKIE_NAME);

    if (!isAuthenticated) {
      return res(ctx.status(401), ctx.json({ auf: 123 }));
    }

    return res(ctx.set(200), ctx.json(fakeUser));
  }),

  rest.post('/logout', (req, res, ctx) => {
    CookieManager.deleteCookie(COOKIE_NAME);

    return res(ctx.status(200));
  }),
];
