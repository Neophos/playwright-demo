import { expect } from '@playwright/test';
import { Country, test } from "../example.fixtures";

test.use({
  country: Country.Spain
})
test('open specific language site of wikipedia', async ({ page }) => {
  await page.goto("");

  // The site opened should be either the Spanish or German depending on what project is running
  // One run should pass and one should be skipped
  await expect(page).toHaveURL(/es\..*/);
});
