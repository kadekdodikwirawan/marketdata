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
        // some logic here
        const response = await super.create(ctx);
        // some more logic order socket
        strapi.io.emit('orderCreated', response);
        return response;
    }

}));
