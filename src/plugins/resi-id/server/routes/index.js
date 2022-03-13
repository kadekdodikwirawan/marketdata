module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/track',
    handler: 'myController.addQue',
    config: {
      policies: [],
    },
  },
];
