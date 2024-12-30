describe("Save Availability Hour with Duplicate Check", () => {
    it("should display an error message when trying to save the same availability hour twice", () => {
        // Step 1: Navigate to the login page and log in
        cy.visit("http://127.0.0.1:8000/login");

        cy.get('input[name="email"]').type("isaacnewton@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the profile availability page
        cy.get('#profil-img').click({ force: true }); // Force the click on the profile image
        cy.contains('a', "Update Your Available Tutoring Time").click();

        // Step 3: Select the day of the week
        cy.get('#day_of_week').select("Thursday");

        // Step 4: Select start time
        cy.get('#start_time').select("14:30"); // 2:30 PM

        // Step 5: Select end time
        cy.get('#end_time').select("17:30"); // 5:30 PM

        // Step 6: Click the "Save Availability Hour" button
        cy.get('button[type="submit"].bg-blue-500').click();

        // Step 7: Verify success message for saving availability
        // cy.contains("Availability hour saved successfully").should("be.visible");

        // Step 8: Attempt to save the same availability hour again
        cy.get('#day_of_week').select("Thursday");
        cy.get('#start_time').select("14:30"); // 2:30 PM
        cy.get('#end_time').select("17:30"); // 5:30 PM
        cy.get('button[type="submit"].bg-blue-500').click();

        // Step 9: Verify error message for duplicate availability
        cy.contains("Error: This time overlaps with an existing time or is a duplicate.").should("be.visible");
    });
});
