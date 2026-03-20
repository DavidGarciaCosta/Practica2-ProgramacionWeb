/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar login cuando faltan credenciales de entrada
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #loginBtn, #loginForm, #messageForm, #password, #userList messages=Credenciales inválidas, Inicio de sesión exitoso
 */

describe("Rechazar login cuando faltan credenciales de entrada", () => {
  it("Rechazar login cuando faltan credenciales de entrada", () => {
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

    cy.visit("/login");
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const user = {
      username: `e2e_user_${unique}`,
      email: `e2e_${unique}@example.com`,
      password: `E2Epass!${unique}`,
    };
    
    fillField("#email", user.email);
    fillField("#password", user.password);
    fillField("#userList", user.username);
    cy.get("#loginBtn").should('be.visible').click();
    cy.get("[data-cy=\"error-message\"]", { timeout: 10000 }).should('be.visible'); cy.contains("Credenciales inválidas", { matchCase: false, timeout: 10000 }).should('be.visible'); cy.contains("Inicio de sesión exitoso", { matchCase: false, timeout: 10000 }).should('be.visible');
  });
});
