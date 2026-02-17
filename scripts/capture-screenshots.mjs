import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BASE = 'http://localhost:4173';
const OUT_DIR = join(process.cwd(), 'screenshots');

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

// Web - desktop viewport
const webContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const webPage = await webContext.newPage();
await webPage.goto(BASE, { waitUntil: 'networkidle' });
await webPage.screenshot({ path: join(OUT_DIR, 'web-home.png'), fullPage: true });
await webContext.close();

// Mobile viewport (same app, responsive)
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
});
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(BASE, { waitUntil: 'networkidle' });
await mobilePage.screenshot({ path: join(OUT_DIR, 'mobile-home.png'), fullPage: true });
await mobileContext.close();

await browser.close();
console.log('Screenshots saved to screenshots/');
