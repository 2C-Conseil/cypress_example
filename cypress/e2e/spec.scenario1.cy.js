const { launchConnection } = require("../utils/spec.utils.functions");

describe('Scenario 01', () => {
  beforeEach(() => {
    launchConnection();
  })

  it('Connexion', () => {
    cy.log('Cas - Connexion').then(() => { Cypress.log({ type: 'warn' }); });
  });

  it('Cas - Vérification d\'éléments de la page "Dossiers"', () => {
    cy.get('h1').contains('Dossiers');
    cy.get('#burger-menu-btn').should('exist');
    cy.get('#switch-archived-folders').should('exist');

    cy.log('Cas - Vérification d\'éléments de la page "Dossiers"').then(() => { Cypress.log({ type: 'warn' }); });
  });

  it('Cas - Navigation sur la page "Archives" et retour sur la page "Dossiers"', () => {
    cy.get('#switch-archived-folders').click();
    cy.log(`Page "Archives"`);
    cy.wait(2000);

    cy.get('#switch-not-archived-folders').click();
    cy.log(`Page "Dossiers"`);

    cy.log('Cas - Navigation sur la page "Archives" et retour sur la page "Dossiers"').then(() => { Cypress.log({ type: 'warn' }); });
  });

  it('Cas - Navigation sur la page "Tests"', () => {
    cy.intercept('GET', '**/Execution*').as('tests');
    cy.get('#item-folders-button-list').click();
    cy.wait('@tests', {timeout: 10000}).then((interception) => {
      cy.get('#group-table-tests > div > div.MuiDataGrid-main.css-opb0c2 > div:nth-child(2) > div > div > div > div:nth-child(1) > div.MuiDataGrid-cell.MuiDataGrid-cell--textRight > div')
        .invoke('text')
        .then((textId) => {
          const data = interception.response.body;
          const res = data.filter(item => item.id == textId);
          cy.log(res);
          expect(textId).to.be.equal(res[0].id.toString());
        })
    })
    cy.wait(500);
    cy.url().should('contain', '/tests');
    cy.log(`Page "Tests"`);

    cy.log('Cas - Navigation sur la page "Tests"').then(() => { Cypress.log({ type: 'warn' }); });
  });

  it('Cas - Ouverture des modales d\'un dossier', () => {
    cy.get('#btn-edit-folder:first').click();
    cy.wait(2000);
    cy.log('Ouverture de la modale "Edition" du 1er dossier').then(() => { Cypress.log({ type: 'info' }); });
    cy.get('#btn-cancel-edit-folder-modal').click();
    cy.wait(1500);
    cy.log('Fermeture de la modale "Edition" du 1er dossier').then(() => { Cypress.log({ type: 'info' }); });

    cy.get('#btn-delete-folder').click();
    cy.wait(2000);
    cy.log('Ouverture de la modale "Suppression" du 1er dossier').then(() => { Cypress.log({ type: 'info' }); });
    cy.get('#btn-cancel-delete-folder-modal').click();
    cy.wait(1500);
    cy.log('Fermeture de la modale "Suppression" du 1er dossier').then(() => { Cypress.log({ type: 'info' }); });

    cy.log('Cas - Ouverture des modales d\'un dossier').then(() => { Cypress.log({ type: 'warn' }); });
  });

  it.only('Cas - Capture d\'écran de la page "Dossiers"', () => {
    cy.wait(2000);
    cy.viewport(1366, 768);
    cy.window().then((win) => {
      const { innerWidth, innerHeight } = win;
  
      // Afficher les dimensions du viewport dans la console de Cypress
      cy.log(`Largeur du viewport : ${innerWidth}`);
      cy.log(`Hauteur du viewport : ${innerHeight}`);
      cy.screenshot('mon_screenshot', { capture: 'fullPage' });
    });

    cy.log('Cas - Capture d\'écran de la page "Dossiers"').then(() => { Cypress.log({ type: 'warn' }); });
  });
});