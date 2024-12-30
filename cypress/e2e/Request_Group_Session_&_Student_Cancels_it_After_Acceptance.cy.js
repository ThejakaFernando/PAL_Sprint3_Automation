describe("Request Group Session & Student Cancels It", () => {
    it("should successfully handle group session cancellation by Student after acceptance", () => {
        // Step 1: Navigate to the login page and log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("ben@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the request session page
        cy.visit("http://127.0.0.1:8000/request-session");

        // Step 3: Click the "Request a Group Session →" link
        cy.contains('a', "Request a Group Session →").should("be.visible").click();

        // Step 4: Select module, tutor, and time slot
        cy.get('#moduleSelect').select("SDAM1");
        cy.get('#tutorSelect').select("Alexander Bell");
        cy.get('input[type="radio"][name="slot_id"][value="2"]').check();

        // Step 5: Enter message and participant IDs
        cy.get('textarea[name="message"]').type("Hi Alexander, I need help in setting up Laravel 11 to my PC. Mind helping me? Appreciate it :)");
        cy.get('input#studentID1').type("6");
        cy.get('input#studentID2').type("7");
        cy.get('input#studentID3').type("8");
        cy.get('input#studentID4').type("9");

        // Step 6: Submit the group session request
        cy.get('#request-group-session-btn').should('be.visible').click();

        // Step 7: Log out as the student
        cy.contains("Log out").should("be.visible").click();

        // Step 8: Log in as the tutor
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("bell@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 9: Navigate to the "Manage Session Requests" page and accept the request
        cy.contains('a', "Manage Session Requests").should("be.visible").click();
        cy.contains('div', 'Ben Garcia') // Locate the session container by the student name
            .should('be.visible')
            .within(() => {
                cy.get('button.bg-green-500.text-white.py-1.px-3.rounded-md').click();
            });

        // Step 10: Fill out the accept request modal
        cy.get('input#location').type("L4CR2");
        cy.get('textarea#sTutor_message').type("Hey Ben, I would love to help you out!! See you at L4CR2..");
        cy.get('button[type="submit"]').contains("Confirm").click();

        // Step 11: Verify the student's request message in the session card
        cy.contains('p.text-gray-600', "Hi Alexander, I need help in setting up Laravel 11 to my PC. Mind helping me? Appreciate it :)").should("be.visible");

        // Step 12: Log out as the tutor
        cy.contains("Log out").should("be.visible").click();

        // Step 13: Log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("ben@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 14: Navigate to "View Session Status" page
        cy.visit("http://127.0.0.1:8000/my-requests");

        // Step 15: Locate the session card with "Accepted" status and click the "Cancel" button
        cy.contains('span', "Accepted")
            .parents('.bg-gray-100.p-6.rounded-lg.mb-6.shadow-md')
            .within(() => {
                cy.get('#cancel-before-btn').should('be.visible').click();
            });

        // Step 16: Handle the cancellation modal
        cy.contains('h3', "Reason for Cancellation").should("be.visible");
        cy.get('input[type="radio"][name="cancel_reason"][value="Change of Plans"]').check({ force: true });
        cy.get('button[type="submit"]').contains("Submit Cancellation").click({ force: true });
    });
});
