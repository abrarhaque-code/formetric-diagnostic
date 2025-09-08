// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Formetric UI Health Check', () => {
  test('homepage loads without errors', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Formetric.*Professional Financial Assessment/);
    
    // Check for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Verify no critical console errors
    expect(consoleErrors.filter(error => 
      !error.includes('favicon.ico') && 
      !error.includes('cdn.tailwindcss.com')
    )).toHaveLength(0);
  });

  test('main CTA button works', async ({ page }) => {
    await page.goto('/');
    
    // Click main CTA
    await page.click('text=Get your assessment →');
    
    // Should navigate to diagnostic page
    await expect(page).toHaveURL(/.*diagnostic\.html/);
    await expect(page).toHaveTitle(/Financial Health Diagnostic/);
  });

  test('diagnostic form validation works', async ({ page }) => {
    await page.goto('/diagnostic.html');
    
    // Initially, Next button should be disabled
    const nextButton = page.locator('button:has-text("Next Question")');
    await expect(nextButton).toBeDisabled();
    
    // Fill required fields
    await page.fill('input[name="company_name"]', 'Test Company');
    await page.fill('input[name="founder_name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Button should now be enabled
    await expect(nextButton).toBeEnabled();
    
    // Click next
    await nextButton.click();
    
    // Should advance to next question
    await expect(page.locator('text=2 of 10')).toBeVisible();
  });

  test('diagnostic navigation works', async ({ page }) => {
    await page.goto('/diagnostic.html');
    
    // Fill first question
    await page.fill('input[name="company_name"]', 'Test Company');
    await page.fill('input[name="founder_name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Go to next question
    await page.click('button:has-text("Next Question")');
    
    // Select an option on second question
    await page.click('text=Supplements & Nutrition');
    
    // Go to next question
    await page.click('button:has-text("Next Question")');
    
    // Should be on question 3
    await expect(page.locator('text=3 of 10')).toBeVisible();
    
    // Previous button should work
    await page.click('button:has-text("Previous")');
    await expect(page.locator('text=2 of 10')).toBeVisible();
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that content is visible and readable
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Get your assessment →')).toBeVisible();
    
    // Check that text is not too small
    const h1Element = page.locator('h1').first();
    const fontSize = await h1Element.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    // Font size should be reasonable for mobile (at least 24px)
    expect(parseInt(fontSize)).toBeGreaterThan(20);
  });

  test('accessibility basics', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    
    // Check that images have alt text (if any)
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check that form inputs have labels
    await page.goto('/diagnostic.html');
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      } else if (name) {
        const label = page.locator(`label:has-text("${name}")`);
        await expect(label).toBeVisible();
      }
    }
  });

  test('performance metrics', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check that page loads within reasonable time
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds (generous for local dev)
    expect(loadTime).toBeLessThan(5000);
  });
});
