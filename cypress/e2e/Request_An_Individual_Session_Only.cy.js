describe("Individual Session Request and Tutor Acceptance Flow", () => {
    it("Login in, request an individual session and concluding it ", () => {
      // --- Step 1: Visit the Login Page ---
      cy.visit("http://127.0.0.1:8000/login");
  
      // --- Step 2: Login  ---
      cy.get('input[name="email"]').type("lucas@gmail.com");
      cy.get('input[name="password"]').type("password");
      cy.get('button[type="submit"]').click();
  
      // Verify login
      cy.contains("Need peer support? Book a session.").should("be.visible");
  
      // --- Step 3: Navigate to Request Session Page ---
      cy.contains("Request Session").click();

      //if feedback exists, it should first fill out the form before request a indv session
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
            cy.get('textarea#feedback_message').type("Session was really helpful. I understood everything that was taught..");

            // Step 6: Submit feedback
            cy.get('button[type="submit"].bg-indigo-600.text-white.rounded-lg.shadow').click();

            // Step 7: Verify feedback submission
            cy.contains("Your Feedback has been submitted successfully!").should("be.visible");

            // Navigate back to the request session page
            cy.visit("http://127.0.0.1:8000/request-session");
        } else {
            cy.log("No feedback required. Proceeding to request a session...");
        }
    });
  
      // Verify the Request Session page
      cy.contains("Request a Individual Session").should("be.visible");
  
      // --- Step 4: Select Module ---
      cy.get('select#moduleSelect').select("WDOS2");
  
      // --- Step 5: Select Peer Tutor ---
      cy.get('select#tutorSelect').select("James Lee");

      // Select the radio button for the slot
      cy.get('input[type="radio"][name="slot_id"][value="14"]').check();
  
      // --- Step 6: Enter Message ---
      cy.get('textarea[name="message"]').type(
        "Hi James, I need help understanding Linux, specially the commands. Mind helping me out?"
      );
  
      // --- Step 7: Click the First 'Request' Button ---
      cy.get('#request-indv')  // Select the button by ID
      .should('be.visible')  // Ensure it's visible
      .click(); 
  
      // --- Step 8: Confirm the Request Modal ---
      cy.contains("Are you sure you want to request a session?").should("be.visible");
  
      // --- Step 9: Click the Second 'Request' Button in the Modal ---

         cy.get('#request-confirm')  
         .should('be.visible')  
         .click();  

      // Step 10: Navigate to the "My Sessions" page
      cy.contains('a', "My Sessions") // Find the link with text "My Sessions"
      .should("have.attr", "href", "http://127.0.0.1:8000/my-requests") // Verify the href attribute
      .click(); // Navigate to the page

    });
}); 