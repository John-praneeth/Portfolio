import { test, expect } from '@playwright/test';
import { attachConsoleErrorGuards, hasWebGL, navigateAndStabilize } from './_helpers';

test.describe('Visual regression', () => {
  test('full page screenshot matches baseline (chromium)', async ({ page }) => {
    const guard = attachConsoleErrorGuards(page);

    // Lock a known viewport for deterministic screenshots.
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateAndStabilize(page, '/');

    // Mask the 3D canvas region because it is inherently non-deterministic.
    const canvas = page.locator('.character-model canvas').first();
    const shouldMask = (await hasWebGL(page)) && (await canvas.count()) > 0;

    // Ensure we're comparing a consistent viewport capture.
    await page.evaluate(() => window.scrollTo(0, 0));

    await expect(page).toHaveScreenshot('fullpage-1440x900.png', {
      animations: 'disabled',
      mask: shouldMask ? [canvas] : [],
      maxDiffPixelRatio: 0.02,
    });

    await guard.assertNoErrors();
  });
});
