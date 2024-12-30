describe("Set Preferences and View Recommended Tutors", () => {
    it("should set preferences and verify no tutors are available", () => {
        // Step 1: Log in as Anna
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("anna@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the Faculty page
        cy.visit("http://127.0.0.1:8000/faculty");

        // Step 3: Click "Set Your Preferences"
        cy.contains('button', "Set Your Preferences").should("be.visible").click();

        // Step 4: Select the checkbox for module with value 9
        cy.get('input[type="checkbox"][name="module_ids[]"][value="9"]').check();

        // Step 5: Click "Save Preferences"
        cy.contains('button', "Save Preferences").should("be.visible").click();

        // Step 6: Click "Show Recommended Tutors for Preference"
        cy.contains('span', "Show Recommended Tutors for Preference").should("be.visible").click();

        // Step 7: Verify the message about no tutors being available
        cy.contains("No tutors are currently available based on your preferences. Please check back later.").should("be.visible");
    });
});
