describe("Sending a Predefined Message to an S-Tutor", () => {
    it("should successfully send a predefined message to the S-Tutor and mark it as read", () => {
        // Step 1: Log in as the admin
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("palcontroller.apiit@gmail.com");
        cy.get('input[name="password"]').type("admin123");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the 'Monitor Tutor Sessions' page
        cy.visit("http://127.0.0.1:8000/admin/monitor-tutor-sessions");

        // Step 3: Locate the row with the S-Tutor "Alexander Bell" and click the 'Send Message' link
        cy.contains('td', 'Alexander Bell').parent().within(() => {
            cy.contains('a', 'Send Message').click();
        });

        // Step 4: Select the 'Overdue Pending Session' predefined message
        cy.get('#message_predefined').select('overdue_pending_session');

        // Step 5: Click the 'Send Message' button
        cy.get('button[type="submit"]').contains('Send Message').click();

        // Step 6: Log out as the admin
        cy.get('button[type="submit"]').contains('Log out').click();

        // Step 7: Log in as an S-Tutor
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("bell@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 8: Navigate to the 'Inbox' page
        cy.visit("http://127.0.0.1:8000/inbox");

        // Step 9: Check for the message with the subject "Overdue Pending Session" and mark it as read
        cy.contains('h3', 'Overdue Pending Session').parent().within(() => {
            cy.get('button').contains('Mark as Read').click();
        });

        // Step 10: Verify that the message is marked as read (optional, based on your app's behavior)
        cy.contains('Message marked as read').should('be.visible'); // Adjust if your app shows a different success message
    });
});
