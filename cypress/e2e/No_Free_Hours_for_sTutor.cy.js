describe("Requesting a Session from an S-Tutor Without Available Hours", () => {
    it("should display a message indicating no free hours are available for the selected tutor", () => {
        // Step 1: Navigate to the login page and log in as the student
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("fury@gmail.com");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // Step 2: Navigate to the 'Request Session' page
        cy.visit("http://127.0.0.1:8000/request-session");

        // Step 3: Select the module "SSP1"
        cy.get('#moduleSelect').select("SSP1");

        // Step 4: Select the tutor "Lisa Anderson"
        cy.get('#tutorSelect').select("Lisa Anderson");

        // Step 5: Verify the message "No Free Hours Found."
        cy.contains('p.text-red-500', "No Free Hours Found.").should("be.visible");
    });
});
