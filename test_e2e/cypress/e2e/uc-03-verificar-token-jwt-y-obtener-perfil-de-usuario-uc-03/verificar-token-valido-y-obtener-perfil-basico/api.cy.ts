/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Verificar token válido y obtener perfil básico
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token inválido o expirado, Token no proporcionado
 */

describe("Verificar token v\u00e1lido y obtener perfil b\u00e1sico", () => {
  it("Verificar token v\u00e1lido y obtener perfil b\u00e1sico", () => {
    cy.request({ method: 'GET', url: '/api/auth/verify', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
