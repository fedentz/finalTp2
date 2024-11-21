import Stock from "../models/Stock.js";
import Product from "../models/Product.js";

const StockService = {
    async getAllStocks() {
        const stocks = await Stock.findAll({
          attributes: ["id", "productId", "adjustment", "reason", "createdAt"],
          order: [["createdAt", "DESC"]],
        });
        return stocks;
      },
    
      async getAllStocksByProduct(productId) {
        if (!productId) {
          throw new Error("Product ID is required");
        }
        const stocks = await Stock.findAll({
          where: { productId },
          attributes: ["id", "adjustment", "reason", "createdAt"], 
          order: [["createdAt", "DESC"]],
        });
    
        return stocks;
      },
  async deleteStock(stockId) {
    const stockRecord = await Stock.findByPk(stockId);

    if (!stockRecord) {
      throw new Error("Stock record not found");
    }
    const product = await Product.findByPk(stockRecord.productId);
    if (!product) {
      throw new Error("Associated product not found");
    }

    product.stock -= stockRecord.adjustment;
    await product.save(); 

    await stockRecord.destroy();

    return {
      success: true,
      message: `Stock record deleted and adjustment reversed for product ${product.name}`,
      product,
    };
  },
};

export default StockService;
