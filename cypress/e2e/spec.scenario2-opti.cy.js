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
  
  it.skip("Itération 1", () => {
    // Vérifier que le dossier 'CNAV' est bien présent sur la page Dossiers
    cy.get('#item-folders-list span').contains('CNAV');

    cy.goPageTests();

    // Cliquer sur le dossier et vérifier que l'url d'arrivée contient bien "/tests"
    cy.url().should('contain', '/tests');

    // L'utilisateur doit pouvoir intéragir avec le bouton 'filtres' du tableau, en sélectionnant le filtre 'Etiquettes' avec la valeur 'audio'
    cy.applyFilter('audio');

    // Après avoir appliqué le filtre, 4 exécutions doivent être présentes à l'intérieur du tableau
    cy.get('.MuiDataGrid-row[role="row"]')
      .should("have.length", 4);

    // Vérifier qu'au moins la moitié de ces exécutions ont duré plus de 20 secondes
    let count = 0;
    cy.get('.page-content').scrollIntoView();
    cy.get('.MuiDataGrid-virtualScroller').scrollTo('100%', 0).as('scrollContainer');
    cy.wait(500);
    cy.get('@scrollContainer')
      .find('.MuiDataGrid-row')
      .each(($item) => {
        const val = parseFloat($item.find('.MuiDataGrid-cell--withRenderer[data-field="execution_time"] > span')
          .text()
          .split('s')[0]);
        if (val > 20) {
          count += 1;
        }
      })
      .then(() => {
        cy.wrap(count).should('be.gt', 4*.5)
      });
  });
});


describe('Scenario 02 - Blocs de données de la page "Dashboard"', () => {
  beforeEach(() => {
    // Itération 1 - Se connecter à la plateforme avec le compte prod@at2c.fr
    cy.launchConnectionProd();

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  })
  
  it("Itération 1", () => {
    cy.goPageTests();
    // Cliquer sur l'onglet 'Tableau de bord' dans la sidebar
    cy.goPageDashboard();
    // Vérifier que l'url d'arrivée contient bien /dashboards
    cy.url().should('contain', '/dashboards');

    // 4 blocs de données doivent être présents
    cy.numberElementVerify(4);

    const statusArr = ['Ok', 'Ko', 'Nombre de tests aboutis sur la période', 'Durée moyenne des tests aboutis'];
    cy.get('#container-kpi-status-dashboard > *').each((item, index) => { // {F} Mieux vaut utilisers "*" pour englober tous les éléments
      expect(item).to.be.exist; // {F} Pas besoin de wrap ici, car tu utilises un expect

      // Ces blocs doivent contenir chacun 2 lignes de données
      cy.wrap(item)
      .children('*:nth-child(1)').as('firstBlock')
      .parent()
      // {F} Utilise le moins possible des élément définis (div, span, etc), car si ils changent, ton test va fail - Ici "*" permet de prendre en compte tous les éléments
      .children('*:nth-child(2)').as('secondBlock'); // {F} Tu peux utiliser parent pour revenir au bloc complet, pour éviter d'appeler deux fois cy.wrap

      // La 1ère ligne de données doit être en gras

      // {F} Tu peux regrouper les deux traitements (du texte et du css) en un seul bloc:
      cy.get('@firstBlock').then((child) => { // {F} Ici il est préférable d'utiliser then que should
        expect(parseInt(child.text())).to.be.greaterThan(0);
        expect(child).to.have.css('font-weight', '700');
      });

      cy.get('@secondBlock')
        .contains(statusArr[index]);

      // Les deux blocs de droite doivent être de couleur grise
      if (index > 1) {
        cy.wrap(item).should(($block)=> {
          expect($block).to.have.css('background-color', 'rgb(204, 204, 204)');
        });
      }
    });

    // {F} Ici j'ai regroupé ta dernière itération en la mettant dans la première, 
    // il faut juste penser à la mettre en dehors du "each" pour que ça fonctionne

    cy.reload();
    cy.wait(1000)
    cy.numberElementVerify(4);
  })
});
