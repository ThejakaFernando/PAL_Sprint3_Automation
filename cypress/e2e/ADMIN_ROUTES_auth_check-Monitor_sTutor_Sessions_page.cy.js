describe("Accessing Monitor S-tutr session Page (Admin Route) Without Login", () => {
    it("should display a 401 Unauthorized error when trying to access the Monitor S-Tutor Sessions page without logging in", () => {
        // Step 1: Visit the homepage
        cy.visit("http://127.0.0.1:8000/");

        // Step 2: Try to visit the 'Monitor Tutor Sessions' admin page directly
        cy.visit("http://127.0.0.1:8000/admin/monitor-tutor-sessions", { failOnStatusCode: false });

        // Step 3: Verify the 401 Unauthorized error message is displayed
        cy.contains('div.px-4.text-lg.text-gray-500.border-r.border-gray-400.tracking-wider', '401')
            .should("be.visible"); // Ensure 401 status code is displayed

        cy.contains('div.ml-4.text-lg.text-gray-500.uppercase.tracking-wider', 'Unauthorized')
            .should("be.visible"); // Ensure "Unauthorized" message is displayed
    });
});
