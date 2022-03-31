'use strict';

/**
 * A set of functions called "actions" for `dashboard`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      const knex = await strapi.db.connection.context.raw(`
      SELECT up_users.username, SUM(orders.total_pembayaran) AS gross_profit, COUNT(*) AS jmlh,
      SUM(produks.quantity) AS total_produk
      FROM up_users

      INNER JOIN orders_sales_by_links ON up_users.id=orders_sales_by_links.user_id
      INNER JOIN orders ON orders_sales_by_links.order_id=orders.id,

      JSON_TABLE(
        orders.produk, '$[*]'
        COLUMNS(
        quantity int path '$.quantity'
        )
      ) produks

      GROUP BY up_users.id
      `);
      return { data: knex[0] }

      // const knex = await strapi.db.connection
      // const users_order = await knex.select().table('up_users')
      //   .columns([
      //     'username',
      //     knex.raw('count(*) as totalSales'),
      //     knex.raw('SUM(produks.quantity) AS totalProduk'),
      //     knex.raw('JSON_TABLE(orders.produk, "$[*]" COLUMNS(quantity int path "$.quantity")) produks')
      //   ])
      //   .innerJoin('orders_sales_by_links', 'up_users.id', 'orders_sales_by_links.user_id')
      //   .innerJoin('orders', 'orders_sales_by_links.order_id', 'orders.id')
      //   .groupByRaw('up_users.id');
      // return users_order
    } catch (err) {
      ctx.body = err;
    }
  }
};
