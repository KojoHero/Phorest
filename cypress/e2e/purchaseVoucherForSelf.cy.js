const data = require("../fixtures/data.json");
import { generateRandomName } from "../support/functions";

describe("Purchase voucher for someone", () => {
  let inboxId;
  let emailAddress;
  const randomName = generateRandomName();

  before(() => {
    cy.visit("/");
    cy.get('#option50').click();
  });

  it("Should visit the voucher purchase page and complete form", () => {
    cy.createInbox().then((inbox) => {
      inboxId = inbox.id;
      emailAddress = inbox.emailAddress;
      cy.get('input[data-target="email.purchaserEmailInput"]').type(emailAddress);
      cy.get('input[data-target="name.purchaserFirstNameInput"]').type(randomName[0]);
      cy.get('input[data-target="name.purchaserLastNameInput"]').type(randomName[1]);
      cy.get('button[data-target="checkout.checkoutButton"]').first().click({ force: true });
    });
  });

  it("Should visit the checkout page and fill the forms", () => {
    cy.contains(emailAddress).should('be.visible')
    cy.intercept("POST", "https://m.stripe.com/6").as("cardInfo");
    const { name, creditCard, cvc, date, zipCode } = data;

    cy.get('button[data-action="confirm#confirmAction"]').click();
    cy.wait('@cardInfo');

    cy.get('iframe[id^="hostedform-"]').then($iframe => {
      const iframe = $iframe.contents();

      cy.wrap(iframe).find('input[name="cardName"]').type(name);
      cy.wrap(iframe).find('input[name="cardNumber"]').type(creditCard);
      cy.wrap(iframe).find('input[name="cardExpiry"]').type(date);
      cy.wrap(iframe).find('input[name="cardSecurity"]').type(cvc);
      cy.wrap(iframe).find('input[name="cardZip"]').type(zipCode);
      cy.wrap(iframe).find('button[id="submitButton"]').click();
    });
  });

  it("Should test that email has been delivered", () => {
    cy.intercept('POST', 'https://gift-cards.phorest.com/salons/demous/purchases').as('successMessage');
    cy.wait('@successMessage');

    cy.contains('Payment accepted, thank you!').should('be.visible');

    cy.waitForLatestEmail(inboxId).then(email => {
      assert.isDefined(email);
      const expectedSubjects = [`You've been sent a $50.00 gift card for Demo US!`, 'Your Receipt for Arden Courts'];
      expect(expectedSubjects).to.include(email.subject);
    });
  });
});
