
  describe("Individual Session Request and Tutor Acceptance Flow", () => {
    it("Login in, request an individual session and concluding it ", () => {
      // --- Step 1: Visit the Login Page ---
      cy.visit("http://127.0.0.1:8000/login");
  
      // --- Step 2: Login  ---
      cy.get('input[name="email"]').type("paul@gmail.com");
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
      cy.get('select#moduleSelect').select("WDOS1");
  
      // --- Step 5: Select Peer Tutor ---
      cy.get('select#tutorSelect').select("James Lee");

      // Select the radio button for the slot
      cy.get('input[type="radio"][name="slot_id"][value="14"]').check();
  
      // --- Step 6: Enter Message ---
      cy.get('textarea[name="message"]').type(
        "Hi James, I need help with confuring MongoDB to my Laravel 11 Project, would you mind helping me out with this? Thanks!"
      );
  
      // --- Step 7: Click the First 'Request' Button ---
      cy.get('#request-indv')  // Select the button by ID
      .should('be.visible')  // Ensure it's visible
      .click(); 
  
      // --- Step 8: Confirm the Request Modal ---
      cy.contains("Are you sure you want to request a session?").should("be.visible");
  
      // --- Step 9: Click the Second 'Request' Button in the Modal ---
    //   cy.get('button.bg-blue-600.text-white.py-1.px-3.rounded-md')
    //     .contains("Request")
    //     .click();
         cy.get('#request-confirm')  
         .should('be.visible')  
         .click();  
  
      // --- Step 10: Verify Success Message ---
      //cy.contains("Session request sent successfully!").should("be.visible");
  
      // --- Step 11: Logout ---
      cy.contains("Log out").click();
  
      // Verify redirection to the login page
      cy.url().should("include", "/login");
  
      // --- Step 12: Login as sinnert79@gmail.com ---
      cy.get('input[name="email"]').type("james@gmail.com");
      cy.get('input[name="password"]').type("password");
      cy.get('button[type="submit"]').click();
  
      // --- Step 13: Click "Manage Session Requests" ---
      cy.contains("Manage Session Requests").click();

        cy.contains('div', 'Paul Thomas') // Locate the session container by the student name
        .should('be.visible')
        .within(() => {
            cy.get('button.bg-green-500.text-white.py-1.px-3.rounded-md').click(); // Click the Accept button
        });

    cy.get('input#location').type("Library");
    cy.get('textarea#sTutor_message').type("Of course Paul, I'll be more than happy to help you out! See you soon...");

    cy.get('button[type="submit"]').contains("Confirm").click();
  

     // --- Step 14: Click 'Done Individual' Button ---
     cy.get('button[type="button"]')
     .contains("Done Individual")
     .should("be.visible")
     .click();

   // --- Step 15: Confirm the Done Individual Modal ---
   cy.contains("End Individual Session?").should("be.visible");
   cy.get('button[type="submit"]')
     .contains("Conclude")
     .should("be.visible")
     .click();

   // --- Step 16: Verify Session Concluded ---
   cy.contains("Individual Session Successfully Concluded").should("be.visible");
 });
});
  