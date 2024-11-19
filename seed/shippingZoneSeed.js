import ShippingZone from "../models/ShippingZone.js";

export const seedShippingZones = async () => {
  await ShippingZone.bulkCreate([
    { zoneName: "Zona A", motoPrice: 100, autoPrice: 200 },
    { zoneName: "Zona B", motoPrice: 150, autoPrice: 300 },
    { zoneName: "Zona C", motoPrice: 200, autoPrice: 400 },
  ]);
};