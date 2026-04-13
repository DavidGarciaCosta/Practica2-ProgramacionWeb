/**
 * Feature: Verificación de token de autenticación
 * Scenario: El sistema expone un endpoint para verificación de token
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Error al actualizar rol, Inicio de sesión exitoso, Error al actualizar stock
 */

describe("El sistema expone un endpoint para verificación de token", () => {
  it("El sistema expone un endpoint para verificación de token", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    cy.request({ method: "GET", url: "/api/auth/verify", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Error al actualizar rol");
    });
  });
});
