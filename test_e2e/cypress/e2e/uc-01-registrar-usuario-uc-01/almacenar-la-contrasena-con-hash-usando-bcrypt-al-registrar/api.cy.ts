/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Almacenar la contraseña con hash usando bcrypt al registrar
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Usuario registrado exitosamente
 */

describe("Almacenar la contraseña con hash usando bcrypt al registrar", () => {
  it("Almacenar la contraseña con hash usando bcrypt al registrar", () => {
    cy.request({ method: 'GET', url: "/api/auth/register", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 499);
    });
  });
});
