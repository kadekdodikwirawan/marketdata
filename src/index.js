'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const getUpServices = (strapi) => strapi.plugins["users-permissions"].services;
    const handshake = (socket) => {
      // console.log(socket.handshake);
      if (socket.handshake.headers && socket.handshake.headers.authorization) {
        const upsServices = getUpServices(strapi);
        upsServices.jwt.verify(socket.handshake.headers.authorization).then((user) => {
          console.log(user);
          socket.data.user = user
          // upsServices.user
          //   .fetchAuthenticatedUser(user.id)
          //   .then((detail) => console.log(detail))
        }).catch((err) => {
          console.log(err);
          socket.disconnect()
        });
      } else {
        console.log('No token');
        // socket.disconnect();
      }
    }
    // strapi after init
    process.nextTick(() => {
      var io = require('socket.io')(strapi.server.httpServer,
        {
          cors: {
            origin: '*',
            methods: ['GET', 'POST'],
          }
        });
      io.on('connection', function (socket) {
        handshake(socket)
        socket.on('disconnect', () => console.log('a user disconnected: ', socket.data));
        socket.on('sendMsg', (e) => {
          io.emit('loadMsg', e)
        })
      });
      strapi.io = io
    })
  },
};
