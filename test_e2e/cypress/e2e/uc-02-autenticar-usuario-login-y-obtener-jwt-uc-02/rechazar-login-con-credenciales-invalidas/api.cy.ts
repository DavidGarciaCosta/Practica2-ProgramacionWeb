/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar login con credenciales inválidas
 * Type: API
 * Evidence summary: endpoints=/api/auth/login messages=Credenciales inválidas, Inicio de sesión exitoso
 */

describe("Rechazar login con credenciales inv\u00e1lidas", () => {
  it("Rechazar login con credenciales inv\u00e1lidas", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const user = {
      username: `e2e_login_${unique}`,
      email: `e2e_login_${unique}@example.com`,
      password: `E2Epass!${unique}`,
    };

    cy.request({ method: 'POST', url: '/api/auth/register', body: user, failOnStatusCode: false }).then(() => {
      cy.request({ method: 'POST', url: '/api/auth/login', body: { email: user.email, password: `${user.password}_bad` }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.be.within(400, 499);
        const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
        expect(bodyText).to.contain('Credenciales inválidas');
      });
    });
  });
});
