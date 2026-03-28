import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorGuards,
  expectNoHorizontalOverflow,
  navigateAndStabilize,
} from './_helpers';

async function expectSectionNearTop(page: import('@playwright/test').Page, selector: string) {
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top >= -10 && r.top <= 220;
    },
    selector,
    { timeout: 10_000 }
  );
}

test.describe('Navigation', () => {
  test('desktop navbar links exist', async ({ page }) => {
    const guard = attachConsoleErrorGuards(page);
    await navigateAndStabilize(page, '/');

    // Navbar is rendered as `.header`.
    const navbar = page.locator('.header');
    await expect(navbar).toBeAttached();

    await expect(navbar.locator('a[data-href="#about"]')).toBeAttached();
    await expect(navbar.locator('a[data-href="#work"]')).toBeAttached();
    await expect(navbar.locator('a[data-href="#contact"]')).toBeAttached();
    await expect(navbar.locator('a[href="#resume"]')).toBeAttached();

    await expectNoHorizontalOverflow(page);

    await guard.assertNoErrors();
  });

  test('mobile menu navigates to sections', async ({ page }) => {
    const guard = attachConsoleErrorGuards(page);

    // Force the mobile nav flow (desktop uses Lenis smooth scrolling).
    await page.setViewportSize({ width: 390, height: 844 });
    await navigateAndStabilize(page, '/');

    const toggle = page.locator('.navbar-menu-toggle');
    await expect(toggle).toBeAttached();
    await toggle.click();

    const mobileNav = page.locator('.mobile-nav.mobile-nav-open');
    await expect(mobileNav).toBeAttached();

    // ABOUT
    await mobileNav.locator('a[data-href="#about"]').click();
    await expect(page).toHaveURL(/#about$/);
    await expectSectionNearTop(page, '#about');

    // PROJECTS
    await toggle.click();
    await expect(mobileNav).toBeAttached();
    await mobileNav.locator('a[data-href="#work"]').click();
    await expect(page).toHaveURL(/#work$/);
    await expectSectionNearTop(page, '#work');

    // CONTACT
    await toggle.click();
    await expect(mobileNav).toBeAttached();
    await mobileNav.locator('a[data-href="#contact"]').click();
    await expect(page).toHaveURL(/#contact$/);
    await expectSectionNearTop(page, '#contact');

    // RESUME overlay
    await toggle.click();
    await expect(mobileNav).toBeAttached();
    await mobileNav.locator('button.mobile-resume-button').click();
    await expect(page.locator('.resume-overlay')).toBeAttached();
    await page.locator('.resume-close').click();
    await expect(page.locator('.resume-overlay')).toHaveCount(0);

    await expectNoHorizontalOverflow(page);

    await guard.assertNoErrors();
  });
});
