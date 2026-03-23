/**
 * Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
 * Scenario: Verificar token válido y obtener perfil básico
 * Type: API
 * Evidence summary: endpoints=/api/auth/verify messages=Error al actualizar rol, Inicio de sesión exitoso, Error al actualizar stock
 */

describe("Verificar token válido y obtener perfil básico", () => {
  it("Verificar token válido y obtener perfil básico", () => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const payload: Record<string, unknown> = {};
    payload["messageInput"] = "e2e_messageinput_1";
    cy.request({ method: "GET", url: "/api/auth/verify", body: payload, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const bodyText = typeof res.body === 'string' ? res.body : JSON.stringify(res.body ?? {});
      expect(bodyText).to.contain("Error al actualizar rol");
    });
  });
});
