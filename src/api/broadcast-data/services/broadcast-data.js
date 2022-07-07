'use strict';

/**
 * broadcast-data service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::broadcast-data.broadcast-data');
