'use strict';

/**
 *  customer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer.customer', ({ strapi }) => ({

    async findCustomerByWhatsapp(ctx) {
        try {
            const entry = await strapi.db.query('api::customer.customer').findOne({
                where: { whatsapp: ctx.params.id }
            })
            if (entry) {
                ctx.body = {
                    data: entry
                };
            } else {
                ctx.send({
                    message: 'Whatsapp tidak ditemukan'
                }, 404);
            }
        } catch (err) {
            ctx.body = err;
        }
    },
}));
