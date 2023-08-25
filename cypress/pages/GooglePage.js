/// <reference types="cypress" />

class GooglePage {
  async goto() {
    cy.visit("https://google.es");

    return this;
  }

  searchInput({ value }) {
    cy.get("#APjFqb").type(value);
    cy.get("#APjFqb").type("{enter}");

    return this;
  }

  getHrefOfTitleResult({ value }) {
    return cy.contains(value).invoke("attr", "href");
  }
}

module.exports.GooglePage = GooglePage;
