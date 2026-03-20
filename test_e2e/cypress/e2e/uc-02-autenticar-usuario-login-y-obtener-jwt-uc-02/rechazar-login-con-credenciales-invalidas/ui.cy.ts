/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar login con credenciales inválidas
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #loginBtn, #loginForm, #messageForm, #password, #userList messages=Credenciales inválidas, Estado inválido, Inicio de sesión exitoso, Rol inválido, Rol inválido. Use , Token inválido, Token inválido o expirado
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
      fillField("#email", user.email);
    fillField("#password", user.password);
    fillField("#userList", user.username);
      cy.get("#loginBtn").should('be.visible').click();
      cy.location('pathname', { timeout: 10000 }).should('include', "/login"); cy.get("[data-cy=\"error-message\"]", { timeout: 10000 }).should('be.visible'); cy.contains("Credenciales inválidas", { matchCase: false, timeout: 10000 }).should('be.visible'); cy.contains("Estado inválido", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      cy.seedUserByApi({ username: user.username, email: user.email, password: user.password }).then(() => {
        runScenario(user);
      });
    });
  });
});
