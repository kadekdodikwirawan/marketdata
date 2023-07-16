module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/capi',
        handler: 'whatsapp-capi.postCapi',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ]
}