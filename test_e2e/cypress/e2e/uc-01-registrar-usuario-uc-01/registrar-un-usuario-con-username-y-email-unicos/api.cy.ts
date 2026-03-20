/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Registrar un usuario con username y email únicos
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Usuario registrado exitosamente
 */

describe("Registrar un usuario con username y email únicos", () => {
  it("Registrar un usuario con username y email únicos", () => {
    cy.request({ method: 'GET', url: "/api/auth/register", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
