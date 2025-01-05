# Playwright Automation Framework for Related Products

## Overview
This project automates the testing of the "Related Products" feature for an e-commerce platform.

## Prerequisites
- Node.js (v16 or higher)
- Playwright installed globally.

## Setup
1. Clone the repository:
  git clone <repository-url>
  
2. Install dependencies:

  npm install
  
3. Run tests:
  npx playwright test
  
## Framework Details

- **Playwright** for end-to-end testing.
- **Page Object Model (POM)** for better maintainability.
- Includes functional and edge test cases.

## Reporting
To view test reports:
npx playwright test --reporter=html

## Folder Structure

/ecommerce-test-automation
│
├── /pages
│     ├── BasePage.ts                # Common page methods for reuse
│     └── ProductPage.ts             # Page-specific methods for the product page
│   
├── /locators
│     └── ProductPageLocators.ts    # Locators for product page
│   
├── /testdata
│     └── TestData.ts               # Test data such as prices, percentages
│  
│── /tests
│       └── ProductPageTests.ts       # Test scripts that use the page methods
│
├── /node_modules                      # Dependencies installed by npm
│
├── package.json                       # Project dependencies and scripts
├── playwright.config.ts               # Playwright configuration file
└── tsconfig.json                      # TypeScript configuration file
