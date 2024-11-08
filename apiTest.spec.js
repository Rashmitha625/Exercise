const { test, expect } = require('@playwright/test');

test.describe('API Testing - GET Request', () => {
    test('Verify GET request status code is 200', async ({ request }) => {
        // Make the GET request to the demo API
        const response = await request.get('https://reqres.in/api/users/2');
        
        // Validate the response status code
        expect(response.status()).toBe(200);
    });
});