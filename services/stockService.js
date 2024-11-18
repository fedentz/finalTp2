import Stock from "../models/Stock.js";
import Product from "../models/Product.js";

const StockService = {
    async getAllStocks() {
        // Obtiene todos los registros de stock
        const stocks = await Stock.findAll({
          attributes: ["id", "productId", "adjustment", "reason", "createdAt"], // Selecciona los campos necesarios
          order: [["createdAt", "DESC"]], // Ordena por fecha de creación descendente
        });
        return stocks;
      },
    
      async getAllStocksByProduct(productId) {
        // Verifica que el productoId sea válido
        if (!productId) {
          throw new Error("Product ID is required");
        }
    
        // Obtiene todos los registros para un producto específico
        const stocks = await Stock.findAll({
          where: { productId },
          attributes: ["id", "adjustment", "reason", "createdAt"], // Selecciona los campos necesarios
          order: [["createdAt", "DESC"]], // Ordena por fecha de creación descendente
        });
    
        return stocks;
      },
  async deleteStock(stockId) {
    // Busca el registro de stock por ID
    const stockRecord = await Stock.findByPk(stockId);

    if (!stockRecord) {
      throw new Error("Stock record not found");
    }

    // Busca el producto relacionado
    const product = await Product.findByPk(stockRecord.productId);
    if (!product) {
      throw new Error("Associated product not found");
    }

    // Contrarresta el efecto del ajuste en el stock del producto
    product.stock -= stockRecord.adjustment; // Resta el ajuste del registro eliminado
    await product.save(); // Guarda los cambios en el producto

    // Elimina el registro de la tabla Stock
    await stockRecord.destroy();

    return {
      success: true,
      message: `Stock record deleted and adjustment reversed for product ${product.name}`,
      product,
    };
  },
};

export default StockService;
