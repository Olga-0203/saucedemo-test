import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  async expectAuthorized() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page).toHaveTitle('Swag Labs');
  }
}
//HW4