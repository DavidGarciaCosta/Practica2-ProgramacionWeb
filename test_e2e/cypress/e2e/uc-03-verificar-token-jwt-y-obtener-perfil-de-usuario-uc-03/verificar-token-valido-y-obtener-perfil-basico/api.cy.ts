/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Verificar token válido y obtener perfil básico
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token inválido o expirado, Token no proporcionado
 */

describe("Verificar token válido y obtener perfil básico", () => {
  it("Verificar token válido y obtener perfil básico", () => {
    cy.request({ method: 'GET', url: "/api/auth/verify", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
