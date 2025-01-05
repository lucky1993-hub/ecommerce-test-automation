import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests',
 timeout: 30000,
 retries: 1,
 reporter: [['list'], ['html']],
 use: {
   browserName: 'chromium',
   headless: true,
   viewport: { width: 1920, height: 1080 },
   screenshot: 'only-on-failure',
   video: 'retain-on-failure',
   baseURL: 'https://www.ebay.com/itm/195060516753?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=J8i3IFXASEa&sssrc=2047675&ssuid=&widget_ver=artemis&media=COPY',
 },
});