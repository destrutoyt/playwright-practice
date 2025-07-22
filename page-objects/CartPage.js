const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']")
        this.checkoutButton = page.locator("text=Checkout");
    }

    async verifyProductInCart(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('"+productName+"')")
    }
}

module.exports = { CartPage };