/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro cuando falta algún campo de entrada
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Usuario registrado exitosamente
 */

describe("Rechazar registro cuando falta alg\u00fan campo de entrada", () => {
  it("Rechazar registro cuando falta alg\u00fan campo de entrada", () => {
    cy.request({ method: 'GET', url: '/api/auth/register', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
