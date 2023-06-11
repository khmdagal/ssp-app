/// <reference types="cypress"/>


describe("login form", () => {
  it("should submit login info", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="userNameInputField"]').type("Khadar");
    cy.get('[data-cy="passwordInputField"]').type("Abc123");
    cy.get('[data-cy="submitButton"]').click();

    cy.location("pathname").should("eq", "/dashboard");

    //cy.wait(10000);
    cy.get(":nth-child(1) > .word-container > label").should("contain.text", "accident");
  });

});
