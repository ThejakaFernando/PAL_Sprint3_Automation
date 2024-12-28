describe("Platform Admin revoking a message that has been sent to S-Tutor already", () => {
    it("should allow the Platform Admin to revoke a previously sent message to an S-Tutor", () => {
        // Step 1: Log in as the Platform Admin
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

        // Step 6: Click the 'Send Message' link for the same S-Tutor again
        cy.contains('td', 'Alexander Bell').parent().within(() => {
            cy.contains('a', 'Send Message').click();
        });

        // Step 7: Click the 'View Previous Messages' link
        cy.contains('a', "View Previous Messages").should('have.attr', 'href', 'http://127.0.0.1:8000/send-message/user/history/5').click();

        // Step 8: Locate the specific message and click the 'Revoke Message' button
        cy.contains('p', "Dear Tutor, We have noticed that a pending session request has surpassed its scheduled date. We kindly urge you to address this matter promptly. Continued unresponsiveness may lead to termination from the tutor program. Thank you for your understanding.")
            .parent() // Find the parent element containing this text
            .within(() => {
                // Click the 'Revoke Message' button
                cy.get('button').contains('Revoke Message').click();
            });

        // Step 9: Verify the confirmation prompt and revoke the message
        cy.contains('p.text-gray-600.mb-6', "Are you sure you want to revoke this message? This action cannot be undone.")
            .should("be.visible"); // Verify confirmation message is displayed
        cy.get('button[type="submit"].bg-red-500').contains('Revoke').click(); // Click the 'Revoke' button

        // Step 10: Verify the success message
        cy.contains('div.bg-green-100.border-l-4.border-green-500.text-green-700', "Message revoked successfully.")
            .should("be.visible"); // Verify success message is displayed
    });
});
