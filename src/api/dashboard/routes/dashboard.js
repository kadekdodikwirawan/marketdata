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
    {
      method: 'GET',
      path: '/orderbydate',
      handler: 'dashboard.getOrderbyDate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};