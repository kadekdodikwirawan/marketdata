'use strict';

/**
 *  broadcast-data-beli controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::broadcast-data-beli.broadcast-data-beli', ({ strapi }) => ({

    async get_bc_data_beli(ctx){
        const { limit, sort, status } = ctx.request.body;
        const entry = await strapi.db.connection.context.raw(`
                SELECT * FROM broadcast_data_belis WHERE is_broadcasted IS FALSE ORDER BY RAND() LIMIT ${limit}
                `)
            return { data: entry[0] }
    },

    async update_broadcast_data(ctx){
        try { 
            const { ids } = ctx.request.body;
            const entry = await strapi.db.query('api::broadcast-data-beli.broadcast-data-beli').updateMany({
                where: { id: { $in: ids } },
                data: { is_broadcasted: true }
            })
            return { data: entry }
        }catch(err){
            console.log(err);
        }
    }

}));