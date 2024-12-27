describe("Group Session Request and Tutor Acceptance Flow", () => {
  it("should successfully handle feedback requirement and request a group session", () => {
      // Step 1: Navigate to the login page and log in as the student
      cy.visit("http://127.0.0.1:8000/login");
      cy.get('input[name="email"]').type("sara@gmail.com");
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

      // Step 8: Click the "Request a Group Session →" link
      cy.contains('a', "Request a Group Session →").should("be.visible").click();

      // Step 9: Select "Server-Side Programming 2" from the module dropdown
      cy.get('#moduleSelect').select("MAD1");

      // Step 10: Select "John Doe" as the tutor
      cy.get('#tutorSelect').select("Isaac Newton");

      // Step 11: Select the radio button for the slot
      cy.get('input[type="radio"][name="slot_id"][value="6"]').check();

      // Step 12: Enter a message
      cy.get('textarea[name="message"]')
          .type("Hi Isaac, I'm having trouble configuring MongoDB, will you be able to help me out? Thanks!!");

      // Step 13: Enter participant IDs
      cy.get('input#studentID1').type("6");
      cy.get('input#studentID2').type("7");
      cy.get('input#studentID3').type("8");
      cy.get('input#studentID4').type("9");

      // Step 14: Click the "Request" button
      cy.get('button[type="submit"].bg-blue-500.text-white.font-semibold.py-2.px-6.rounded-md')
          .should('be.visible')
          .click();

      // Step 15: Log out
      cy.contains("Log out").should("be.visible").click();

      // Step 16: Log in as the tutor
      cy.visit("http://127.0.0.1:8000/login");
      cy.get('input[name="email"]').type("isaacnewton@gmail.com");
      cy.get('input[name="password"]').type("password");
      cy.get('button[type="submit"]').click();

      // Step 17: Navigate to the "Manage Session Requests" page
      cy.contains('a', "Manage Session Requests").should("be.visible").click();

      // Step 18: Accept the session request
      cy.contains('div', 'Sara Moore') // Locate the session container by the student name
          .should('be.visible')
          .within(() => {
              cy.get('button.bg-green-500.text-white.py-1.px-3.rounded-md').click(); // Click the Accept button
          });

      // Step 19: Fill out the accept request modal
      cy.get('input#location').type("L3CR8");
      cy.get('textarea#sTutor_message').type("Hey Sara, I would love to help you out!! See you at L3CR8..");

      // Step 20: Confirm the session
      cy.get('button[type="submit"]').contains("Confirm").click();

      // Step 21: Verify success message or redirection (if applicable)
      cy.contains("Session confirmed successfully").should("be.visible");

      // Step 22: Conclude the session by clicking the "Done group" button
      cy.get('button[onclick^="openDoneModal"]').first().click();

      // Step 23: Handle the "End Session?" modal
      cy.contains('h2', 'End Session?') // Ensure the modal is shown
          .should('be.visible');

      // Step 24: Confirm the session end by clicking the "Done" button
      cy.get('button.bg-blue-500.text-white.py-2.px-4.rounded-md').first().click();

      // Step 25: Verify the success message for concluding the session
      cy.contains("Group Session Successfully Concluded").should("be.visible");
  });
});
