import roleSeed from "./roleSeed.js";
import userSeed from "./userSeed.js";
import petSeed from "./petSeed.js";
import productSeed from "./productSeed.js";
import { seedShippingZones } from "./shippingZoneSeed.js";
import connection from "../connection/connection.js";

const allSeeds = async () => {
  try {
    console.log("allSeed ...");

    await connection.sync({ force: true });

    await roleSeed();
    await userSeed();
    await petSeed();
    await productSeed();
    await seedShippingZones();
    console.log("seed completado");
  } catch (error) {
    console.error("allSeed error:", error);
  }
};

export default allSeeds;
