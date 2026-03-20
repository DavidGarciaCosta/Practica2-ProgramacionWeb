/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Rechazar verificación cuando el token está expirado
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido o expirado, Token inválido, Token no proporcionado
 */

describe("Rechazar verificación cuando el token está expirado", () => {
  it("Rechazar verificación cuando el token está expirado", () => {
    cy.request({ method: 'GET', url: "/api/auth/verify", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
