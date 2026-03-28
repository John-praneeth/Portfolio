import { expect, type Page } from '@playwright/test';

export function attachConsoleErrorGuards(page: Page) {
  const errors: string[] = [];

  page.on('pageerror', (err) => {
    errors.push(`pageerror: ${err.name}: ${err.message}`);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      // Some libraries log benign errors; keep this strict but filter common noise.
      const text = msg.text();
      const allowList: string[] = [
        // Add known benign errors here if you ever need them.
      ];
      if (!allowList.some((a) => text.includes(a))) {
        errors.push(`console.error: ${text}`);
      }
    }
  });

  return {
    assertNoErrors: async () => {
      expect(errors, errors.join('\n')).toEqual([]);
    },
  };
}

export async function waitForAppReady(page: Page) {
  // Avoid `networkidle` for SPAs (analytics/webgl/long-poll can keep it busy).
  await page.waitForLoadState('domcontentloaded');

  // The app intentionally fades elements in (GSAP + `.main-active`).
  // Playwright's `toBeVisible()` does NOT fail on `opacity: 0`, so we wait for
  // computed opacity + layout to indicate the intro has actually settled.
  await page.waitForFunction(
    () => {
      const header = document.querySelector('.header');
      const main = document.querySelector('main');
      const landing = document.querySelector('#landingDiv');
      const h1 = landing?.querySelector('h1');
      if (!header || !main || !landing || !h1) return false;

      const opacity = (el: Element) => {
        const value = window.getComputedStyle(el).opacity;
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : 1;
      };

      if (opacity(main) < 0.95) return false;
      if (opacity(header) < 0.95) return false;
      if (opacity(h1) < 0.95) return false;

      const headerBox = header.getBoundingClientRect();
      const heroBox = (landing as HTMLElement).getBoundingClientRect();
      const h1Box = (h1 as HTMLElement).getBoundingClientRect();

      if (headerBox.width < 20 || headerBox.height < 20) return false;
      if (heroBox.width < 50 || heroBox.height < 50) return false;
      if (h1Box.width < 50 || h1Box.height < 20) return false;

      return true;
    },
    { timeout: 20_000 }
  );

  // Stabilize font rendering for screenshots/measurements when supported.
  await page.evaluate(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fonts = (document as any).fonts;
      if (fonts?.ready) await fonts.ready;
    } catch {
      // ignore
    }
  });
}

export async function waitForLanding(page: Page) {
  // React hydration + GSAP/Lenis setup can delay rendering.
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#landingDiv')).toBeAttached();
}

export async function expectNoHorizontalOverflow(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => {
    const el = document.documentElement;
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
  });
  expect(scrollWidth, `Horizontal overflow detected: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`).toBeLessThanOrEqual(
    clientWidth + 1
  );
}

export async function expectElementInViewport(page: Page, selector: string) {
  const box = await page.locator(selector).boundingBox();
  expect(box, `Element not found: ${selector}`).not.toBeNull();
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  if (!box || !viewport) return;

  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.y).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
}

export async function navigateAndStabilize(page: Page, path = '/') {
  // Make GSAP/Lenis behavior deterministic and avoid opacity=0 timing flakes.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await waitForAppReady(page);
}

export async function hasWebGL(page: Page) {
  return await page.evaluate(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  });
}
