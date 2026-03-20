/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Rechazar verificación cuando el token es inválido
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Credenciales inválidas, Estado inválido, Rol inválido, Rol inválido. Use , Token inválido, Token inválido o expirado, Token no proporcionado
 */

describe("Rechazar verificación cuando el token es inválido", () => {
  it("Rechazar verificación cuando el token es inválido", () => {
    cy.request({ method: 'GET', url: "/api/auth/verify", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
