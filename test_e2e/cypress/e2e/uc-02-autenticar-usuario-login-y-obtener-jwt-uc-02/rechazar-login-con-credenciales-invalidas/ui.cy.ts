/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar login con credenciales inválidas
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #errorMessage, #loginBtn, #password, #rememberMe, #successMessage, #togglePassword messages=Credenciales inválidas, Rol inválido, Token inválido
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
      const formData = {   username: user.username,   email: user.email,   password: user.password,   confirmPassword: user.password, }; formData.password = `${user.password}_incorrecta`;
      fillField("#email", formData.email);
      fillField("#password", formData.password);
      cy.get("#loginForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/login"); cy.get("#errorMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Credenciales inválidas", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      cy.seedUserByApi({ username: user.username, email: user.email, password: user.password }).then(() => {
        runScenario(user);
      });
    });
  });
});
