'use strict';

/**
 *  order controller
 */
const { _ } = require('lodash');
const axios = require('axios');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, local: 'en', populate: '*' }
        const knex = await strapi.db.connection
        // Calling the default core action
        const { data, meta } = await super.find(ctx);
        data.forEach((order) => {
            const status_pengiriman = order.attributes.status_pengiriman;
            const resi = order.attributes.resi;
            const ekpedisi = order.attributes.ekpedisi;
            if (resi && ekpedisi && !status_pengiriman) {
                const data = {
                    "courier": ekpedisi.toLowerCase(),
                    "awb": resi,
                    "external_id": "OrderID",
                    "delay": 2
                }
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc2kuaWQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NDY3MTg5MzYsImV4cCI6MzU0MDE3NDkzNiwibmJmIjoxNjQ2NzE4OTM2LCJqdGkiOiJHU1UyeW52R0ZRb05kTkxXIiwic3ViIjoxNzMyNywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.zMJoO0TshU0chqycxqWnY4lUaTLGNjA2ZC9hsHDdnRw`
                    }
                }
                axios.post('https://resi.id/api/track-queue', data, config)
                axios.get(`https://resi.id/api/track?courier=${ekpedisi.toLowerCase()}&awb=${resi}`, config).then(
                    (res) => {
                        const last_status = res.data.actual_latest_status.status
                        const resi = res.data.summary.awb;
                        // console.log(resi, last_status);
                        knex('orders')
                            .where({ resi: resi })
                            .update({
                                status_pengiriman: last_status
                            }).then(rows => console.log(rows))
                            .catch(er => console.log(er))
                    }
                ).catch(er => console.log(er))
            }
        })
        return { data, meta };
    },
    async create(ctx) {
        const response = await super.create(ctx);
        // some more logic order socket
        strapi.io.emit('orderCreated', response);
        return response;
    },
    async knek(ctx) {
        return 'ok';
    },
    async getStatusPengiriman(ctx) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc2kuaWQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NDY3MTg5MzYsImV4cCI6MzU0MDE3NDkzNiwibmJmIjoxNjQ2NzE4OTM2LCJqdGkiOiJHU1UyeW52R0ZRb05kTkxXIiwic3ViIjoxNzMyNywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.zMJoO0TshU0chqycxqWnY4lUaTLGNjA2ZC9hsHDdnRw`
            }
        }
        const { resi, kurir } = ctx.query
        const res = await axios.get(`https://resi.id/api/track?courier=${kurir.toLowerCase()}&awb=${resi}`, config);
        return res.data
    },
    async updateStatusPengiriman(ctx) {
        const last_status = ctx.request.body.result.actual_latest_status.status
        const resi = ctx.request.body.result.summary.awb;
        const knex = await strapi.db.connection
        const query = knex('orders')
            .where({ resi: resi })
            .update({
                status_pengiriman: last_status
            })
        return query;
    },

    async countOrderByStatus() {
        try {
            const knex = await strapi.db.connection.context.raw(`
            SELECT status, COUNT(*) AS jumlah FROM orders GROUP BY status
            `)
            return { data: knex[0] }
        } catch (error) {
            ctx.body = error
        }
    }
}));
