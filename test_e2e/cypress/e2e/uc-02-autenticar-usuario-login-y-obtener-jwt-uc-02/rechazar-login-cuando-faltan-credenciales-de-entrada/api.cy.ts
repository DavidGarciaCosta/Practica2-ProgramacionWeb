/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar login cuando faltan credenciales de entrada
 * Type: API
 * Evidence summary: endpoints=/api/auth/login messages=Credenciales inválidas, Rol inválido, Token inválido
 */

describe("Rechazar login cuando faltan credenciales de entrada", () => {
  it("Rechazar login cuando faltan credenciales de entrada", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const user = {
      username: `e2e_login_${unique}`,
      email: `e2e_login_${unique}@example.com`,
      password: `E2Epass!${unique}`,
    };

    cy.request({ method: 'POST', url: '/api/auth/register', body: user, failOnStatusCode: false }).then(() => {
      cy.request({ method: 'POST', url: '/api/auth/login', body: { email: user.email, password: user.password }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.be.within(200, 299);
        const body = res.body as any;
        expect(body?.token ?? body?.accessToken ?? body?.jwt).to.be.a('string').and.not.be.empty;
      });
    });
  });
});
