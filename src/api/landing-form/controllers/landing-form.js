'use strict';

/**
 *  landing-form controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::landing-form.landing-form', ({ strapi }) => ({
    
    async create(ctx) {
        const response = await super.create(ctx);
        const entry = await strapi.entityService.findOne('api::landing-form.landing-form', response.data.id, {
          populate: { handle_by: true },
        });
        strapi.io.emit('formCreated', entry);
        return entry;
    },
    async update(ctx) {
        const response = await super.update(ctx);
        const entry = await strapi.entityService.findOne('api::landing-form.landing-form', response.data.id, {
          populate: { handle_by: true },
        });
        strapi.io.emit('formUpdated', entry);
        return entry;
    }
}));
