import { createButton } from "../src/button.js";

export default async function handler(REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "image/svg+xml");
    RESPONSE.setHeader("Cache-Control", "max-age=3600");
    RESPONSE.send(await createButton(REQUEST.query.language, REQUEST.query.theme ?? "dark"));
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
