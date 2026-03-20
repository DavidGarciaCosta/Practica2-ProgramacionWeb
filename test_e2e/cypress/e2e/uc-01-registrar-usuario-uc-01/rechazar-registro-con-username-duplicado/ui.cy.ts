/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro con username duplicado
 * Type: UI
 * Evidence summary: pages=/register selectors=#confirmPassword, #email, #loginBtn, #loginForm, #messageForm, #password, #registerBtn, #userList messages=El usuario o email ya existe, Usuario registrado exitosamente
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
      fillField("#email", user.email);
    fillField("#password", user.password);
    fillField("#confirmPassword", user.password);
    fillField("#userList", user.username);
      cy.get("#registerBtn").should('be.visible').click();
      cy.location('pathname', { timeout: 10000 }).should('include', "/register"); cy.get("[data-cy=\"error-message\"]", { timeout: 10000 }).should('be.visible'); cy.contains("El usuario o email ya existe", { matchCase: false, timeout: 10000 }).should('be.visible'); cy.contains("Usuario registrado exitosamente", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      cy.seedUserByApi({ username: user.username, email: user.email, password: user.password }).then(() => {
        runScenario(user);
      });
    });
  });
});
