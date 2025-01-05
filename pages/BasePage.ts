import { Page, Locator } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to click on an element
  async click(locator: Locator) {
    await locator.click();
  }

  // Method to type into an input field
  async type(locator: Locator, text: string) {
    await locator.fill(text);
  }

  // Method to check if an element is visible
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  // Method to wait for an element to be visible
  async waitForVisibility(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  // Method to get text of a locator
  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  // Method to get attribute of an element
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }
}

