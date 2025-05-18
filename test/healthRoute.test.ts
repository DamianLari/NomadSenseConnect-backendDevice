import { app } from "../src/app";
import { env } from "../src/config";
import request from "supertest";

describe("Test de la route /health", () => {
  it("GET /health doit retourner un statut 200 et un message de succès", async () => {
    const response = await request(app).get(`${env.ENDPOINT_PREFIX}/health`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "UP"); // Ajustez selon la réponse de votre API
  });
});
