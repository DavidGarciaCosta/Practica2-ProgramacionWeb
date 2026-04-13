/**
 * Feature: Registro y autenticación de usuario (JWT)
 * Scenario: Registrar un usuario y autenticarse usando JWT
 * Type: UI
 * Evidence summary: pages=/login selectors=#email, #errorMessage, #password, #rememberMe, #successMessage, #togglePassword messages=Inicio de sesión exitoso, Error al actualizar rol, Error al actualizar stock
 */

describe("Registrar un usuario y autenticarse usando JWT", () => {
  it("Registrar un usuario y autenticarse usando JWT", () => {
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
      const formData: Record<string, string> = {}; formData["email"] = user.email; formData["password"] = user.password; formData["password"] = `wrong_${String(formData["password"])}`;
      fillField("#email", String(formData["email"] ?? ''));
      fillField("#password", String(formData["password"] ?? ''));
      cy.get("#loginForm").submit();
      cy.location('pathname', { timeout: 10000 }).should('include', "/products"); cy.get("#successMessage", { timeout: 10000 }).should('be.visible'); cy.contains("Inicio de sesión exitoso", { matchCase: false, timeout: 10000 }).should('be.visible');
    };

    cy.buildTestUser().then((user) => {
      const payload: Record<string, unknown> = {};
      payload["username"] = user.username;
      payload["email"] = user.email;
      payload["password"] = user.password;
      payload["confirmPassword"] = user.password;
      cy.request({ method: 'POST', url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((seedRes) => {
        expect(seedRes.status).to.be.within(200, 299);
        runScenario(user);
      });
    });
  });
});
