# Phorest Assignment documentation

## Methodology

Since the assignment is to test the voucher purchasing flow and vouchers can be purchased for oneself and others in my preferred language, I used **Cypress with Javascript**.
I divided the test into two files; i.e *purchaseVoucherForOthers.cy.js* and *purchaseVoucherForSelf.cy.js*.

### Details
- purchaseVoucherForSelf.cy.js

I stored the details of the credit card to be used in json file and created a function that returns random first and last names and imported them into the test. (line 1-2)

Declaration of variables (line 5-7)

A `before` hook that visits the test page and select a gift card type (line 9-12)

Since I will check if email was delivered, I integrated a third party application called *Mailslurp* to provide email services. (generate email and provide inbox sevices)

The first `It` block generates the email address, stores the inbox id, fills and submits the details of the gift card purchaser. (line 14-23)

The next `it` block goes to the checkout page and fill the credit card details. (line 25-42). Since the form is in an iframe, I had to wrap the contents to be able to access them.

The last `it` block asserts that the purchase was successful and the purchaser receives a mail confirming purchase. (line 44-56) 


- purchaseVoucherForOthers.cy.js

I stored the details of the credit card to be used in json file and created a function that returns random first and last names and imported them into the test. (line 1-2)

Declaration of variables (line 5-7)

A `before` hook that visits the test page and select a gift card type (line 9-12)

Since I will check if email was delivered to the one it was bough for, I used *Mailslurp*

The first `It` block generates the email address, stores the inbox id, fills and submits the details of the gift card purchaser and the one it is been purchased for. (line 14-28)

The next `it` block goes to the checkout page and fill the credit card details. (line 30-46).

The last `it` block asserts that the purchase was successful and the purchaser receives a mail confirming purchase. (line 48-58) 


### Other Information
- Custom commands
Two custom commands were created to facilitate the email testing.
     -- createInbox
     -- waitForLatestEmail
They can be found at `/cypress/support/commands.js` and are used in both tests.

- Intercepts
It became necesary to create intercepts of certain services in the test process so as not to add waiting time to the test or cause the test to fail due to the page waiting for them to load.

Example, Check line 26 and 45 used at line 30 and 46 in the `purchaseVoucherForSelf.cy.js` test file


### CI for the test

- The CI tool used was GitHub Action
The test runs on two instances.
     -- on push (when a new set of code is pushed to Github)
     -- every 5pm of a week day (Assuming close of day is 5pm - so that tests result can be seen early morning the next working day)


# Test setup
- clone this repository onto your computer
- Open the cloned repo in an editor of choice
- Open terminal of the editor and run the command ```npm i```
- The above will install the necessary dependencies for your code to run
- Run ```npm run test``` to open the cypress runner
- Click on the test file to run it


## Bugs Identified
- First name and Last name fields can accept only numbers. Image here `/Images/Screenshot 2023-07-19 at 2.49.47 PM.png`
- Credit card image does not show amount after visiting test confirmation page
   #### Steps to reproduce
   1. select a gift card value (assert that the value is displayed on the gift card image)
   2. Fill the user details fields
   3. Click on "Checkout" button to visit the checkout confirmation page
   4. Click on edit to return to the previous page
   5. assert that the gift card value is no longer displayed on the gift card value
   Screenshot: `Images/Screenshot 2023-07-19 at 2.59.38 PM.png`

