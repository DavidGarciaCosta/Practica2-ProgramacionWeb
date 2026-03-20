/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro con username duplicado
 * Type: UI
 * Evidence summary: pages=/register selectors=#acceptTerms, #confirmPassword, #email, #errorMessage, #newsletter, #password, #registerBtn, #successMessage, #username, [name="role"] messages=Token no proporcionado, Rol inválido, Token inválido
 */

describe("Rechazar registro con username duplicado", () => {
  it("Rechazar registro con username duplicado", () => {
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
      const formData = {   username: user.username,   email: user.email,   password: user.password,   confirmPassword: user.password, }; formData.email = `other_${user.email}`;
      fillField("#username", formData.username);
      fillField("#email", formData.email);
      fillField("#password", formData.password);
      fillField("#confirmPassword", formData.confirmPassword);
      cy.get("[name=\"role\"]").check({ force: true });
      cy.get("#acceptTerms").check({ force: true });
      cy.get("#registerForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/register"); cy.get("#errorMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Token no proporcionado", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      cy.seedUserByApi({ username: user.username, email: user.email, password: user.password }).then(() => {
        runScenario(user);
      });
    });
  });
});
