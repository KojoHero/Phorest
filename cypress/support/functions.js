function selectGiftCardValue() {
    const options = ['$50','$100','$150','Other']
    const giftCardValue = Math.floor(Math.random()*options.length)
    if (options==='Other'){
        cy.g
    }
}

export function generateRandomName() {
    const firstName = ['Happy', 'Paul', 'James', 'Holland', 'Jane', 'Eva', 'Mike', 'John'];
    const lastName = ['Mathews', 'Roberts', 'Callum', 'Adams', 'Tyler', 'Tiger', 'Woods', 'Doe'];
  
    const randomfirstName = firstName[Math.floor(Math.random() * firstName.length)];
    const randomlastName = lastName[Math.floor(Math.random() * lastName.length)];
  
    return [randomfirstName,randomlastName]
  }
  