/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro cuando el formato del email no es válido
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Rol inválido, Token inválido, Estado inválido
 */

describe("Rechazar registro cuando el formato del email no es válido", () => {
  it("Rechazar registro cuando el formato del email no es válido", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    cy.request({ method: 'POST', url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((seedRes) => {
      expect(seedRes.status).to.be.within(200, 299);
      const payload: Record<string, unknown> = {};
    payload["username"] = `e2e_user_${unique}`;
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["confirmPassword"] = `E2Epass!${unique}`;
    payload["email"] = 'invalid-value';
      cy.request({ method: "POST", url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.be.within(400, 499);
        const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
        expect(bodyText).to.contain("Rol inválido");
      });
    });
  });
});
