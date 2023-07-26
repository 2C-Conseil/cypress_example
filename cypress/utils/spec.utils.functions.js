export function beforeConnection(url=Cypress.env('urlTest')) {
  cy.viewport(Cypress.env('viewportX'), Cypress.env('viewportY'));
  cy.visit(url);
  cy.log(`Page "Connexion"`);
  cy.wait(500);
  
  cy.get('h1').contains('Accueil');
  cy.get('#2cc-logo-icon-btn').should('exist');
  cy.wait(1500);
}

export function launchConnection() {
  beforeConnection();

  const email = Cypress.env('email');
  const password = Cypress.env('password');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.wait(500);

  cy.get('#btn-submit-connexion').click();
  cy.wait(500);
  cy.url().should('contain', '/dossiers');
  cy.log(`Page "Dossiers"`);
}