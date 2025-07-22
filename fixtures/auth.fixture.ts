import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { standardUser } from './user.fixture';

export const test = base.extend<{
  inventoryPage: InventoryPage;
}>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/');
    await loginPage.login(standardUser.username, standardUser.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectAuthorized();

    await use(inventoryPage);
  },
});

export { expect };



//HW5-1
