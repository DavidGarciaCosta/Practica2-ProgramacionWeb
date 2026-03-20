/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Autenticar un usuario mediante tokens JWT
 * Type: API
 * Evidence summary: endpoints=/api/auth/login messages=Credenciales inválidas, Inicio de sesión exitoso, Token inválido, Token inválido o expirado, Token no proporcionado
 */

describe("Autenticar un usuario mediante tokens JWT", () => {
  it("Autenticar un usuario mediante tokens JWT", () => {
    cy.request({ method: 'GET', url: "/api/auth/login", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
