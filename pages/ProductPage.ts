import { Page, Locator } from '@playwright/test'; 
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private relatedProductsSection = '.related-products';
  relatedProducts: Locator;
  seeAllButton: Locator;
  relatedProductItems: Locator;
  relatedProductCategory: Locator;
  relatedProductPrice: Locator;
  errorMessage: Locator;
  noRelatedProductsMessage: Locator;

  constructor(page: Page) {
    super(page); // Initialize the parent class (BasePage)
    this.relatedProducts = page.locator('div.related-products');
    this.seeAllButton = page.locator('button.see-all');
    this.relatedProductItems = page.locator(`${this.relatedProductsSection} div.related-product-item`);
    this.relatedProductCategory = page.locator(`${this.relatedProductsSection} div.related-product-category`);
    this.relatedProductPrice = page.locator(`${this.relatedProductsSection} div.related-product-price`);
    this.errorMessage = page.locator('div.error-message');
    this.noRelatedProductsMessage = page.locator('div.no-related-products-message');
  }

  // Method to check if up to 6 related products are displayed
  async verifyRelatedProductsCount(expectedCount: number): Promise<boolean> {
    const count = await this.relatedProductItems.count();
    return count <= expectedCount;
  }

  // Method to verify if related products belong to the same category
  async verifyRelatedProductCategory(): Promise<boolean> {
    const category = await this.relatedProductCategory.first().innerText();
    const productCategory = await this.relatedProductCategory.last().innerText();
    return category === productCategory;
  }

  // Method to verify if related products are within a ±X% price range of the main product
  async verifyPriceRange(mainProductPrice: number, tolerancePercentage: number): Promise<boolean> {
    const prices = await this.relatedProductPrice.allTextContents();
    for (const price of prices) {
      const relatedProductPrice = parseFloat(price.replace('$', '').trim());
      const minPrice = mainProductPrice - (mainProductPrice * tolerancePercentage / 100);
      const maxPrice = mainProductPrice + (mainProductPrice * tolerancePercentage / 100);
      if (relatedProductPrice < minPrice || relatedProductPrice > maxPrice) {
        return false;
      }
    }
    return true;
  }

  // Method to click on "See All" button and navigate to all related products
  async clickSeeAll(): Promise<void> {
    await this.seeAllButton.click();
  }

  // Method to verify no related products are available
  async verifyNoRelatedProducts(): Promise<boolean> {
    return await this.noRelatedProductsMessage.isVisible();
  }

  // Method to verify if related product data failed to load
  async verifyErrorLoadingRelatedProducts(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  // Method to verify the behavior when a related product has no image or price data
  async verifyMissingImageOrPrice(): Promise<string> {
    const imageMissingMessage = 'Image unavailable';
    const priceMissingMessage = 'Price unavailable';

    // Check if the image or price is missing for any item
    const productItems = await this.relatedProductItems.all();
    for (const item of productItems) {
      const image = item.locator('img');
      const price = item.locator('.price');

      // Check if image is missing
      const imageSrc = await image.getAttribute('src');
      if (!imageSrc) {
        return imageMissingMessage;
      }

      // Check if price is missing
      const priceText = await price.innerText();
      if (!priceText) {
        return priceMissingMessage;
      }
    }

    return 'All data present';
  }
}
