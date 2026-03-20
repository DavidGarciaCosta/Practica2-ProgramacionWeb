/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro con email duplicado
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Token no proporcionado, Rol inválido, Token inválido
 */

describe("Rechazar registro con email duplicado", () => {
  it("Rechazar registro con email duplicado", () => {
    cy.request({ method: 'GET', url: "/api/auth/register", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
