'use strict';

/**
 *  whatsapp-capi controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::whatsapp-capi.whatsapp-capi', ({ strapi }) => ({

    async postCapi(ctx){
        const data = ctx.request.body;
        console.log(data);
        return data;
    }
}));