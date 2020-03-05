const ShopifyClient = require("../../libs/shopyfy");

class Products {
  constructor() {
    this.shopify = new ShopifyClient().shopify;
  }

  async listProducts(params) {
    if (!params) {
      params = { limit: 10 };
    }

    const products = await this.shopify.product.list(params);
    return this._clearResponse(products);
  }

  async getProduct(productId) {
    if (!productId) {
      throw new Error("ProductId is required");
    }

    const product = await this.shopify.product.get(productId);
    return this._clearResponse([product]);
  }

  async addProduct(params) {
    if (!params) {
      throw new Error("Empty product data");
    }

    const product = await this.shopify.product.create(params.product);
    const variant = await this.shopify.productVariant.create(
      product.id,
      params.variant
    );
    return {
      productId: product.id
    };
  }

  _clearResponse(products) {
    if (!products) {
      throw new Error("Empty Response");
    }

    let response = [];

    for (let i in products) {
      response.push({
        name: products[i].title,
        description: products[i].body_html,
        images: products[i].image ? products[i].image.src : "",
        price: products[i].variants[0].price
      });
    }

    return response;
  }
}

module.exports = Products;
