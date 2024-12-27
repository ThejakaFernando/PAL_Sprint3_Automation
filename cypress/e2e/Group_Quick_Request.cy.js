describe("Quick Request Feature", () => {
    it("should successfully make a quick request for the last group session when S-Tutor message is displayed", () => {
        // Step 1: Navigate to the login page and log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("fury@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the "Request Session" page
        cy.contains('nav a', "Request Session").should("be.visible").click();

        // Step 3: Navigate to "Request a Group Session" page
        cy.contains('a', "Request a Group Session →").should("be.visible").click();

        // Step 5: Click on "Click To Quick Request" span element
        cy.contains('span.font-semibold', "Click To Quick Request").should("be.visible").click();

        // Step 6: Wait for the Quick Request div to appear and be visible
        cy.get('div[x-show="showSession"]', { timeout: 10000 }) // Wait for up to 10 seconds
            .should('exist') // Ensure the element exists
            .should('be.visible') // Ensure the element is visible
            .and('not.have.class', 'translate-x-full'); // Ensure it has transitioned

        // Step 7: Ensure the S-Tutor message is visible
        cy.get('p.text-gray-600')
            .should("contain.text", "Hey Sinner, I would love to help you out!! See you at L3CR8..");

        // Step 8: Click the "Request Group Session Again" button by ID
        cy.get('#request-group-session-again') // Target the button using the ID
            .should("be.visible")
            .click();

        // Step 9: Verify that the "Request Group Session Again" title is visible after the request
        cy.get('#request-group-session-title').should("be.visible");

        // Step 10: Verify successful quick request submission (optional: check for success message or confirmation)
        // cy.contains("Group Session request submitted successfully").should("be.visible");

        // Step 11: Select the radio button for the available session slot
        cy.get('input[name="slot_id"][value="3"]') // Select the radio button with value "3"
            .should("be.visible")
            .check(); // Click the radio button

        // Step 12: Enter a message into the textarea
        cy.get('textarea[name="message"]') // Select the message textarea
            .should("be.visible")
            .type('Hey, I would love to request a session from you again. I need some clarification on Models & Controllers...');

        // Step 13: Verify successful form filling (optional: check for a submit button or success message)
        cy.get('#confirm-group-session-request') // Target the button using the ID
        .should("be.visible")
        .click();

    });
});
