// fixtures/auth.fixture.ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { standard_user } from './user.fixture';

export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/');
    await use(loginPage);
  },
  inventoryPage: async ({ loginPage }, use) => {
    await loginPage.login(standard_user.username, standard_user.password);
    const inventoryPage = new InventoryPage(loginPage['page']);
    await inventoryPage.expectAuthorized();
    await use(inventoryPage);
  },
});

export { expect };


//HW5-1
