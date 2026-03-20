/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar petición cuando falta la cabecera Authorization
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token no proporcionado, Token inválido o expirado
 */

describe("Rechazar petición cuando falta la cabecera Authorization", () => {
  it("Rechazar petición cuando falta la cabecera Authorization", () => {
    cy.request({ method: 'GET', url: '/api/auth/verify', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(400, 499);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain('Token no proporcionado');
    });
  });
});
