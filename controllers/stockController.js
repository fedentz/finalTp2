import StockService from "../services/stockService.js";

const StockController = {
    async getAllStocks(req, res) {
        try {
          const stocks = await StockService.getAllStocks(); 
          res.status(201).send(stocks);
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
    
      async getAllStocksByProduct(req, res) {
        try {
          const { productId } = req.params; 
          const stocks = await StockService.getAllStocksByProduct(productId); 
          res.status(201).send(stocks);
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
  async deleteStock(req, res) {
    try {
      const { id } = req.params; 
      const result = await StockService.deleteStock(id); 
      res.status(201).send(result);    
    } catch (error) {
      res.status(400).send({ error: error.message }); 
    }
  },
};

export default StockController;
