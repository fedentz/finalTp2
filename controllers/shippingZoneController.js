import ShippingService from "../services/shippingZoneService.js";

const ShippingController = {
    async getAllZones(req, res) {
        try {
          const zones = await ShippingService.getAllZones();
          res.status(200).send(zones);
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
    async createZone(req, res) {
      try {
        const { zoneName, motoPrice, autoPrice } = req.body;
        if (!zoneName || !motoPrice || !autoPrice) {
          throw new Error("Los campos no pueden estar vacios");
        }
        if (isNaN(Number(motoPrice)) || isNaN(Number(autoPrice))) {
          throw new Error("El precio del servicio debe ser numerico");
        }
        const zone = await ShippingService.createZone({
          zoneName,
          motoPrice: Number(motoPrice),
          autoPrice: Number(autoPrice),
        });
        res.status(200).send({ success: true, zone });
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    },
    async updateZone(req, res) {
      try {
        const { id } = req.params;
        const { zoneName, motoPrice, autoPrice } = req.body;
        if (!zoneName || !motoPrice || !autoPrice) {
          throw new Error("Los campos no pueden estar vacíos");
        }
        if (isNaN(Number(motoPrice)) || isNaN(Number(autoPrice))) {
          throw new Error("El precio del servicio debe ser numérico");
        }
        const updates = {
          zoneName,
          motoPrice: Number(motoPrice),
          autoPrice: Number(autoPrice),
        };
        const updatedZone = await ShippingService.updateZone(id, updates);
        res.status(200).send({ success: true, updatedZone });
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    },
    
      async deleteZone(req, res) {
        try {
          const { id } = req.params;
          await ShippingService.deleteZone(id);
          res.status(200).send({ success: true, message: "Zona borrada" });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },
  async calculate(req, res) {
    try {
      const { zoneName, transportType } = req.body;

      const cost = await ShippingService.calculateShippingCost(zoneName, transportType);

      res.status(200).send({
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
