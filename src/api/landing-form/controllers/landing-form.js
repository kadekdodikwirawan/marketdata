'use strict';

/**
 *  landing-form controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::landing-form.landing-form', ({ strapi }) => ({
    
    async create(ctx) {
        const response = await super.create(ctx);
        strapi.io.emit('formCreated', response);
        const entry = await strapi.entityService.findOne('api::landing-form.landing-form', response.data.id, {
            populate: { handle_by: true },
          });
        return entry;
    },
    async update(ctx) {
        const response = await super.update(ctx);
        strapi.io.emit('formUpdated', response);
        const entry = await strapi.entityService.findOne('api::landing-form.landing-form', response.data.id, {
            populate: { handle_by: true },
          });
        return entry;
    }
}));
