describe("Group Session Request with Duplicate Participant IDs", () => {
  it("should display an error message when duplicate participant IDs are entered", () => {
    // Step 1: Navigate to the login page and log in
    cy.visit("http://127.0.0.1:8000/login");

    cy.get('input[name="email"]').type("fury@gmail.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();

    // Step 2: Navigate to the request session page
    cy.visit("http://127.0.0.1:8000/request-session");

    // Step 3: Click the "Request a Group Session →" link
    cy.contains('a', "Request a Group Session →").should("be.visible").click();

    // Step 4: Select "Server-Side Programming 2" from the module dropdown
    cy.get('#moduleSelect').select("SDAM1");

    // Step 5: Select "John Doe" as the tutor
    cy.get('#tutorSelect').select("Alexander Bell");

    // Step 6: Select the radio button for the slot
    cy.get('input[type="radio"][name="slot_id"][value="3"]').check();

    // Step 7: Enter a message
    cy.get('textarea[name="message"]')
      .type("Hey John, I'm unsure on controllers and routes? Can you help with those? Thanks!!");

    // Step 8: Enter "10" for the first participant ID
    cy.get('input#studentID1').type("10");

    // Step 9: Enter "10" again for the second participant ID
    cy.get('input#studentID2').type("10");

    // Step 10: Click the "Request" button using the ID selector
    cy.get('#request-group-session-btn')
        .should('be.visible')
        .click();

    // Step 11: Verify that the error message is displayed
    cy.contains("div", "Duplicate Participant IDs found.").should("be.visible");
  });
});
