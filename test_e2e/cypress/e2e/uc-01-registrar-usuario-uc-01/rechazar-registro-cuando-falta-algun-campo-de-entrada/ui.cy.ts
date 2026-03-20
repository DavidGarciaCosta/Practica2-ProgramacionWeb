/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro cuando falta algún campo de entrada
 * Type: UI
 * Evidence summary: pages=/register selectors=#acceptTerms, #confirmPassword, #email, #errorMessage, #newsletter, #password, #registerBtn, #successMessage, #username, [name="role"] messages=Rol inválido, Token inválido, Estado inválido
 */

describe("Rechazar registro cuando falta algún campo de entrada", () => {
  it("Rechazar registro cuando falta algún campo de entrada", () => {
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
      const formData = {   username: user.username,   email: user.email,   password: user.password,   confirmPassword: user.password, }; formData.confirmPassword = '';
      fillField("#username", formData.username);
      fillField("#email", formData.email);
      fillField("#password", formData.password);
      fillField("#confirmPassword", formData.confirmPassword);
      cy.get("[name=\"role\"]").check({ force: true });
      cy.get("#acceptTerms").check({ force: true });
      cy.get("#registerForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/register"); cy.get("#errorMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Rol inválido", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      runScenario(user);
    });
  });
});
