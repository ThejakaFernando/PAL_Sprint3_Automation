describe("Accessing an S-tutor's Pending Sessions (Admin Route) Without Login", () => {
    it("should display a 401 Unauthorized error when trying to access S-tutor Pending Sessions without logging in", () => {
        // Step 1: Visit the homepage
        cy.visit("http://127.0.0.1:8000/");

        cy.visit("http://127.0.0.1:8000/monitor-tutor-sessions/pending/3", { failOnStatusCode: false });

        // Step 3: Verify the 401 Unauthorized error message is displayed
        cy.contains('div.px-4.text-lg.text-gray-500.border-r.border-gray-400.tracking-wider', '401')
            .should("be.visible"); // Ensure 401 status code is displayed

        cy.contains('div.ml-4.text-lg.text-gray-500.uppercase.tracking-wider', 'Unauthorized')
            .should("be.visible"); // Ensure "Unauthorized" message is displayed
    });
});