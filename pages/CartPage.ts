import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  async expectCartEmpty() {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }

  async expectCartHasItems(count: number) {
    await expect(this.page.locator('.cart_item')).toHaveCount(count);
  }

  async removeAllItems() {
    const removeButtons = this.page.locator('button:has-text("Remove")');
    const count = await removeButtons.count();
    for (let i = 0; i < count; i++) {
      await removeButtons.nth(0).click();
    }
  }
}

