'use strict';

/**
 * whatsapp-capi service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::whatsapp-capi.whatsapp-capi');
