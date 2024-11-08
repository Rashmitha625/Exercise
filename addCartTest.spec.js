const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./POM/loginPage');
const { ProductsPage } = require('./POM/productsPage');
const { CartPage } = require('./pom/cartPage');

test.describe('Add to Cart Test Suite', () => {
    let loginPage, productsPage, cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        
        await loginPage.navigate();
    });

    test('Test Add to Cart Functionality', async ({ page }) => {
        // Login
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Verify login
        await productsPage.verifyLogin();

        // Get product details and store in text file
        const { title, price } = await productsPage.getProductDetails();

        // Add product to cart
        await productsPage.addToCart();

        // Navigate to cart and verify
        await productsPage.goToCart();
        await cartPage.verifyProductInCart(title);

        // Logout
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});