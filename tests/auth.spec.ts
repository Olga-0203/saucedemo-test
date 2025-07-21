import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { usersData } from './usersData';

test.describe('Авторизация пользователей', () => {
  let login: LoginPage;
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    await login.goto('/');
  });

  for (const { username, locked, errorText } of usersData) {
    test(locked ? `Ошибка авторизации: ${username}` : `Успех авторизации: ${username}`, async () => {
      await login.login(username);

      if (locked) {
        await login.shouldShowError(errorText!);
        await expect(login.page).not.toHaveURL(/.*inventory\.html/);
      } else {
        await inventory.expectAuthorized();
      }
    });
  }
});
//HW4
