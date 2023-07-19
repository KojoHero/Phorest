import '@testing-library/cypress/add-commands'
const { MailSlurp } = require("mailslurp-client");

const apiKey = "7fada9c86145fb052f184f5d7652965c1d7953bd28493da2d3ecb668204c9a80"
const mailslurp = new MailSlurp({ apiKey });
Cypress.Commands.add("createInbox", async() => {
  const inbox = await mailslurp.inboxController.createInboxWithOptions({
    createInboxDto: {
      useShortAddress: true,
    },
  });
  return inbox;
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  const timeoutMillis = 30000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis);
});