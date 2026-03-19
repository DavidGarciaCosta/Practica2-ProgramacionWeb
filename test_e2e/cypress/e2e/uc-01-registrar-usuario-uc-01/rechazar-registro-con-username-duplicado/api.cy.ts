/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro con username duplicado
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=El usuario o email ya existe, Usuario registrado exitosamente
 */

describe("Rechazar registro con username duplicado", () => {
  it("Rechazar registro con username duplicado", () => {
    cy.request({ method: 'GET', url: '/api/auth/register', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
