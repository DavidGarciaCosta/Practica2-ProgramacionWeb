/**
 * Feature: Verificación de token de autenticación
 * Scenario: Token inválido en verificación
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token inválido o expirado, Rol inválido
 */

describe("Token inválido en verificación", () => {
  it("Token inválido en verificación", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["username"] = `e2e_user_${unique}`;
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["confirmPassword"] = `E2Epass!${unique}`;
    cy.request({ method: 'POST', url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((seedRes) => {
      expect(seedRes.status).to.be.within(200, 299);
      const payload: Record<string, unknown> = {};
    payload["messageInput"] = "e2e_messageinput_1";
    payload["messageInput"] = '';
      cy.request({ method: "GET", url: "/api/auth/verify", body: payload, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.be.within(400, 499);
        const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
        expect(bodyText).to.contain("Token inválido");
      });
    });
  });
});
