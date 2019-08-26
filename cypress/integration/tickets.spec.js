describe("Tickets", () => {
  beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));
  it("fills all the text input fields", () => {
    const firstname = "Tiago";
    const lastname = "Pereira da Cruz";

    cy.get("#first-name").type(firstname);
    cy.get("#last-name").type(lastname);
    cy.get("#email").type("testetiago@gmail.com");
    cy.get("#requests").type("Carnivour");
    cy.get("#signature").type(`${firstname} ${lastname}`);
  });

  it("select two tickets", () => {
    cy.get("#ticket-quantity").select("2");
  });

  it("select 'vip' ticket type", () => {
    cy.get("#vip").check();
  });

  it("selects 'social media' checkbox", () => {
    cy.get("#social-media").check();
  });

  it("selects 'friend' and 'publication', then uncheck 'friend'", () => {
    cy.get("#friend").check();
    cy.get("#publication").check();
    cy.get("#friend").uncheck();
  });

  it("has 'TICKETBOX' header's heading", () => {
    cy.get("header h1").should("contain", "TICKETBOX");
  });

  it("alerts on invalid email", () => {
    cy.get("#email")
      .as("email")
      .type("eheh-gmail.com");

    cy.get("#email.invalid").should("exist");

    cy.get("@email")
      .clear()
      .type("ehehe@gmail.com");

    cy.get("#email.invalid").should("not.exist");
  });

  it("fills and reset the form", () => {
    const firstname = "Tiago";
    const lastname = "Pereira da Cruz";
    const fullname = `${firstname} ${lastname}`;

    cy.get("#first-name").type(firstname);
    cy.get("#last-name").type(lastname);
    cy.get("#email").type("testetiago@gmail.com");
    cy.get("#ticket-quantity").select("2");
    cy.get("#vip").check();
    cy.get("#friend").check();
    cy.get("#requests").type("Carnivour");

    cy.get(".agreement p").should(
      "contain",
      `I, ${fullname}, wish to buy 2 VIP tickets`
    );

    cy.get("#agree").click();
    cy.get("#signature").type(fullname);

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled");

    cy.get("button[type='reset']").click();

    cy.get("@submitButton").should("be.disabled");
  });

  it("fills mandatory fields using support command", () => {
    const customer = {
        firstname: "João",
        lastname: "Silva",
        email: "joaosilva@gmail.com"
    };

    cy.fillMandatoryfields(customer);

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled");

    cy.get("#agree").uncheck();

    cy.get("@submitButton").should("be.disabled");
  });
});
