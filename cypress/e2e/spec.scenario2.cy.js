const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
import '../support/commands';


describe('Scenario 01 - Filtrage des tests du dossier "CNAV"', () => {
  beforeEach(() => {
    // Itération 1 - Se connecter à la plateforme avec le compte prod@at2c.fr
    cy.launchConnectionProd();

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  })
  
  it("Itération 2 - Vérifier que le dossier 'CNAV' est bien présent sur la page Dossiers", () => {
    cy.get('#item-folders-list span').contains('CNAV');
  })
  
  it("Itération 3 - Cliquer sur le dossier et vérifier que l'url d'arrivée contient bien /tests", () => {
    cy.goPageTests();
    cy.url().should('contain', '/tests');
  })
  
  it("Itération 4 - L'utilisateur doit pouvoir intéragir avec le bouton 'filtres' du tableau, en sélectionnant le filtre 'Etiquettes' avec la valeur 'audio'", () => {
    cy.goPageTests();
    cy.applyFilter('audio');
  })
  
  it("Itération 5 - Après avoir appliqué le filtre, 4 exécutions doivent être présentes à l'intérieur du tableau", () => {
    cy.goPageTests();
    cy.applyFilter('audio');
    cy.get('.MuiDataGrid-row[role="row"]')
      .should("have.length", 4);
  })
  
  it("Itération 6 - Vérifier qu'au moins la moitié de ces exécutions ont duré plus de 20 secondes", () => {
    let count = 0;
    cy.goPageTests();
    cy.applyFilter('audio');
    cy.get('.page-content').scrollIntoView();
    cy.get('.MuiDataGrid-virtualScroller').scrollTo('100%', 0).as('scrollContainer');
    cy.wait(500);
    cy.get('@scrollContainer')
      .find('.MuiDataGrid-row')
      .each(($item) => {
        const val = parseFloat($item.find('.MuiDataGrid-cell--withRenderer[data-field="execution_time"] > span')
          //.should('exist')
          .text()
          .split('s')[0]);
        if (val > 20) {
          count += 1;
          cy.log('===>', val)
        }
      })
      .then(() => {
        cy.log('=======>', count)
        cy.wrap(count).should('be.gt', 4*.5)
      });
  })
});


describe('Scenario 02 - Blocs de données de la page "Dashboard"', () => {
  it("Itération 1 - Se connecter à la plateforme avec le compte prod@at2c.fr", () => {
  })
  
  it("Itération 2 - Cliquer sur l'onglet 'Tableau de bord' dans la sidebar", () => {
  })
  
  it("Itération 3 - Vérifier que l'url d'arrivée contient bien /dashboards", () => {
  })
  
  it("Itération 4 - 4 blocs de données doivent être présents sur cette page", () => {
  })
  
  it("Itération 5 - Ces blocs doivent contenir chacun deux lignes de données", () => {
  })
  
  it("Itération 6 - La première ligne de données doit être en gras", () => {
  })
  
  it("E7 - Les deux blocs de droite doivent être de couleur grise", () => {
  })
  
  it("E8 - Si je reload la page, les blocs doivent toujours être affichés", () => {
  })
});