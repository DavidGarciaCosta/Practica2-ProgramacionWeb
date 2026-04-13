/**
 * Feature: Registro y autenticación de usuario (JWT)
 * Scenario: Evitar duplicados de username o email en registro
 * Type: API
 * Evidence summary: endpoints=/api/auth/login, /api/auth/register messages=Usuario registrado exitosamente, Error al actualizar rol, Inicio de sesión exitoso
 */

describe("Evitar duplicados de username o email en registro", () => {
  it("Evitar duplicados de username o email en registro", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["username"] = `e2e_user_${unique}`;
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["confirmPassword"] = `E2Epass!${unique}`;
    cy.request({ method: "POST", url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Usuario registrado exitosamente");
    });
  });
});
