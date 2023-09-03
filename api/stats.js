import { getStats } from "../src/stats.js";

export default async function handler(_REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "text/html");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(await getStats());
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
