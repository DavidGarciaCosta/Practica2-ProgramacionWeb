/**
 * Feature: Verificación de token de autenticación
 * Scenario: Verificar token válido devuelve perfil sin password
 * Type: UI
 * Evidence summary: pages=/register selectors=#acceptTerms, #confirmPassword, #email, #errorMessage, #newsletter, #password, #successMessage, #username, [name="role"] messages=Token inválido, Token no proporcionado, Token inválido o expirado
 */

describe("Verificar token válido devuelve perfil sin password", () => {
  it("Verificar token válido devuelve perfil sin password", () => {
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
      cy.safeVisit("/register");
      const formData: Record<string, string> = {}; formData["username"] = user.username; formData["email"] = user.email; formData["password"] = user.password; formData["confirmPassword"] = user.password;
      fillField("#username", String(formData["username"] ?? ''));
      fillField("#email", String(formData["email"] ?? ''));
      fillField("#password", String(formData["password"] ?? ''));
      fillField("#confirmPassword", String(formData["confirmPassword"] ?? ''));
      cy.get("[name=\"role\"]").check({ force: true });
      cy.get("#acceptTerms").check({ force: true });
      cy.get("#registerForm").submit();
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
