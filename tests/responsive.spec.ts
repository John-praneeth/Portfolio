import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorGuards,
  expectNoHorizontalOverflow,
  hasWebGL,
  navigateAndStabilize,
} from './_helpers';

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1024x768', width: 1024, height: 768 },
];

test.describe('Responsiveness', () => {
  for (const vp of viewports) {
    test(`no overflow and hero does not overlap (${vp.name})`, async ({ page }) => {
      const guard = attachConsoleErrorGuards(page);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await navigateAndStabilize(page, '/');

      // No horizontal overflow
      await expectNoHorizontalOverflow(page);

      // Hero sanity: heading + canvas visible
      await expect(page.locator('#landingDiv')).toBeAttached();
      const isDesktop = await page.evaluate(() => window.innerWidth > 1024);
      const canvas = page.locator('.character-model canvas').first();
      const webglAvailable = await hasWebGL(page);

      if (isDesktop && webglAvailable) {
        await expect(canvas).toBeAttached();

        // Overlap heuristic: ensure canvas and heading are not fully colliding.
        const [headingBox, canvasBox] = await Promise.all([
          page.locator('#landingDiv h1').boundingBox(),
          canvas.boundingBox(),
        ]);

        expect(headingBox).not.toBeNull();
        expect(canvasBox).not.toBeNull();
        if (headingBox && canvasBox) {
          const headingRight = headingBox.x + headingBox.width;
          const canvasLeft = canvasBox.x;

          expect(
            canvasLeft,
            `Canvas is overlapping hero text too much at ${vp.name}`
          ).toBeGreaterThan(headingRight - 40);
        }
      }

      await guard.assertNoErrors();
    });
  }
});
