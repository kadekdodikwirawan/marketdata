'use strict';

/**
 * A set of functions called "actions" for `dashboard`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      const knex = await strapi.db.connection.context.raw(`
      SELECT up_users.username, COUNT(*) AS 'jmlh' FROM up_users
      INNER JOIN orders_sales_by_links ON up_users.id=orders_sales_by_links.user_id
      INNER JOIN orders ON orders_sales_by_links.order_id=orders.id
      WHERE orders.created_at BETWEEN '2022-03-29 00::00' AND '2022-03-29 23:58:23'
      GROUP BY up_users.id
      `);
      return { data: knex[0] }
    } catch (err) {
      ctx.body = err;
    }
  }
};
