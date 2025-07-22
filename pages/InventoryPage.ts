import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  async expectAuthorized() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page).toHaveTitle('Swag Labs');
  }

  async addItemToCart(index: number) {
    const buttons = this.page.locator('.inventory_item button');
    await buttons.first().waitFor({ state: 'visible', timeout: 5000 });
    await buttons.nth(index).click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if ((await badge.count()) === 0) return 0;
    const text = await badge.textContent();
    return text ? parseInt(text) : 0;
  }

  async gotoCart() {
    await this.page.click('.shopping_cart_link');
  }
}


//HW5-1