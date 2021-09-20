export const apiConfig = {
  baseUri: process.env.REACT_APP_BASE_URI,

  auth: '',
  users: 'users',
};

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

const FakeAuthService = {
  isAuthenticated: false,

  async signin() {
    FakeAuthService.isAuthenticated = true;

    const payload = await mock(200)(fakeUserResponse);

    return payload;
  },
};

export default FakeAuthService;
