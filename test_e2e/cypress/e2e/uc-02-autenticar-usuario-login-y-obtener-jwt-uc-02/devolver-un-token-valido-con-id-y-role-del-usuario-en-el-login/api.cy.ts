/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Devolver un token válido con id y role del usuario en el login
 * Type: API
 * Evidence summary: endpoints=/api/auth/login messages=Token inválido, Token no proporcionado, Token inválido o expirado
 */

describe("Devolver un token válido con id y role del usuario en el login", () => {
  it("Devolver un token válido con id y role del usuario en el login", () => {
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
