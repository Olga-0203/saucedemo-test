import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  // Можно добавить еще элементы по необходимости
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cartButton = this.page.locator('.shopping_cart_link');
    this.cartBadge = this.page.locator('.shopping_cart_badge');
  }

  async expectAuthorized() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page).toHaveTitle('Swag Labs');
  }

  // Добавить товар в корзину по индексу
  async addItemToCart(index: number) {
    const item = this.page.locator('.inventory_item').nth(index);
    const addButton = item.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  // Перейти в корзину
  async gotoCart() {
    await this.cartButton.click();
  }

  // Узнать число товаров в корзине
  async getCartCount(): Promise<number> {
  if (await this.cartBadge.isVisible()) {
    const text = await this.cartBadge.textContent();
    return text ? Number(text) : 0;
  }
  return 0;
}
}

//HW5