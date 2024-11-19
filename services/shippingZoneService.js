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
    
      async increasePrices(percentage) {
        const zones = await ShippingZone.findAll();
        const updatedZones = await Promise.all(
          zones.map(async (zone) => {
            zone.priceMoto += (zone.priceMoto * percentage) / 100;
            zone.priceAuto += (zone.priceAuto * percentage) / 100;
            return await zone.save();
          })
        );
        return updatedZones;
      },
  async calculateShippingCost(zoneName, transportType) {
    // Verificar si existe la zona
    const zone = await ShippingZone.findOne({ where: { zoneName } });
    if (!zone) {
      throw new Error("Zona de envío no encontrada");
    }

    // Retornar el precio según el tipo de transporte
    if (transportType === "moto") return zone.motoPrice;
    if (transportType === "auto") return zone.autoPrice;

    throw new Error("Tipo de transporte inválido");
  },
};

export default ShippingService;