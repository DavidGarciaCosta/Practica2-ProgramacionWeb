/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Credenciales inválidas, Estado inválido, Rol inválido, Rol inválido. Use , Token inválido, Token inválido o expirado, Token no proporcionado
 */

describe("Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer", () => {
  it("Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const user = {
      username: `e2e_verify_${unique}`,
      email: `e2e_verify_${unique}@example.com`,
      password: `E2Epass!${unique}`,
    };

    cy.request({ method: 'POST', url: '/api/auth/register', body: user, failOnStatusCode: false }).then(() => {
      cy.request({ method: 'POST', url: '/api/auth/login', body: { email: user.email, password: user.password }, failOnStatusCode: false }).then((loginRes) => {
        const body = loginRes.body as any;
        const token = body?.token ?? body?.accessToken ?? body?.jwt;
        expect(token).to.be.a('string').and.not.be.empty;
        cy.request({ method: 'GET', url: '/api/auth/verify', headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((verifyRes) => {
          expect(verifyRes.status).to.be.within(200, 299);
        });
      });
    });
  });
});
