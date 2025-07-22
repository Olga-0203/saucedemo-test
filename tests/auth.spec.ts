import { test, expect } from '../fixtures/auth.fixture';

test.describe('Авторизация standard_user', () => {
  test('Успешный вход', async ({ inventoryPage }) => {
    await inventoryPage.expectAuthorized();
  });
});


//HW5-1