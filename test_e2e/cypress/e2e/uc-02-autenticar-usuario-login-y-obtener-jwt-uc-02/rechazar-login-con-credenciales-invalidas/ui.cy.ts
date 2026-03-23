/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar login con credenciales inválidas
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #errorMessage, #loginBtn, #password, #rememberMe, #successMessage, #togglePassword messages=Credenciales inválidas, Rol inválido, No autorizado
 */

describe("Rechazar login con credenciales inválidas", () => {
  it("Rechazar login con credenciales inválidas", () => {
    const fillField = (selector: string, value: string) => {
      cy.get(selector, { timeout: 10000 })
        .should('be.visible')
        .then(($el) => {
          const tagName = $el.prop('tagName')?.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea') {
            cy.wrap($el).clear().type(value, { delay: 0 });
            return;
          }
          cy.wrap($el).click();
          cy.wrap($el).clear().type(value, { delay: 0 });
        });
    };

    const runScenario = (user: { username: string; email: string; password: string }) => {
      cy.safeVisit("/login");
      const formData: Record<string, string> = {}; formData["email"] = user.email; formData["password"] = user.password; formData["email"] = 'invalid-value';
      fillField("#email", String(formData["email"] ?? ''));
      fillField("#password", String(formData["password"] ?? ''));
      cy.get("#loginForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/login"); cy.get("#errorMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Credenciales inválidas", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      const payload: Record<string, unknown> = {};
      payload["username"] = user.username;
      payload["email"] = user.email;
      payload["password"] = user.password;
      payload["confirmPassword"] = user.password;
      cy.request({ method: 'POST', url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((seedRes) => {
        expect(seedRes.status).to.be.within(200, 299);
        runScenario(user);
      });
    });
  });
});
