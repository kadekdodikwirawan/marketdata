'use strict';

/**
 * A set of functions called "actions" for `dashboard`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      const start = new Date(ctx.query.start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const date = new Date(ctx.query.end);
      const endISO = date.setUTCHours(23);
      const end = new Date(endISO).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const knex = await strapi.db.connection.context.raw(`
      SELECT
      up_users.username,
      SUM(orders.total_pembayaran) AS gross_profit,
      COUNT(*) AS jmlh,
      SUM(produks.quantity) AS total_produk,
      COUNT(IF(orders.status_pengiriman LIKE '%retur%', orders.status_pengiriman, null)) AS rts
      FROM up_users

      INNER JOIN orders_sales_by_links ON up_users.id=orders_sales_by_links.user_id
      INNER JOIN orders ON orders_sales_by_links.order_id=orders.id,

      JSON_TABLE(
        orders.produk, '$[*]'
        COLUMNS(
        quantity int path '$.quantity'
        )
      ) produks
      WHERE orders.created_at BETWEEN '${start}' AND '${end}'
      GROUP BY up_users.id
      `);
      return { data: knex[0] }
    } catch (err) {
      ctx.body = err;
    }
  },

  async getOrderbyDate(ctx) {
    try {
      const start = new Date(ctx.query.start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const date = new Date(ctx.query.end);
      const endISO = date.setUTCHours(23);
      const end = new Date(endISO).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const knex = await strapi.db.connection.context.raw(`
      SELECT DATE_FORMAT(created_at, '%d %M %y') AS ForDate,
      COUNT(*) AS total_order,
      COUNT(IF(orders.status_pengiriman LIKE '%retur%', orders.status_pengiriman, null)) AS rts,
      COUNT(IF(orders.status_pengiriman LIKE '%terima%', orders.status_pengiriman, null)) AS tandaTerima
      FROM orders
      WHERE created_at BETWEEN '${start}' AND '${end}'
      GROUP BY ForDate
      `);
      return { data: knex[0] }
    } catch (error) {
      ctx.body = error
    }
  },

  async resetUserBc(ctx) {
    try {
      await strapi.db.connection.context.raw(`
      UPDATE up_users SET broadcast = NULL  WHERE broadcast IS NOT NULL
      `)
      return { data: 'ok' }
    } catch (error) {
      ctx.body = error
    }
  }
};
