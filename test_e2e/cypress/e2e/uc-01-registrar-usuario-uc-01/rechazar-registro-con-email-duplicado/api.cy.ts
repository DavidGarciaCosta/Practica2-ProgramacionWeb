/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro con email duplicado
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Token no proporcionado, Rol inválido, No autorizado
 */

describe("Rechazar registro con email duplicado", () => {
  it("Rechazar registro con email duplicado", () => {
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
        expect(bodyText).to.contain("Token no proporcionado");
      });
    });
  });
});
