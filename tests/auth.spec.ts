import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Авторизация пользователей', () => {
  let login: LoginPage;
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    await login.goto('/');
  });

  test('Успешная авторизация standard_user', async () => {
    await login.login('standard_user');
    await inventory.expectAuthorized();
  });
});


//HW5-1