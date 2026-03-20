/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Autenticar un usuario mediante tokens JWT
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #errorMessage, #loginBtn, #password, #rememberMe, #successMessage, #togglePassword messages=Token inválido, Token no proporcionado, Token inválido o expirado
 */

describe("Autenticar un usuario mediante tokens JWT", () => {
  it("Autenticar un usuario mediante tokens JWT", () => {
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
      const formData = {   username: user.username,   email: user.email,   password: user.password,   confirmPassword: user.password, };
      fillField("#email", formData.email);
      fillField("#password", formData.password);
      cy.get("#loginForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/products"); cy.get("#successMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Token inválido", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      cy.seedUserByApi({ username: user.username, email: user.email, password: user.password }).then(() => {
        runScenario(user);
      });
    });
  });
});
