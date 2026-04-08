import { expect, test } from "@playwright/test";

test("diagnosis flow works from landing to feedback", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /mulai diagnosis/i }).click();
  await expect(page.getByTestId("diagnosis-screen")).toHaveAttribute(
    "data-ready",
    "true"
  );
  await page.getByRole("button", { name: /buah memiliki bercak hitam cekung/i }).click();
  await page.getByRole("button", { name: /buah membusuk basah/i }).click();
  await page.getByRole("button", { name: /lihat hasil diagnosis/i }).click();

  await expect(page).toHaveURL(/\/hasil$/);
  await expect(page.getByText(/patek \/ antraknosa/i)).toBeVisible();

  await page.getByRole("button", { name: /sangat membantu/i }).click();
  await page.getByRole("button", { name: /kirim feedback/i }).click();

  await expect(page.getByText(/masukan anda sudah kami simpan/i)).toBeVisible();
});
