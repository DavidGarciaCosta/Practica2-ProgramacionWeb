/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Registrar un usuario mediante el endpoint /api/auth/register
 * Type: UI
 * Evidence summary: pages=/register selectors=#acceptTerms, #confirmPassword, #email, #errorMessage, #newsletter, #password, #registerBtn, #successMessage, #username, [name="role"] messages=Usuario registrado exitosamente, Pedido creado exitosamente, Producto creado exitosamente
 */

describe("Registrar un usuario mediante el endpoint /api/auth/register", () => {
  it("Registrar un usuario mediante el endpoint /api/auth/register", () => {
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
      const formData = {   username: user.username,   email: user.email,   password: user.password,   confirmPassword: user.password, };
      fillField("#username", formData.username);
      fillField("#email", formData.email);
      fillField("#password", formData.password);
      fillField("#confirmPassword", formData.confirmPassword);
      cy.get("[name=\"role\"]").check({ force: true });
      cy.get("#acceptTerms").check({ force: true });
      cy.get("#registerForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/products"); cy.get("#successMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Usuario registrado exitosamente", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      runScenario(user);
    });
  });
});
