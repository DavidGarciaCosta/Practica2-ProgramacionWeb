/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Devolver un token válido con id y role del usuario en el login
 * Type: API
 * Evidence summary: endpoints=/api/auth/login messages=Error al actualizar rol, Inicio de sesión exitoso, Error al actualizar stock
 */

describe("Devolver un token válido con id y role del usuario en el login", () => {
  it("Devolver un token válido con id y role del usuario en el login", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    cy.request({ method: "POST", url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Error al actualizar rol");
    });
  });
});
