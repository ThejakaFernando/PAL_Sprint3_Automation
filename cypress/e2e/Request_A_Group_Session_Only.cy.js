describe("Group Session Request and Tutor Acceptance Flow", () => {
    it("should successfully handle feedback requirement, request a group session and S-Tutor concluding it", () => {
        // Step 1: Navigate to the login page and log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("olivia@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
  
        // Step 2: Navigate to the request session page
        cy.visit("http://127.0.0.1:8000/request-session");
  
        // Step 3: Check for the warning message
        cy.get('body').then(($body) => {
            if ($body.find('#warning-message').length > 0) {
                cy.log("Feedback pending. Completing feedback first...");
                
                // Verify warning message
                cy.get('#warning-message').should("contain.text", "Please complete your pending feedback before requesting a new session.");
  
                // Step 4: Select rating as 4
                cy.get('.star.hover\\:text-yellow-400')
                    .eq(3) // Select the 4th star (index starts from 0)
                    .click();
  
                // Step 5: Enter feedback message
                cy.get('textarea#feedback_message').type("S-Tutor was really helpful when it came to explaining the concepts of OOP. It was a really good session overall, Loved it!!");
  
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
  
        // Step 8: Click the "Request a Group Session →" link
        cy.contains('a', "Request a Group Session →").should("be.visible").click();
  
        // Step 9: Select "Server-Side Programming 2" from the module dropdown
        cy.get('#moduleSelect').select("SDAM2");
  
        // Step 10: Select "John Doe" as the tutor
        cy.get('#tutorSelect').select("Mike Taylor");
  
        // Step 11: Select the radio button for the slot
        cy.get('input[type="radio"][name="slot_id"][value="20"]').check();
  
        // Step 12: Enter a message
        cy.get('textarea[name="message"]')
            .type("Hi Mike, I need help figuring out the purpose of OOP concepts.. I have some other clarifications to make as well. Mind helping me out?");
  
        // Step 13: Enter participant IDs
        cy.get('input#studentID1').type("6");
        cy.get('input#studentID2').type("7");
        cy.get('input#studentID3').type("8");
        cy.get('input#studentID4').type("9");
  
        // Step 14: Click the "Request" button
      cy.get('#request-group-session-btn')  // Select the button by ID
      .should('be.visible')  // Ensure it's visible
      .click(); 

        // Step 15: Navigate to the "My Sessions" page
        cy.contains('a', "My Sessions") // Find the link with text "My Sessions"
        .should("have.attr", "href", "http://127.0.0.1:8000/my-requests") // Verify the href attribute
        .click(); // Navigate to the page

    });
}); 