/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Almacenar la contraseña con hash usando bcrypt al registrar
 * Type: UI
 * Evidence summary: pages=/register selectors=#confirmPassword, #email, #loginBtn, #loginForm, #messageForm, #password, #registerBtn, #userList messages=Usuario registrado exitosamente
 */

describe("Almacenar la contraseña con hash usando bcrypt al registrar", () => {
  it("Almacenar la contraseña con hash usando bcrypt al registrar", () => {
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
      cy.get("[data-cy=\"error-message\"]", { timeout: 10000 }).should('be.visible'); cy.contains("Usuario registrado exitosamente", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      runScenario(user);
    });
  });
});
