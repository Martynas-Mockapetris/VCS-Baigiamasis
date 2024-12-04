describe("checks login function and home page rendering", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit("http://localhost:5173/");
    });
    it("looks for login, tries to navigate to login page", () => {
      cy.get("div.auth-links i.bi-person")
        .click()
        .get("form label")
        .should("exist")
        .should("contain.text", "Email")
        .should("contain.text", "Password");
    });
    it("tries to log in, checks home page for relevan navbar changes", () => {
      cy.get("div.auth-links i.bi-person")
        .click()
        .get("form")
        .find("input[type='email']")
        .should("exist")
        .type("adis@adonis.com")
        .get("form")
        .find("input[type='password']")
        .should("exist")
        .type("Adis123!")
        .get("form")
        .find("button")
        .click()
        .get("div.auth-links span")
        .should("contain.text", "Welcome, adis adonis!");
    });
  });
  