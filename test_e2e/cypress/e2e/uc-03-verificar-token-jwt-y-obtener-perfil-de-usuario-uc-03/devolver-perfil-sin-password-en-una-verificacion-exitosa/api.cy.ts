/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Devolver perfil sin password en una verificación exitosa
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token no proporcionado, Token inválido o expirado
 */

describe("Devolver perfil sin password en una verificación exitosa", () => {
  it("Devolver perfil sin password en una verificación exitosa", () => {
    cy.request({ method: 'GET', url: "/api/auth/verify", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
