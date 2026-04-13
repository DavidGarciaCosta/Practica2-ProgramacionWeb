/**
 * Feature: Registro y autenticación de usuario (JWT)
 * Scenario: Exposición de endpoints de registro e inicio de sesión
 * Type: API
 * Evidence summary: endpoints=/api/auth/login, /api/auth/register, /api/auth/register, /api/auth/login messages=Inicio de sesión exitoso, Error al actualizar rol, Error al actualizar stock
 */

describe("Exposición de endpoints de registro e inicio de sesión", () => {
  it("Exposición de endpoints de registro e inicio de sesión", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    cy.request({ method: "POST", url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Inicio de sesión exitoso");
    });
  });
});
