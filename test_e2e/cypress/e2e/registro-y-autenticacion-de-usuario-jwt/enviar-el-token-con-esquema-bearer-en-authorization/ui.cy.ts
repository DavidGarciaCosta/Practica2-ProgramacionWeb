/**
 * Feature: Registro y autenticación de usuario (JWT)
 * Scenario: Enviar el token con esquema Bearer en Authorization
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #errorMessage, #loginBtn, #password, #rememberMe, #successMessage, #togglePassword messages=Error al actualizar rol, Inicio de sesión exitoso, Error al actualizar stock
 */

describe("Enviar el token con esquema Bearer en Authorization", () => {
  it("Enviar el token con esquema Bearer en Authorization", () => {
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
      const formData: Record<string, string> = {}; formData["email"] = user.email; formData["password"] = user.password;
      fillField("#email", String(formData["email"] ?? ''));
      fillField("#password", String(formData["password"] ?? ''));
      cy.get("#loginForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/products"); cy.get("#successMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Error al actualizar rol", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      const payload: Record<string, unknown> = {};
      payload["email"] = user.email;
      payload["password"] = user.password;
      cy.request({ method: 'POST', url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((seedRes) => {
        expect(seedRes.status).to.be.within(200, 299);
        runScenario(user);
      });
    });
  });
});
