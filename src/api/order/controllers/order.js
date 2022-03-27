'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, local: 'en', populate: '*' }

        // Calling the default core action
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
    async create(ctx) {
        const kab = ctx.request.body.data.kabupaten
        const clear_kab = kab.substring(kab.indexOf('-') + 1);
        ctx.request.body.data.kabupaten = clear_kab
        const prov = ctx.request.body.data.provinsi
        const clear_prov = prov.substring(prov.indexOf('-') + 1);
        ctx.request.body.data.provinsi = clear_prov

        const response = await super.create(ctx);
        // some more logic order socket
        strapi.io.emit('orderCreated', response);
        return response;
    }

}));
