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

Cypress.Commands.add('launchConnectionProd', () => {
  cy.visit('http://localhost:3000');

  cy.get('#email').type('prod@at2c.fr');
  cy.get('#password').type('54hgR-bva2*!');
  cy.wait(500);

  cy.get('#btn-submit-connexion').click();
  cy.wait(500);
  cy.log(`Page "Dossiers"`);
});

Cypress.Commands.add('goPageTests', () => {
  cy.get('#item-folders-list span')
    .contains('CNAV')
    .closest('#item-folders-button-list')
    .click();
  cy.wait(500);
});

Cypress.Commands.add('applyFilter', (filterChar) => {
  // bouton 'filtres'
  cy.get('button[aria-label="Afficher les filtres"]')
    .contains('Filtres')
    .click({force: true});
  cy.wait(500);
  // sélection du filtre 'Etiquettes'
  cy.get('label.MuiFormLabel-root')
    .contains('Colonnes')
    .next('.MuiInputBase-root')
    .children('select')
    .select('Etiquettes', {force: true});
  cy.wait(500);
  // saisie de la valeur 'audio' dans le champ 'valeur'
  cy.get('label.MuiFormLabel-root')
    .contains('Valeur')
    .next('.MuiInputBase-root')
    .children('input[type="text"]')
    .type(filterChar);
  cy.get('.page-content').scrollIntoView({ duration: 250 });
  cy.wait(500);
});

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
  overwrite: true,
});