
const { MailSlurp } = require("mailslurp-client");

const apiKey = "c6826256bb0a902ad2172deaf105114e21c4d1d7f54cd5b8eb5c0ac47028f064"
const mailslurp = new MailSlurp({ apiKey });
Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  const timeoutMillis = 30000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis);
});