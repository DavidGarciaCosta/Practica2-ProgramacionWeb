/**
 * Feature: UC-01 Registrar usuario (UC-01)
 * Scenario: Registrar un usuario mediante el endpoint /api/auth/register
 * Type: API
 * Evidence summary: endpoints=/api/auth/register messages=Usuario registrado exitosamente
 */

describe("Registrar un usuario mediante el endpoint /api/auth/register", () => {
  it("Registrar un usuario mediante el endpoint /api/auth/register", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload = {
      username: `e2e_user_${unique}`,
      email: `e2e_${unique}@example.com`,
      password: `E2Epass!${unique}`,
    };

    cy.request({ method: 'POST', url: '/api/auth/register', body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain('Usuario registrado exitosamente');
    });
  });
});
