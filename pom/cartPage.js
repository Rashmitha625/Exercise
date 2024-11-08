const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProductTitle = page.locator('.inventory_item_name');
    }

    async verifyProductInCart(expectedTitle) {
        const cartTitle = await this.cartProductTitle.innerText();
        expect(cartTitle).toBe(expectedTitle);
    }
}

module.exports = { CartPage };