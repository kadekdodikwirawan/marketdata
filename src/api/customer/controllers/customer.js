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
            const { limit, sort, status } = ctx.request.body;
            // const entry = await strapi.db.query('api::broadcast-data.broadcast-data').findMany({
            //     where: {
            //         $or: [
            //             {is_broadcasted: {$eq: false }},
            //             {is_broadcasted: {$null: true }},
            //         ],
            //         //status: { $eq: 'buyer' }
            //     },
            //     limit: limit,
            //     orderByRaw: 'RAND()'
            // });
            const entry = await strapi.db.connection.context.raw(`
                SELECT * FROM broadcast_datas WHERE is_broadcasted IS FALSE ORDER BY RAND() LIMIT ${limit}
                `)
            return { data: entry[0] }
        } catch (error) {
            ctx.body = error
        }
    },
    async update_broadcast_data(ctx) {
        try { 
            const { ids } = ctx.request.body;
            const entry = await strapi.db.query('api::broadcast-data.broadcast-data').updateMany({
                where: { id: { $in: ids } },
                data: { is_broadcasted: true }
            })
            return { data: entry }
        }catch(err){
            console.log(err);
        }
    },
    async reset_broadcast_data(ctx) {
        try {
            const { status } = ctx.request.body;
            if(status){
                const entry = await strapi.db.query('api::broadcast-data.broadcast-data').updateMany({
                    where: { status },
                    data: { is_broadcasted: false }
                })
                return { data: entry }
            }else{
                const entry = await strapi.db.query('api::broadcast-data.broadcast-data').updateMany({
                    data: { is_broadcasted: false }
                })
                return { data: entry }
            }
        }catch(err){
            console.log(err);
        }
    }
}));
