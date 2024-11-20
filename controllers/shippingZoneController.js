import ShippingService from "../services/shippingZoneService.js";

const ShippingController = {
    async getAllZones(req, res) {
        try {
          const zones = await ShippingService.getAllZones();
          res.status(201).send(zones);
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
    // VALIDAR DATOS DE ENTRADA
      async createZone(req, res) {
        try {
          const zoneData = req.body;
          const zone = await ShippingService.createZone(zoneData);
          res.status(201).send({ success: true, zone });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
    // VALIDAR DATOS DE ENTRADA
      async updateZone(req, res) {
        try {
          const { id } = req.params;
          const updates = req.body;
          const updatedZone = await ShippingService.updateZone(id, updates);
          res.status(201).send({ success: true, updatedZone });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
    
      async deleteZone(req, res) {
        try {
          const { id } = req.params;
          await ShippingService.deleteZone(id);
          res.status(201).send({ success: true, message: "Zone deleted" });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
    
      async increasePrices(req, res) {
        try {
          const { percentage } = req.body;
          if (!percentage || isNaN(percentage)) {
            throw new Error("Porcentaje invalido, ingrese un numero");
          }
          const updatedZones = await ShippingService.increasePrices(percentage);
          res.status(201).send({ success: true, updatedZones });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
  async calculate(req, res) {
    try {
      const { zoneName, transportType } = req.body;

      const cost = await ShippingService.calculateShippingCost(zoneName, transportType);

      res.status(201).send({
        success: true,
        zoneName,
        transportType,
        cost,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};

export default ShippingController;
