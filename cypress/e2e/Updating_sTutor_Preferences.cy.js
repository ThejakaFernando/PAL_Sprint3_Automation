describe("User Preferences and Faculty Page Actions", () => {
    it("should save preferences and navigate to 'Faculty' Page and clicking the recommended tutors button", () => {
      // Step 1: Navigate to the login page and log in
      cy.visit("http://127.0.0.1:8000/login");
  
      cy.get('input[name="email"]').type("CB012662@students.apiit.lk");
      cy.get('input[name="password"]').type("password");
      cy.get('button[type="submit"]').click();
  
      // Step 2: Navigate to preferences page
      cy.visit("http://127.0.0.1:8000/profile/preferences");
  
      // Step 3: Interact with the checkboxes
      cy.get('input[type="checkbox"][name="module_ids[]"][value="3"]').check();
      // cy.get('input[type="checkbox"][name="module_ids[]"][value="2"]').uncheck();
      cy.get('input[type="checkbox"][name="module_ids[]"][value="5"]').check();
      cy.get('input[type="checkbox"][name="module_ids[]"][value="6"]').check();
  
      // Step 4: Click the "Save Preferences" button
      cy.get('button[type="submit"]')
        .contains("Save Preferences")
        .should("be.visible")
        .click();
  
      // Step 5: Navigate to the faculty page
      cy.visit("http://127.0.0.1:8000/faculty");
  
      // Step 6: Click the "Show Recommended Tutors for Preference" link
      cy.contains("span", "Show Tutors Teaching Preferred Modules")
        .should("be.visible")
        .click();
    });
  });
  