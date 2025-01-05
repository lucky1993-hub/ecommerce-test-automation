import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { TestData } from '../testdata/TestData';

export class ProductPage extends BasePage {
  locators: ProductPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductPageLocators(page);
  }

  // Verify no more than 6 related products
  async verifyRelatedProductsCount(expectedCount: number): Promise<boolean> {
    const count = await this.locators.relatedProductItems.count();
    return count <= expectedCount;
  }

  // Verify related products belong to the same category
  async verifyRelatedProductCategory(): Promise<boolean> {
    const category = await this.locators.relatedProductCategory.first().innerText();
    const productCategory = await this.locators.relatedProductCategory.last().innerText();
    return category === productCategory;
  }

  // Verify price range for related products
  async verifyPriceRange(): Promise<boolean> {
    const prices = await this.locators.relatedProductPrice.allTextContents();
    for (const price of prices) {
      const relatedProductPrice = parseFloat(price.replace('$', '').trim());
      const minPrice = TestData.mainProductPrice - (TestData.mainProductPrice * TestData.tolerancePercentage / 100);
      const maxPrice = TestData.mainProductPrice + (TestData.mainProductPrice * TestData.tolerancePercentage / 100);
      if (relatedProductPrice < minPrice || relatedProductPrice > maxPrice) {
        return false;
      }
    }
    return true;
  }

  // Click on "See All" button
  async clickSeeAll(): Promise<void> {
    await this.click(this.locators.seeAllButton);
  }

  // Verify if no related products are available
  async verifyNoRelatedProducts(): Promise<boolean> {
    return await this.isVisible(this.locators.noRelatedProductsMessage);
  }

  // Verify error message when related products data fails to load
  async verifyErrorLoadingRelatedProducts(): Promise<boolean> {
    return await this.isVisible(this.locators.errorMessage);
  }

  // Verify behavior when image or price is missing for related products
  async verifyMissingImageOrPrice(): Promise<string> {
    const productItems = await this.locators.relatedProductItems.all();
    for (const item of productItems) {
      const image = item.locator('img');
      const price = item.locator('.price');

      // Check if image is missing
      const imageSrc = await image.getAttribute('src');
      if (!imageSrc) {
        return 'Image unavailable';
      }

      // Check if price is missing
      const priceText = await price.innerText();
      if (!priceText) {
        return 'Price unavailable';
      }
    }

    return 'All data present';
  }
}
