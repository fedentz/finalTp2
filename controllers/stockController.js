import StockService from "../services/stockService.js";

const StockController = {
    async getAllStocks(req, res) {
        try {
          const stocks = await StockService.getAllStocks(); // Llama al servicio para obtener todos los registros
          res.status(200).json(stocks);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
    
      async getAllStocksByProduct(req, res) {
        try {
          const { productId } = req.params; // ID del producto desde los parámetros
          const stocks = await StockService.getAllStocksByProduct(productId); // Llama al servicio
          res.status(200).json(stocks);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
  async deleteStock(req, res) {
    try {
      const { id } = req.params; // ID del registro en la tabla Stock
      const result = await StockService.deleteStock(id); // Llama al servicio
      res.status(200).json(result); // Responde con el resultado
    } catch (error) {
      res.status(400).json({ error: error.message }); // Maneja errores
    }
  },
};

export default StockController;
