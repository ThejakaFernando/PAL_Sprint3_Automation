describe("Attempt to Request Individual Session Without Filling All Required Fields", () => {
    it("should show an error message when trying to submit without filling all required fields", () => {
        // Step 1: Log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("sara@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
  
        // Step 2: Navigate to the request session page
        cy.visit("http://127.0.0.1:8000/request-session");

        cy.get('body').then(($body) => {
            if ($body.find('#warning-message').length > 0) {
                cy.log("Feedback pending. Completing feedback first...");
                
                // Verify warning message
                cy.get('#warning-message').should("contain.text", "Please complete your pending feedback before requesting a new session.");
  
                // Step 4: Select rating as 4
                cy.get('.star.hover\\:text-yellow-400')
                    .eq(3)
                    .click();
  
                // Step 5: Enter feedback message
                cy.get('textarea#feedback_message').type("It was a really good session. I enjoyed it a lot!");
  
                // Step 6: Submit feedback
                cy.get('button[type="submit"].bg-indigo-600.text-white.rounded-lg.shadow').click();
  
                // Step 7: Verify feedback submission
                cy.contains("Your feedback for the group session has been submitted successfully!").should("be.visible");
  
                // Navigate back to the request session page
                cy.visit("http://127.0.0.1:8000/request-session");
            } else {
                cy.log("No feedback required. Proceeding to request a session...");
            }
        });

        // Step 3: Select "SSP1" from the module dropdown
        cy.get('#moduleSelect').select("SSP1");
  
        // Step 4: Select "James Lee" as the tutor
        cy.get('#tutorSelect').select("James Lee");
  
        // Step 5: Enter the message in the text area
        cy.get('textarea[name="message"]')
            .type("Hi James, I have some clarifications to make regarding setting up a Laravel 11 project and setting up Livewire, can you help me out?");
  
        // Step 6: Click the "Request" button to open the modal
        cy.get('#request-indv').click();
  
        // Step 7: Click the "Request" button in the modal to submit the form
        cy.get('#request-confirm').click();
  
        // Step 8: Verify the error message is shown for missing required fields
        cy.contains('Please fill all the fields to request a session!')
            .should('be.visible')
            .and('contain.text', 'Please fill all the fields to request a session!');
    });
});
