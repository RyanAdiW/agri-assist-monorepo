import { expect, test } from "@playwright/test";

const useRealBackend = process.env.PLAYWRIGHT_USE_REAL_BE === "true";

test("diagnosis flow works from landing to feedback", async ({ page }) => {
  const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type"
  };

  if (!useRealBackend) {
    await page.route("http://localhost:8080/api/v1/symptoms?*", async (route) => {
      if (route.request().method() === "OPTIONS") {
        await route.fulfill({
          status: 204,
          headers: corsHeaders
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: corsHeaders,
        body: JSON.stringify({
          crop_id: "cabai",
          crop_name: "Cabai",
          symptoms: [
            {
              id: "buah-bercak-hitam",
              name: "Buah memiliki bercak hitam cekung",
              category: "buah",
              hint: "Bercak hitam muncul pada permukaan buah."
            },
            {
              id: "buah-busuk-basah",
              name: "Buah membusuk basah",
              category: "buah",
              hint: "Buah menjadi lembek dan cepat rusak."
            },
            {
              id: "bunga-rontok",
              name: "Bunga atau bakal buah mudah rontok",
              category: "buah",
              hint: "Bunga jatuh sebelum berkembang menjadi buah."
            }
          ]
        })
      });
    });

    await page.route("http://localhost:8080/api/v1/diagnoses", async (route) => {
      if (route.request().method() === "OPTIONS") {
        await route.fulfill({
          status: 204,
          headers: corsHeaders
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: corsHeaders,
        body: JSON.stringify({
          crop_id: "cabai",
          crop_name: "Cabai",
          has_confident_diagnosis: true,
          message: "Berikut kemungkinan diagnosis dengan kecocokan gejala tertinggi.",
          selected_symptom_ids: [
            "buah-bercak-hitam",
            "buah-busuk-basah"
          ],
          generated_at: "2026-04-21T08:00:00Z",
          candidates: [
            {
              id: "antraknosa",
              name: "Patek / Antraknosa",
              description: "Jamur menyerang buah cabai.",
              score: 0.818,
              confidence_label: "tinggi",
              matched_symptom_ids: [
                "buah-bercak-hitam",
                "buah-busuk-basah"
              ],
              treatment_pillars: [
                {
                  category: "alami",
                  title: "Penanganan alami",
                  items: ["Pisahkan buah yang sudah rusak."]
                }
              ]
            }
          ]
        })
      });
    });

    await page.route("http://localhost:8080/api/v1/feedbacks", async (route) => {
      if (route.request().method() === "OPTIONS") {
        await route.fulfill({
          status: 204,
          headers: corsHeaders
        });
        return;
      }

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        headers: corsHeaders,
        body: JSON.stringify({
          status: "saved",
          submitted_at: "2026-04-21T08:05:00Z",
          payload: {
            diagnosis_id: "antraknosa",
            is_helpful: true
          }
        })
      });
    });
  }

  await page.goto("/");

  await page.getByRole("link", { name: /mulai diagnosis/i }).first().click();
  await expect(page.getByTestId("diagnosis-screen")).toHaveAttribute(
    "data-ready",
    "true"
  );
  await page.getByRole("button", { name: /buah memiliki bercak hitam cekung/i }).click();
  await page.getByRole("button", { name: /buah membusuk basah/i }).click();
  await page.getByRole("button", { name: /lihat hasil diagnosis/i }).click();

  await expect(page).toHaveURL(/\/hasil$/);
  await expect(
    page.getByRole("heading", { name: /patek \/ antraknosa/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /sangat membantu/i }).click();
  await page.getByRole("button", { name: /kirim feedback/i }).click();

  await expect(page.getByText(/masukan anda sudah kami simpan/i)).toBeVisible();
});
