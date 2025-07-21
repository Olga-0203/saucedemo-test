import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected readonly baseURL = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(`${this.baseURL}${path}`);
  }
}


//HW5

