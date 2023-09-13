const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
import '../support/commands';


describe('Scenario 01 - Comparaison de données provenant d\'une requête et d\'un mock', () => {
  it("Itération 1", () => {
    // l'interception de la requête ne peut se faire qu'avant l'action (bouton ou changement d'url) déclenchant la requête
    cy.intercept('GET', '**/api/comments?content=87', req => {
      req.reply({
        statusCode: 200,
        fixture: 'comments.json'
      });
    }).as('reqReply');

    // Action
    cy.visit('https://grafikart.fr/tutoriels/carrousel-javascript-87')
      .wait(1000);

    // Détecte et s'arrête sur la 1ère requête
    cy.wait('@reqReply').then(res => {
      cy.fixture("comments").then(fixture => {
        expect([res.response.body[0]]).to.deep.eq(fixture);
      });
    });
  })
  
  it.only("Itération 2", () => {
    // l'interception de la requête ne peut se faire qu'avant l'action (bouton ou changement d'url) déclenchant la requête
    cy.intercept('GET', '**/api/courses/', req => {
      req.reply({
        statusCode: 200,
        fixture: 'courses.json'
      });
    }).as('reqReply');

    // Action
    cy.visit('https://dyma.fr/')
      .wait(1000);

    // Détecte et s'arrête sur la 1ère requête
    cy.wait('@reqReply').then(res => {
      cy.fixture("courses").then(fixture => {
        expect([res.response.body[0]]).to.deep.eq(fixture);

        cy.get('.popular-tech-container > a').first().find('h3')
          .scrollIntoView()
          .contains(res.response.body[0].title);
        expect(res.response.body[0].title).to.deep.eq(fixture[0].title);
      });
    });
  })
});