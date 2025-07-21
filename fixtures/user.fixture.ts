import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

export const test = base.extend<{
  inventoryPage: InventoryPage
}>({
  // Фикстура залогиненного стандартного пользователя
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); // /
    await loginPage.loginStandardUser();
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectAuthorized();
    await use(inventoryPage);
  }
});
//HW5