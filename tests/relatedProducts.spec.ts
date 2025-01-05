import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Related Products Tests', () => {
  
  let productPage: ProductPage;

  // Set up before each test
  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await page.goto('https://www.ebay.com/itm/195060516753');  // Example product URL
  });

  // TC_F_01: Verify that up to 6 related products are displayed on the main product page
  test('TC_F_01: Verify that up to 6 related products are displayed', async () => {
    const result = await productPage.verifyRelatedProductsCount(6);
    expect(result).toBe(true);
  });

  // TC_F_02: Verify that related products belong to the same category as the main product
  test('TC_F_02: Verify related products belong to the same category', async () => {
    const result = await productPage.verifyRelatedProductCategory();
    expect(result).toBe(true);
  });

  // TC_F_03: Verify that related products fall within the same price range as the main product
  test('TC_F_03: Verify related products fall within the same price range', async () => {
    const mainProductPrice = 20.99;  // Replace with actual price from the page
    const tolerancePercentage = 20;  // ±20% tolerance
    const result = await productPage.verifyPriceRange(mainProductPrice, tolerancePercentage);
    expect(result).toBe(true);
  });

  // TC_F_04: Verify that the "See All" button redirects to a page listing more related products
  test('TC_F_04: Verify See All button works', async ({ page }) => {
    await productPage.clickSeeAll();
    await expect(page).toHaveURL(/related-products/);  // Assuming this redirects to related products
  });

  // TC_F_05: Verify the behavior when no related products are available
  test('TC_F_05: Verify no related products available', async () => {
    const result = await productPage.verifyNoRelatedProducts();
    expect(result).toBe(true);
  });

  // TC_N_07: Verify the behavior when related product data fails to load
  test('TC_N_07: Verify error message for loading failure', async () => {
    const result = await productPage.verifyErrorLoadingRelatedProducts();
    expect(result).toBe(true);
  });

  // TC_N_08: Verify behavior when the "See All" button URL is broken or invalid
  test('TC_N_08: Verify See All button with broken URL', async ({ page }) => {
    // Mocking an invalid URL response
    await page.route('**/related-products-api-endpoint', route => route.abort());
    await productPage.clickSeeAll();
    const errorMessage = await productPage.errorMessage.innerText();
    expect(errorMessage).toBe('Page not found');
  });

  // TC_N_09: Verify behavior when a related product has no image or price data
  test('TC_N_09: Verify placeholder for missing image/price', async () => {
    const result = await productPage.verifyMissingImageOrPrice();
    expect(result).toBe('Image unavailable'); // Or 'Price unavailable' depending on missing data
  });
});
