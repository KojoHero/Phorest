# Phorest Assignment documentation

### The test is scripted in javascript using cypress e2e automation tool.
















## CI for the test

-- The CI tool used was GitHub Action
-- It is set that the the test runs on two instances.
     -- on push (when a new set of code is pushed to Github)
     -- every 5pm of a week day (Assuming close of day - so that tests result can be seen early morning the next working day)



## Bugs Identified
- Expired credit card



# setting up test
- clone this repository onto your computer
- Open the cloned repo in an editor of choice
- Open terminal of the editor and run the command below
   ```npm i```
- The above will install the necessary dependencies for your code to run
- Run ```npm run test``` to open the cypress runner
- Click on the test (purchaseVoucher.cy.js) to run the test
- to generate report.....