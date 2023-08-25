/// <reference types="cypress" />

class WikipediaPage {
  async goto({ value }) {
    cy.visit(value || "https://www.wikipedia.org");

    return this;
  }
}

module.exports.WikipediaPage = WikipediaPage;
