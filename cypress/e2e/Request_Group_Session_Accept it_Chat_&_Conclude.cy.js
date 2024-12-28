describe("Request Group Session, Accept it, Chat & Conclude", () => {
    it("should successfully handle the group session request, accept it, chat, and conclude", () => {
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
  
        // Step 8: Click the "Request a Group Session →" link
        cy.contains('a', "Request a Group Session →").should("be.visible").click();
  
        // Step 9: Select "Server-Side Programming 2" from the module dropdown
        cy.get('#moduleSelect').select("MAD1");
  
        // Step 10: Select "Isaac Newton" as the tutor
        cy.get('#tutorSelect').select("Mike Taylor");
  
        // Step 11: Select the radio button for the slot
        cy.get('input[type="radio"][name="slot_id"][value="18"]').check();
  
        // Step 12: Enter a message
        cy.get('textarea[name="message"]')
            .type("Hi Mike, I'm having trouble configuring MongoDB, will you be able to help me out? Thanks!!");
  
        // Step 13: Enter participant IDs
        cy.get('input#studentID1').type("6");
        cy.get('input#studentID2').type("7");
        cy.get('input#studentID3').type("8");
        cy.get('input#studentID4').type("9");
  
        // Step 14: Click the "Request" button
        cy.get('#request-group-session-btn')
            .should('be.visible')
            .click(); 
  
        // Step 15: Log out
        cy.contains("Log out").should("be.visible").click();
  
        // Step 16: Log in as the tutor
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("mike@gmail.com"); 
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
  
        // Step 17: Navigate to the "Manage Session Requests" page
        cy.contains('a', "Manage Session Requests").should("be.visible").click();
  
        // Step 18: Accept the session request
        cy.contains('div', 'Sara Moore')
            .should('be.visible')
            .within(() => {
                cy.get('button.bg-green-500.text-white.py-1.px-3.rounded-md').click();
            });
  
        // Step 19: Fill out the accept request modal
        cy.get('input#location').type("Canteen");
        cy.get('textarea#sTutor_message').type("Hey Sara, I would love to help you out!! See you at the Canteen.");
  
        // Step 20: Confirm the session
        cy.get('button[type="submit"]').contains("Confirm").click();
  
        // Step 21: Verify success message or redirection
        cy.contains("Session confirmed successfully").should("be.visible");
  
        // Step 22: Open the chat
        cy.contains('a', "Chat Now").click();
  
        // Step 23: Send a message as the tutor
        cy.get('textarea[wire\\:model="newMessage"]').type("Hi there, since you've requested the 9.30 - 12.00 PM slot, will you be able to attend the session at around 10.00 AM? I already have a session scheduled from 9.30 to 9.50 AM so I won't be free that time. Let me know what you think!!");
        cy.get('button[type="submit"]').contains("Send").click();

        cy.contains('a', "Home").click();
  
        // Step 24: Log out
        cy.contains("Log out").should("be.visible").click();
  
        // Step 25: Log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("sara@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        cy.contains('a', "My Sessions").should('be.visible').click();
  
        // Step 26: Open the chat as the student
        cy.contains('a', "Chat Now").click();
  
        // Step 27: Send a response as the student
        cy.get('textarea[wire\\:model="newMessage"]').type("Hey Mike, yeah I'll be free during that time and I think my friends will also be free at that time so let's have the session at 10 AM. It won't take that long. Thank you very much!");
        cy.get('button[type="submit"]').contains("Send").click();

        cy.contains('a', "Home").click();
  
        // Step 28: Log out as the student
        cy.contains("Log out").should("be.visible").click();
  
        // Step 29: Log in again as the tutor
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("mike@gmail.com"); 
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        cy.contains('a', "Manage Session Requests").should('be.visible').click();
  
        // Step 30: Conclude the session
        cy.get('button[onclick^="openDoneModal"]').first().click();
        cy.contains('h2', 'End Session?').should("be.visible");
        cy.get('button.bg-blue-500.text-white.py-2.px-4.rounded-md').first().click();
  
        // Step 31: Verify the success message for concluding the session
        cy.contains("Group Session Successfully Concluded").should("be.visible");
    });
  });
  