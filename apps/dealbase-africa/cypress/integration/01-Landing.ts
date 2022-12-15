context("Landing Page", () => {
  before(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
    cy.findByRole("button", { name: /Toggle Dark Mode Switch/i }).click();
  });

  it("loads the landing page correctly", () => {
    cy.findByText(/Track the Latest in African Tech Fundraising/i);
  });

  it("can add an investor to the subscribers", () => {
    cy.intercept("POST", "**/api/subscribers", {
      statusCode: 200,
      body: {
        success: true,
        subscriber: {},
      },
    }).as("subscribers");

    cy.findByRole("button", { name: /investors/i }).click();
    cy.findByPlaceholderText(/Email/i).type("test@email.com");
    cy.findByPlaceholderText(/First Name/i).type("John");
    cy.findByPlaceholderText(/Last Name/i).type("Doe");
    cy.get("input[name='company']").type("Acme");
    cy.findByRole("button", { name: /Sign up/i }).click();

    cy.wait("@subscribers");

    cy.findByText(/Successfully Signed Up/i);
    cy.findByText(/Your details have been added to our subscriber list/i);
    cy.findByRole("button", { name: /Close/i }).click();
    cy.findByText(/Successfully Signed Up/i).should("not.exist");
  });

  it("can add an investor to the subscribers", () => {
    cy.intercept("POST", "**/api/subscribers", {
      statusCode: 200,
      body: {
        success: true,
        subscriber: {},
      },
    }).as("subscribers");

    cy.findByRole("button", { name: /investors/i }).click();
    cy.findByPlaceholderText(/Email/i).type("test@email.com");
    cy.findByPlaceholderText(/First Name/i).type("John");
    cy.findByPlaceholderText(/Last Name/i).type("Doe");
    cy.get("input[name='company']").type("Acme");
    cy.findByRole("button", { name: /Sign up/i }).click();

    cy.wait("@subscribers");

    cy.findByText(/Successfully Signed Up/i);
    cy.findByText(/Your details have been added to our subscriber list/i);
    cy.findByRole("button", { name: /Close/i }).click();
    cy.findByText(/Successfully Signed Up/i).should("not.exist");
  });

  it("can add a founder to the subscribers", () => {
    cy.intercept("POST", "**/api/subscribers", {
      statusCode: 200,
      body: {
        success: true,
        subscriber: {},
      },
    }).as("subscribers");

    cy.findByRole("button", { name: /founders/i }).click();
    cy.findByPlaceholderText(/Email/i).type("test@email.com");
    cy.findByPlaceholderText(/First Name/i).type("John");
    cy.findByPlaceholderText(/Last Name/i).type("Doe");
    cy.get("input[name='company']").type("Acme");
    cy.findByRole("button", { name: /Sign up/i }).click();

    cy.wait("@subscribers");

    cy.findByText(/Successfully Signed Up/i);
    cy.findByText(/Your details have been added to our subscriber list/i);
    cy.findByRole("button", { name: /Close/i }).click();
    cy.findByText(/Successfully Signed Up/i).should("not.exist");
  });

  it("can change the date filter", () => {
    cy.get(".rs-picker-toggle-value").click();
    cy.findByText(/since beginning of 2021/i).click();
    cy.findByRole("button", { name: /ok/i }).click();
  });
});
