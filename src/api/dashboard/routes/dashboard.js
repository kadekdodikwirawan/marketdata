module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/dashboard',
      handler: 'dashboard.exampleAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
