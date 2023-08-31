//import './index'

function beforeConnection(url='/') {
  cy.viewport(Cypress.env('viewportX'), Cypress.env('viewportY'));
  cy.visit(url);
  cy.log(`Page "Connexion"`);
  cy.wait(500);
  
  cy.get('h1').first().contains('Accueil');
  cy.get('#at2c-logo-icon-btn').should('exist');
  cy.wait(1500);
}

Cypress.Commands.add('launchConnection', () => {
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
});

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
  overwrite: true,
});