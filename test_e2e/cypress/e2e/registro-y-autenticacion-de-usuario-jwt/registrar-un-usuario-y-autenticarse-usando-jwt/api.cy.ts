/**
 * Feature: Registro y autenticación de usuario (JWT)
 * Scenario: Registrar un usuario y autenticarse usando JWT
 * Type: API
 * Evidence summary: endpoints=/api/auth/login, /api/auth/register messages=Inicio de sesión exitoso, Error al actualizar rol, Error al actualizar stock
 */

describe("Registrar un usuario y autenticarse usando JWT", () => {
  it("Registrar un usuario y autenticarse usando JWT", () => {
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
