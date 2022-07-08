'use strict';

/**
 *  customer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer.customer', ({ strapi }) => ({

    async findCustomerByWhatsapp(ctx) {
        try {
            const entry = await strapi.db.query('api::customer.customer').findOne({
                populate: true,
                where: { whatsapp: ctx.params.id }
            })
            if (entry) {
                ctx.body = {
                    data: entry
                };
            } else {
                return ctx.notFound('Whatsapp tidak ditemukan');
            }
        } catch (err) {
            ctx.body = err;
        }
    },

    async broadcastFn(ctx) {
        try {
            const bd_done = await strapi.db.connection.context.raw(`
                SELECT broadcast FROM up_users WHERE broadcast IS NOT NULL
                `)
            const rawData = bd_done[0];
            const array = [];
            await rawData.map((e) => {
                const arr = JSON.parse(e.broadcast);
                const result = arr.data;
                array.push(...result);
            });
            return { data: array };
        } catch (error) {
            ctx.body = error
        }
    },

    async dataToBc(ctx) {
        try {
            const { id, limit, sort } = ctx.request.body;
            if (id.length != 0) {
                const entry = await strapi.db.query('api::broadcast-data.broadcast-data').findMany({
                    where: {
                        id: {
                            $notIn: id,
                        },
                    },
                    limit: limit,
                    orderBy: sort
                });
                return { data: entry }
            } else {
                const entry = await strapi.db.query('api::broadcast-data.broadcast-data').findMany({
                    limit: limit,
                    orderBy: sort
                });
                return { data: entry }
            }
        } catch (error) {
            ctx.body = error
        }
    }
}));
