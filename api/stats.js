import { getStats } from "../src/stats.js";

export default async function handler(REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "text/html");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(await getStats(REQUEST.query.username));
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
