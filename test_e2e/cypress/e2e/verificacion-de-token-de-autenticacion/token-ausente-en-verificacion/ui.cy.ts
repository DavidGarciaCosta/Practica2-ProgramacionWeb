/**
 * Feature: Verificación de token de autenticación
 * Scenario: Token ausente en verificación
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #errorMessage, #password, #rememberMe, #sendMessage, #successMessage, #togglePassword messages=Token inválido, Token no proporcionado, Token inválido o expirado
 */

describe("Token ausente en verificación", () => {
  it("Token ausente en verificación", () => {
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
      const formData: Record<string, string> = {}; formData["email"] = user.email; formData["password"] = user.password;
      fillField("#email", String(formData["email"] ?? ''));
      fillField("#password", String(formData["password"] ?? ''));
      cy.get("#loginForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/products"); cy.get("#successMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Token inválido", { matchCase: false, timeout: 10000 }).should('be.visible');
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
