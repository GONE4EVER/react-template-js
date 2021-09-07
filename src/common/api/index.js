export function fetchCount(amount = 1) {
  return new Promise(resolve => setTimeout(() => resolve({ data: amount }), 500));
}

export const mock =
  (timeout, falsy = false) =>
  (data = {}) =>
    new Promise((resolve, reject) =>
      setTimeout(() => (falsy ? reject(data) : resolve(data)), timeout),
    );

const fakeUserResponse = {
  firstName: 'Axel',
  lastName: 'Rose',
  email: 'axel.rose@gmail.com',
  picture: '',

  token: '123axel321rose123guns321and123roses321',
};

export const fakeAuth = {
  isAuthenticated: false,

  async signin() {
    fakeAuth.isAuthenticated = true;

    const payload = await mock(200)(fakeUserResponse);

    return payload;
  },

  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
