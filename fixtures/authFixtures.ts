// fixtures/auth.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authUser: string;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  authUser: ['standard_user', { option: true }],
});

// Фикстура с автологином для standard_user
export const loggedInTest = test.extend({
  authUser: ['standard_user', { option: true }],

  page: async ({ page, authUser }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto('/');
    await loginPage.login(authUser);
    await inventoryPage.expectAuthorized();

    await use(page);
  },
});





//HW5-1
