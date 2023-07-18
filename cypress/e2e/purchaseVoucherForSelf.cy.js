const data = require("../fixtures/data.json");
import { generateRandomName } from "../support/functions";

describe("Purchase voucher for someone", () => {
  let inboxId;
  let emailAddress;
  const randomName = generateRandomName();

  it("Should visit the voucher purchase page and complete form", () => {
    cy.intercept( "GET","https://gift-cards.phorest.com/salons/demous//checkout*").as("checkoutRequest");
    cy.visit("/");

    cy.wait("@checkoutRequest", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get('#option50').click()

    cy.createInbox().then((inbox) => {
      inboxId = inbox.id;
      emailAddress = inbox.emailAddress;

      cy.get('input[data-target="email.purchaserEmailInput"]').type(emailAddress);
      cy.get('input[data-target="name.purchaserFirstNameInput"]').type(randomName[0]);
      cy.get('input[data-target="name.purchaserLastNameInput"]').type(randomName[1]);
    });

    cy.get('button[data-target="checkout.checkoutButton"]').click()
    //assert details on the checkout confirmation page
    //voucher
    //email

  });


  it("Should visit the checkout page and fill the forms", () => {
    const {name, creditCard, cvc, date, zipCode} = data
    cy.get('button[data-action="confirm#confirmAction"]').click()
    cy.get('#card-name').type(name);
    cy.get('#card-number').type(creditCard);
    cy.get('#card-security').type(cvc);
    cy.get('#card-zip').type(zipCode);
    cy.get('#card-expiry').type(date);
    cy.get('#submitButton').click();
  });

  it("Should test that email has been delivered", () => {
    cy.contains('Payment accepted, thank you!').should('be.visible')
    cy.waitForLatestEmail(inboxId).then(email => {
        // verify we received an email
        assert.isDefined(email);
        const emailSubject = email.subject
        code = /([0-9]{2})$/.exec(emailSubject)[1];
    
        // verify that email contains the code
        assert.strictEqual(`You've been sent a $${code}.00 gift card for Demo US!`, true);
      });
  });
});
