'use strict';
const axios = require('axios');

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('resi-id')
      .service('myService')
      .getWelcomeMessage();
  },
  addQue: async (ctx) => {
    const { resi, kurir } = ctx.request.body;
    if (resi != "" && kurir != "") {
      const data = {
        "courier": kurir,
        "awb": resi,
        "external_id": "OrderID",
        "delay": 1
      }
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc2kuaWQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NDY3MTg5MzYsImV4cCI6MzU0MDE3NDkzNiwibmJmIjoxNjQ2NzE4OTM2LCJqdGkiOiJHU1UyeW52R0ZRb05kTkxXIiwic3ViIjoxNzMyNywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.zMJoO0TshU0chqycxqWnY4lUaTLGNjA2ZC9hsHDdnRw`
        }
      }
      const resp = await axios.post('https://resi.id/api/track-queue', data, config)
      return resp.data
    } else {
      return ctx.badRequest('Resi tidak boleh kosong', {})
    }
  }
};
