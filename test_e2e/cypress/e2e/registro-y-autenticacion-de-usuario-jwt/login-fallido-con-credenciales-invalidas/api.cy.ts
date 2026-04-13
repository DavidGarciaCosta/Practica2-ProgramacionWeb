/**
 * Feature: Registro y autenticación de usuario (JWT)
 * Scenario: Login fallido con credenciales inválidas
 * Type: API
 * Evidence summary: endpoints=/api/auth/login, /api/auth/register messages=Credenciales inválidas, Token inválido, Token no proporcionado
 */

describe("Login fallido con credenciales inválidas", () => {
  it("Login fallido con credenciales inválidas", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["username"] = `e2e_user_${unique}`;
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["confirmPassword"] = `E2Epass!${unique}`;
    cy.request({ method: 'POST', url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((seedRes) => {
      expect(seedRes.status).to.be.within(200, 299);
      const payload: Record<string, unknown> = {};
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["email"] = 'invalid-value';
      cy.request({ method: "POST", url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.be.within(400, 499);
        const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
        expect(bodyText).to.contain("Credenciales inválidas");
      });
    });
  });
});
