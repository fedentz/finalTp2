import ShippingService from "../services/shippingZoneService.js";

const ShippingController = {
    async getAllZones(req, res) {
        try {
          const zones = await ShippingService.getAllZones();
          res.status(200).json(zones);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
    
      async createZone(req, res) {
        try {
          const zoneData = req.body;
          const zone = await ShippingService.createZone(zoneData);
          res.status(201).json({ success: true, zone });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
    
      async updateZone(req, res) {
        try {
          const { id } = req.params;
          const updates = req.body;
          const updatedZone = await ShippingService.updateZone(id, updates);
          res.status(200).json({ success: true, updatedZone });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
    
      async deleteZone(req, res) {
        try {
          const { id } = req.params;
          await ShippingService.deleteZone(id);
          res.status(200).json({ success: true, message: "Zone deleted" });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
    
      async increasePrices(req, res) {
        try {
          const { percentage } = req.body;
          if (!percentage || isNaN(percentage)) {
            throw new Error("Invalid percentage value");
          }
          const updatedZones = await ShippingService.increasePrices(percentage);
          res.status(200).json({ success: true, updatedZones });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
  async calculate(req, res) {
    try {
      const { zoneName, transportType } = req.body;

      const cost = await ShippingService.calculateShippingCost(zoneName, transportType);

      res.status(200).json({
        success: true,
        zoneName,
        transportType,
        cost,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default ShippingController;
