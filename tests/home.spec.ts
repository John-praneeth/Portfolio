import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorGuards,
  expectNoHorizontalOverflow,
  hasWebGL,
  navigateAndStabilize,
} from './_helpers';

test.describe('Home', () => {
  test('loads and renders hero + 3D canvas', async ({ page }) => {
    const guard = attachConsoleErrorGuards(page);

    await navigateAndStabilize(page, '/');

    // Hero section exists
    await expect(page.locator('#landingDiv')).toBeAttached();

    // Hero text (Landing)
    await expect(page.locator('#landingDiv h1')).toContainText(/john/i);

    // Character container exists (desktop and mobile).
    await expect(page.locator('.character-container')).toBeAttached();

    // 3D canvas (Scene) is most reliable to assert only when WebGL is available.
    const canvas = page.locator('.character-model canvas');
    const isDesktop = await page.evaluate(() => window.innerWidth > 1024);
    if (isDesktop && (await hasWebGL(page))) {
      await expect(canvas.first()).toBeAttached();
    }

    // Basic layout sanity
    await expectNoHorizontalOverflow(page);

    await guard.assertNoErrors();
  });

  test('loads within a reasonable time', async ({ page }) => {
    const start = Date.now();
    await navigateAndStabilize(page, '/');
    const elapsed = Date.now() - start;

    // Very basic guard; adjust if you want stricter.
    expect(elapsed, `Home load took too long: ${elapsed}ms`).toBeLessThan(25_000);
  });
});
