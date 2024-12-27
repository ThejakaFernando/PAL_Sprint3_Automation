describe("Sending a Custom Message to an S-Tutor", () => {
    it("should successfully send a custom message to the S-Tutor and it should display to the specific S-Tutor and mark it as 'Read'", () => {
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

        // Step 4: Click the 'Send Custom Message' button
        cy.get('a[href="http://127.0.0.1:8000/send-message/custom/5"]').click();

        // Step 5: Enter the topic for the message
        cy.get('#topic').type("Subject: Termination of S-Tutor Role");

        // Step 6: Enter the message in the message textarea
        cy.get('#message').type("We regret to inform you that your role as an S-Tutor has been terminated due to failure to adhere to the established guidelines and rules of the platform.");

        // Step 7: Click the 'Send Message' button
        cy.get('button[type="submit"]').contains('Send Message').click();

        // Step 8: Verify success or confirmation message (optional, based on your app's behavior)
        cy.contains('Message sent successfully').should('be.visible'); // Adjust if your app shows a different success message

        // Step 9: Log out as the admin
        cy.get('button[type="submit"]').contains('Log out').click(); // Updated selector for logout button

        // Step 10: Log in as an S-Tutor
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("bell@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 11: Navigate to the 'Inbox' page
        cy.visit("http://127.0.0.1:8000/inbox");

        // Step 12: Check for the message with the subject "Termination of S-Tutor Role" and mark it as read
        cy.contains('h3', 'Subject: Termination of S-Tutor Role').parent().within(() => {
            cy.get('button').contains('Mark as Read').click();
        });

        // Step 13: Verify that the message is marked as read (optional, based on your app's behavior)
        cy.contains('Message marked as read').should('be.visible'); // Adjust if your app shows a different success message
    });
});
