describe("Restrict User Requesting an Individual Session Again Without Selecting Time Slot", () => {
    it("should not allow user to request an Individual session again without selecting a time slot ", () => {
        // Step 1: Navigate to the login page and log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("ruby@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the "Request Session" page
        cy.contains('nav a', "Request Session").should("be.visible").click();

        // Step 3: Navigate to "Request a Group Session" page
        //cy.contains('a', "Request a Individual Session →").should("be.visible").click();

        // Step 5: Click on "Click To Quick Request" span element
        cy.contains('span.font-semibold', "Click To Quick Request").should("be.visible").click();

        // Step 6: Wait for the Quick Request div to appear and be visible
        cy.get('div[x-show="showSession"]', { timeout: 10000 }) // Wait for up to 10 seconds
            .should('exist') // Ensure the element exists
            .should('be.visible') // Ensure the element is visible
            .and('not.have.class', 'translate-x-full'); // Ensure it has transitioned

        // Step 7: Ensure the S-Tutor message is visible
        cy.get('p.text-gray-600')
            .should("contain.text", " Hey Ruby, of course! See you soon at Level 1 Lab 1...");

        // Step 8: Click the "Request Group Session Again" button by ID
        cy.get('#request-individual-session-again') // Target the button using the ID
            .should("be.visible")
            .click();

        // Step 9: Verify that the "Request Group Session Again" title is visible after the request
        cy.get('#request-again-title-individual').should("be.visible");

        // Step 10: Verify successful quick request submission (optional: check for success message or confirmation)
        // cy.contains("Group Session request submitted successfully").should("be.visible");

        // Step 12: Enter a message into the textarea
        cy.get('textarea[name="message"]') // Select the message textarea
            .should("be.visible")
            .type('Hey, I would love to request a session from you again. I need some clarification on Configuring MongoDB as well...');

        // Step 13: Verify successful form filling (optional: check for a submit button or success message)
        cy.get('#confirm-request-btn-individual') // Target the button using the ID
        .should("be.visible")
        .click();

    });
});