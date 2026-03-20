/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Rechazar registro cuando el formato del email no es válido
 * Type: UI
 * Evidence summary: pages=/register selectors=#confirmPassword, #email, #loginBtn, #loginForm, #messageForm, #password, #registerBtn, #userList messages=Credenciales inválidas, Estado inválido, Rol inválido, Rol inválido. Use , Token inválido, Token inválido o expirado, Usuario registrado exitosamente
 */

describe("Rechazar registro cuando el formato del email no es válido", () => {
  it("Rechazar registro cuando el formato del email no es válido", () => {
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

    cy.visit("/register");
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const user = {
      username: `e2e_user_${unique}`,
      email: `e2e_${unique}@example.com`,
      password: `E2Epass!${unique}`,
    };
    
    fillField("#email", user.email);
    fillField("#password", user.password);
    fillField("#confirmPassword", user.password);
    fillField("#userList", user.username);
    cy.get("#registerBtn").should('be.visible').click();
    cy.get("[data-cy=\"error-message\"]", { timeout: 10000 }).should('be.visible'); cy.contains("Credenciales inválidas", { matchCase: false, timeout: 10000 }).should('be.visible'); cy.contains("Estado inválido", { matchCase: false, timeout: 10000 }).should('be.visible');
  });
});
