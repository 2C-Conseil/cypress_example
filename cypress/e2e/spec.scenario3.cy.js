const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
import '../support/commands';


describe('Scenario 01 - Filtrage des tests du dossier "CNAV"', () => {
  it.only("Itération 1", () => {
    // l'interception de la requête ne peut se faire qu'avant l'action (bouton ou changement d'url) déclenchant la requête
    cy.intercept('GET', '**/api/comments?content=87', req => {
      req.reply({
        statusCode: 200,
        fixture: 'comments.json'
      });
    }).as('reqReply');
    cy.visit('https://grafikart.fr/tutoriels/carrousel-javascript-87');
    cy.wait(1000);
    cy.get('.comment-list .comment')
      .first().children('.comment__content')
      .scrollIntoView()
      .as('comment');

    // Détecte et s'arrête sur la 1ère requête
    cy.wait('@reqReply').then(res => {
      cy.fixture("comments").then(fixture => {
        console.log(fixture,'>>>>>>>>> res:', [res.response.body[0]]);
        expect([res.response.body[0]]).to.deep.eq(fixture);
      });
    });



    /* cy.intercept('GET', '/api/comments?content=87', { fixture: 'comments.json' }, (req) => {
      console.log('>>>>>>>>> req:', req);
      cy.wait(500);
      
        //expect([req.body[0]]).to.deep.eq(fixture);
    }); */
    /* cy.fixture('comments.json').then(fixture => {
      console.log('>>>>>>>>> fixture:', fixture);
      cy.wait(500);
      cy.intercept('GET', '/api/comments?content=87', req => {
        console.log('>>>>>>>>> req:', req);
        req.continue(res => {
          expect([res.body[0]]).to.deep.eq(fixture);
          console.log('>>>>>>>>> res:', [res.body[0]]);
        });
      });
    }); */
    //cy.get('.comment__author').contains("Thibert Nkubonage")
  });
});