describe("Sending a Custom Message to an S-Tutor with Null Message", () => {
    it("should restrict Platform Admin in sending a custom message to S-Tutor if, message field is empty.", () => {
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
        cy.get('#topic').type("Subject: [IMPORTANT] Regarding Overdue Pending Sessions...");

        // Step 6: Click the 'Send Message' button
        cy.get('button[type="submit"]').contains('Send Message').click();

       
    });
});
