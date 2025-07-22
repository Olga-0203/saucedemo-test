// tests/cart.spec.ts
import { loggedInTest as test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Проверки корзины', () => {

  test('Корзина изначально пустая', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectAuthorized();

    await inventoryPage.gotoCart();
    await cartPage.expectCartEmpty();
  });

  test('Добавление одного товара', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectAuthorized();

    await inventoryPage.addItemToCart(0);
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('Добавление двух товаров', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectAuthorized();

    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('Удаление товара из корзины', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectAuthorized();

    await inventoryPage.addItemToCart(0);
    await inventoryPage.gotoCart();

    await cartPage.removeAllItems();
    await cartPage.expectCartEmpty();
  });

  test('Очистка корзины с несколькими товарами', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectAuthorized();

    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.addItemToCart(2);

    await inventoryPage.gotoCart();
    await cartPage.removeAllItems();
    await cartPage.expectCartEmpty();
  });
});


//HW5-1