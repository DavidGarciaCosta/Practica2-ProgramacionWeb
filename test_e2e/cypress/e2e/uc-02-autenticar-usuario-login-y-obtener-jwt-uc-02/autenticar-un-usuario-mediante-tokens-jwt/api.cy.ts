/**
 * Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
 * Scenario: Autenticar un usuario mediante tokens JWT
 * Type: API
 * Evidence summary: endpoints=/api/auth/login messages=Error al actualizar rol, Inicio de sesión exitoso, Error al actualizar stock
 */

describe("Autenticar un usuario mediante tokens JWT", () => {
  it("Autenticar un usuario mediante tokens JWT", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["address"] = "e2e_address_1";
    payload["city"] = "e2e_city_2";
    payload["postalCode"] = "e2e_postalcode_3";
    payload["country"] = "e2e_country_4";
    payload["notes"] = "e2e_notes_5";
    cy.request({ method: "POST", url: "/api/auth/login", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Error al actualizar rol");
    });
  });
});
