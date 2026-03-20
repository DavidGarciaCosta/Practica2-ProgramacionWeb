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
    retryOnStatusCodeFailure: true,
  });
  cy.location('pathname', { timeout: 10000 }).should('include', path);
});

Cypress.Commands.add('seedUserByApi', (overrides: Partial<TestUser> = {}) => {
  const user = { ...buildUser(), ...overrides };
  return cy.request({
    method: 'POST',
    url: '/api/auth/register',
    body: user,
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.be.within(200, 299);
    return user;
  });
});

Cypress.Commands.add('loginByApi', (user: TestUser) => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email: user.email, password: user.password },
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.be.within(200, 299);
    const body = res.body as Record<string, unknown>;
    const token = String(body?.token ?? body?.accessToken ?? body?.jwt ?? '');
    expect(token).to.not.equal('');
    cy.window({ log: false }).then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('authToken', token);
      win.sessionStorage.setItem('token', token);
    });
    return token;
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      buildTestUser(): Chainable<TestUser>;
      resetAppState(): Chainable<void>;
      safeVisit(path: string): Chainable<void>;
      seedUserByApi(overrides?: Partial<TestUser>): Chainable<TestUser>;
      loginByApi(user: TestUser): Chainable<string>;
    }
  }
}

export {};
