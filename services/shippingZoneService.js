import ShippingZone from "../models/ShippingZone.js";

const ShippingService = {
    async getAllZones() {
        return await ShippingZone.findAll();
      },
    
      async createZone(data) {
        return await ShippingZone.create(data);
      },
    
      async updateZone(zoneId, updates) {
        const zone = await ShippingZone.findByPk(zoneId);
        if (!zone) throw new Error("Zone not found");
        return await zone.update(updates);
      },
    
      async deleteZone(zoneId) {
        const zone = await ShippingZone.findByPk(zoneId);
        if (!zone) throw new Error("Zone not found");
        return await zone.destroy();
      },

  async calculateShippingCost(zoneName, transportType) {
    const zone = await ShippingZone.findOne({ where: { zoneName } });
    if (!zone) {
      throw new Error("Zona de envío no encontrada");
    }
    if (transportType === "moto") return zone.motoPrice;
    if (transportType === "auto") return zone.autoPrice;

    throw new Error("Tipo de transporte inválido");
  },
};

export default ShippingService;