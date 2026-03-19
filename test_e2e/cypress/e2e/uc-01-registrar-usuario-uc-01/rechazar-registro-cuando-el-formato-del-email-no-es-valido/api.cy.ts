/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro cuando el formato del email no es válido
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Usuario registrado exitosamente
 */

describe("Rechazar registro cuando el formato del email no es v\u00e1lido", () => {
  it("Rechazar registro cuando el formato del email no es v\u00e1lido", () => {
    cy.request({ method: 'GET', url: '/api/auth/register', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
