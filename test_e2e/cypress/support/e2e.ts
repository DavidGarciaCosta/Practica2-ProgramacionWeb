import "./commands";

beforeEach(() => {
  cy.resetAppState();
});

afterEach(function () {
  if (this.currentTest?.state !== 'failed') {
    return;
  }

  cy.document({ log: false }).then((doc) => {
    const safeName = `${Cypress.spec.name}-${this.currentTest?.title ?? 'failed'}`
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 180);
    const selectorFor = (el: Element): string => {
      const htmlEl = el as HTMLElement;
      const dataCy = htmlEl.getAttribute('data-cy');
      const dataTestId = htmlEl.getAttribute('data-testid');
      const id = htmlEl.id;
      const name = htmlEl.getAttribute('name');
      if (dataCy) return `[data-cy="${dataCy}"]`;
      if (dataTestId) return `[data-testid="${dataTestId}"]`;
      if (id) return `#${id}`;
      if (name) return `[name="${name}"]`;
      return htmlEl.tagName.toLowerCase();
    };
    const describeElement = (el: Element) => {
      const htmlEl = el as HTMLElement;
      return {
        tag: htmlEl.tagName.toLowerCase(),
        selector: selectorFor(el),
        id: htmlEl.id || '',
        name: htmlEl.getAttribute('name') || '',
        type: htmlEl.getAttribute('type') || '',
        text: (htmlEl.innerText || htmlEl.textContent || '').trim().slice(0, 160),
        placeholder: htmlEl.getAttribute('placeholder') || '',
        ariaLabel: htmlEl.getAttribute('aria-label') || '',
      };
    };
    const snapshot = {
      spec: Cypress.spec.name,
      test: this.currentTest?.title ?? '',
      url: doc.location.href,
      pathname: doc.location.pathname,
      title: doc.title,
      bodyText: (doc.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 6000),
      inputs: Array.from(doc.querySelectorAll('input, textarea, select')).map(describeElement).slice(0, 80),
      buttons: Array.from(doc.querySelectorAll('button, [role="button"], input[type="submit"], a')).map(describeElement).slice(0, 80),
      feedback: Array.from(doc.querySelectorAll('[role="alert"], .alert, .error, .success, [data-testid*="message"], [data-cy*="message"]')).map(describeElement).slice(0, 40),
      forms: Array.from(doc.querySelectorAll('form')).map(describeElement).slice(0, 20),
    };
    cy.writeFile(`cypress/artifacts/dom/${safeName}.json`, snapshot, { log: false });
  });
});
