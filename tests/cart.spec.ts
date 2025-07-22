// tests/cart.spec.ts
import { test, expect } from '../fixtures/auth.fixture';


test.describe('Проверки корзины', () => {
  test('Добавление одного товара', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(0);
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('Добавление двух товаров', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('Нет товаров после входа', async ({ inventoryPage }) => {
    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test('Корзина отображается после добавления и перехода', async ({ inventoryPage, page }) => {
    await inventoryPage.addItemToCart(2);
    await inventoryPage.gotoCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('Товары в корзине соответствуют добавленным', async ({ inventoryPage, page }) => {
    // Сохраняем имена по индексу до добавления в корзину
    const inventoryTitles = await page.locator('.inventory_item_name').allTextContents();
    const firstAdded = inventoryTitles[1];
    const secondAdded = inventoryTitles[3];

    await inventoryPage.addItemToCart(1);
    await inventoryPage.addItemToCart(3);
    await inventoryPage.gotoCart();

    const cartTitles = await page.locator('.cart_item .inventory_item_name').allTextContents();
    expect(cartTitles).toContain(firstAdded);
    expect(cartTitles).toContain(secondAdded);
    expect(cartTitles.length).toBe(2);
  });
})


//HW5-1