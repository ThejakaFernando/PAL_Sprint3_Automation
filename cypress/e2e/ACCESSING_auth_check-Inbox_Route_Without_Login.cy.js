describe("Redirect to Login When Accessing Inbox Without Logging In", () => {
    it("should redirect the user to the login page when trying to access the inbox without logging in", () => {
        // Step 1: Visit the homepage
        cy.visit("http://127.0.0.1:8000/");

        // Step 2: Attempt to access the inbox page
        cy.visit("http://127.0.0.1:8000/inbox");

        // Step 3: Verify redirection to the login page
        cy.url().should("eq", "http://127.0.0.1:8000/login"); // Check the URL to ensure it matches the login page
    });
});
