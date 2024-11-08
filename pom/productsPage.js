const { expect } = require('@playwright/test');
const fs = require('fs');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator('.inventory_item_name').first();
        this.productPrice = page.locator('.inventory_item_price').first();
        this.addToCartButton = page.locator('.btn_inventory').first();
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async verifyLogin() {
        await expect(this.page).toHaveURL(/inventory/);
    }

    async getProductDetails() {
        const title = await this.productTitle.innerText();
        const price = await this.productPrice.innerText();
        fs.writeFileSync('./testData/productDetails.txt', `Product: ${title}\nPrice: ${price}`);
        return { title, price };
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

module.exports = { ProductsPage };