/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Registrar un usuario con username y email únicos
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Error al actualizar rol, Inicio de sesión exitoso, Error al actualizar stock
 */

describe("Registrar un usuario con username y email únicos", () => {
  it("Registrar un usuario con username y email únicos", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["username"] = `e2e_user_${unique}`;
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["confirmPassword"] = `E2Epass!${unique}`;
    cy.request({ method: "POST", url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Error al actualizar rol");
    });
  });
});
