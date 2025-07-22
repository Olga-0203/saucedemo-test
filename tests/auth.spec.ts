// tests/auth.spec.ts
import { test, expect } from '../fixtures/auth.fixture';

test.describe('Авторизация standard_user', () => {
  test('Успешная авторизация', async ({ inventoryPage }) => {
    await inventoryPage.expectAuthorized();
  });

  test('Ошибка при неверном пароле', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.shouldShowError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/.*inventory\.html/);
  });
});






//HW5-1