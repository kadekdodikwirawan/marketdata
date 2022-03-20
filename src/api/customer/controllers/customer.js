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
                ctx.send(
                    {
                        "data": null,
                        "error": {
                            "status": "404", // HTTP status
                            "name": "", // Strapi error name ('ApplicationError' or 'ValidationError')
                            "message": "Whatsapp tidak ditemukan", // A human reable error message
                            "details": {
                                // error info specific to the error type
                            }
                        }
                    }, 404);
            }
        } catch (err) {
            ctx.body = err;
        }
    },
}));
