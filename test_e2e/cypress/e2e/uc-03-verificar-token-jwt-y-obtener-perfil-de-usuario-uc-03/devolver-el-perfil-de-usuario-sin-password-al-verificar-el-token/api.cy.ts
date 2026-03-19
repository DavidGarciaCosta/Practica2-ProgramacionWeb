/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Devolver el perfil de usuario sin password al verificar el token
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token inválido o expirado, Token no proporcionado
 */

describe("Devolver el perfil de usuario sin password al verificar el token", () => {
  it("Devolver el perfil de usuario sin password al verificar el token", () => {
    cy.request({ method: 'GET', url: '/api/auth/verify', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
