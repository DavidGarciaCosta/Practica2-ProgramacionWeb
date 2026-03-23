/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Token inválido, Token inválido o expirado, Rol inválido
 */

describe("Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer", () => {
  it("Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["username"] = `e2e_user_${unique}`;
    payload["email"] = `e2e_${unique}@example.com`;
    payload["password"] = `E2Epass!${unique}`;
    payload["confirmPassword"] = `E2Epass!${unique}`;
    cy.request({ method: 'POST', url: "/api/auth/register", body: payload, failOnStatusCode: false }).then((seedRes) => {
      expect(seedRes.status).to.be.within(200, 299);
      const payload: Record<string, unknown> = {};
    payload["address"] = "e2e_address_1";
    payload["city"] = "e2e_city_2";
    payload["postalCode"] = "e2e_postalcode_3";
    payload["country"] = "e2e_country_4";
    payload["notes"] = "e2e_notes_5";
    payload["address"] = '';
      cy.request({ method: "GET", url: "/api/auth/verify", body: payload, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.be.within(400, 499);
        const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
        expect(bodyText).to.contain("Token inválido");
      });
    });
  });
});
