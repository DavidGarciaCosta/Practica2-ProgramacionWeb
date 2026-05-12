type TestUser = {
  username: string;
  email: string;
  password: string;
};

const buildUser = (): TestUser => {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  return {
    username: `e2e_user_${unique}`,
    email: `e2e_${unique}@example.com`,
    password: `E2Epass!${unique}`,
  };
};

Cypress.Commands.add('buildTestUser', () => buildUser());

Cypress.Commands.add('resetAppState', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window({ log: false }).then((win) => {
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add('safeVisit', (path: string) => {
  cy.resetAppState();
  cy.visit(path, {
    failOnStatusCode: false,
    retryOnNetworkFailure: true,
  });
  cy.get('body', { timeout: 10000 }).should('be.visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      buildTestUser(): Chainable<TestUser>;
      resetAppState(): Chainable<void>;
      safeVisit(path: string): Chainable<void>;
    }
  }
}

export {};
