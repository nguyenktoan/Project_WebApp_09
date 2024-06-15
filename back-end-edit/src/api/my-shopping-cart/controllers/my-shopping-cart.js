"use strict";

/**
 * A set of functions called "actions" for `my-shopping-cart`
 */

module.exports = {
  getMyShoppingCart: async (ctx, next) => {
    try {
      // console.log(ctx.request);
      const data = await strapi
        .service("api::my-shopping-cart.my-shopping-cart")
        .getMyShoppingCart(ctx.state.user.shoppingcart);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};

("use strict");

/**
 * A set of functions called "actions" for `my-shopping-cart`
 */
