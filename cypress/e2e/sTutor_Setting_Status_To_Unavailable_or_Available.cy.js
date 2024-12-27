describe("S-Tutor Setting Availability to Unavailable", () => {
    it("S-Tutor setting their status to 'Unavailable' or 'Available' ", () => {
        // Step 1: Log in as the S-Tutor
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("mike@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the S-Tutor's profile page
        cy.visit("http://127.0.0.1:8000/profile/availability"); // Adjust URL as per your app's routing

        cy.contains('span', 'Saturday: 8:00 AM - 12:00 PM').parent().within(() => {
            // Step 4: Check the availability button text and click accordingly
            cy.get('button').then((button) => {
                // Ensure the button is a single element before clicking
                if (button.length === 1) {
                    if (button.text().includes('Unavailable')) {
                        // If the button is 'Unavailable', click it twice to set it to 'Available'
                        cy.wrap(button).click().click();
                    } else {
                        // If the button is 'Available', click once to set it to 'Unavailable'
                        cy.wrap(button).click();
                    }
                } else {
                    // Handle case where there are multiple buttons if needed
                    cy.wrap(button).first().click();
                }
            });
        });


        // Step 5: Verify the success message is displayed
        cy.contains('div', 'Availability status updated!').should('be.visible');
    });
});
