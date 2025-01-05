import { Page } from '@playwright/test';

export class BasePage {
 readonly page: Page;
 constructor(page: Page) {
   this.page = page;
 }
 
 async navigateTo(url: string) {
   await this.page.goto(url);
 }
 async getElementText(selector: string): Promise<string> {
   return this.page.locator(selector).textContent() || '';
 }
}
