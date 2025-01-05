import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { TestData } from '../testdata/TestData';

test.describe('Product Page Tests', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to the main product page before each test
    await page.goto('https://www.ebay.com/itm/195060516753?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=J8i3IFXASEa&sssrc=2047675&ssuid=&widget_ver=artemis&media=COPY');
    productPage = new ProductPage(page);
  });

  // TC_F_01: Verifies that no more than 6 related products are displayed.
  test('TC_F_01 - Verify no more than 6 related products are displayed', async () => {
    const result = await productPage.verifyRelatedProductsCount(6);
    expect(result).toBe(true); // Verify there are no more than 6 related products
  });

  // TC_F_02: Ensures related products belong to the same category.
  test('TC_F_02 - Verify related products belong to the same category', async () => {
    const result = await productPage.verifyRelatedProductCategory();
    expect(result).toBe(true); // All related products should belong to the same category
  });

  // TC_F_03: Verifies price range for related products.
  test('TC_F_03 - Verify price range for related products', async () => {
    const result = await productPage.verifyPriceRange();
    expect(result).toBe(true); // Ensure all related products are within the ±X% price range
  });

  // TC_F_04: Tests the "See All" button functionality.
  test('TC_F_04 - Verify "See All" button functionality', async () => {
    await productPage.clickSeeAll();
    // Additional logic to verify that the "See All" page has loaded could be added here.
    expect(await productPage.page.url()).toContain('related-products');
  });

  // TC_F_05: Checks behavior when no related products are available.
  test('TC_F_05 - Verify behavior when no related products are available', async () => {
    const result = await productPage.verifyNoRelatedProducts();
    expect(result).toBe(true); // Ensure no related products are shown if there's none
  });

  // TC_N_06: Verifies error message when data fails to load.
  test('TC_N_06 - Verify error message when data fails to load', async () => {
    const result = await productPage.verifyErrorLoadingRelatedProducts();
    expect(result).toBe(true); // Ensure error message is shown when related products data fails to load
  });

  // TC_N_07: Handles broken "See All" URL.
  test('TC_N_07 - Handle broken "See All" URL', async () => {
    // Simulate broken URL by using an incorrect URL
    await productPage.page.goto('https://www.ebay.com/related-products-invalid-url');
    expect(await productPage.page.title()).toBe('Page Not Found');
  });

  // TC_N_08: Verifies behavior when an image or price is missing for related products.
  test('TC_N_08 - Verify behavior when image or price is missing for related products', async () => {
    const result = await productPage.verifyMissingImageOrPrice();
    expect(result).not.toBe('All data present'); // Ensure missing image or price triggers the correct behavior
  });
});
