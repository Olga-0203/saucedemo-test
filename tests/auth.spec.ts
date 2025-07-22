// tests/auth.spec.ts
import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { usersData } from '../fixtures/usersData';

test.describe('Авторизация пользователей', () => {
  for (const { username, locked, errorText } of usersData) {
    test(`${locked ? 'Ошибка' : 'Успех'} авторизации: ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto('/');
      await loginPage.login(username);

      if (locked) {
        await loginPage.shouldShowError(errorText!);
        await expect(page).not.toHaveURL(/.*inventory\.html/);
      } else {
        await inventoryPage.expectAuthorized();
      }
    });
  }
});

//HW5-1