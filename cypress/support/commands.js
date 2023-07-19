import '@testing-library/cypress/add-commands'
const { MailSlurp } = require("mailslurp-client");

// const apiKey = "c6826256bb0a902ad2172deaf105114e21c4d1d7f54cd5b8eb5c0ac47028f064"
const apiKey = "fb99e348e492a8de0f4708310fb6bfdb0f01576e808f72c0748024ef52167ba5"
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