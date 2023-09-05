const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
import '../support/commands';


describe('Scenario 01', () => {
  beforeEach(() => {
    cy.launchConnection();

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  })

  it.only('Connexion', () => {
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

  it('Cas - Capture d\'écran de la page "Dossiers"', () => {
    cy.wait(2000);
    cy.window()
      .then((win) => {
        const { innerWidth, innerHeight } = win;
    
        // Afficher les dimensions du viewport dans la console de Cypress
        cy.log(`Largeur du viewport : ${innerWidth}`);
        cy.log(`Hauteur du viewport : ${innerHeight}`);
        cy.screenshot('mon_screenshot', { capture: 'fullPage' });
      });

    cy.log('Cas - Capture d\'écran de la page "Dossiers"').then(() => { Cypress.log({ type: 'warn' }); });
  });

  it('Cas - Vérification du titre de la page "Dossiers" générant un screenshot avec une erreur', () => {
    cy.get('h1').should('exist').invoke('text').as('h1Text');
    cy.get('@h1Text').then((text) => {
      if (text !== 'texte différent') {
        cy.wait(2000);
        cy.get('h1').then($button => {
          $button.css('border', '3px solid yellow')
        });
        cy.viewport(1024, 768);
        cy.screenshot('erreur_verification_element');
      }
    });
    
    cy.log('Cas - Vérification d\'éléments de la page "Dossiers" générant un screenshot avec une erreur').then(() => { Cypress.log({ type: 'error' }); });
  });

  afterEach(() => {
    //cy.log('Cypress.env', Cypress.env('FOO')).then(() => { Cypress.log({ type: 'warn' }); });
  })
});


describe('Scenario 02', () => {
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type')
  })

  it('clicks the link "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()
  })

  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')
  })
});

